import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RedisService } from '../../config/redis.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    @Inject(RedisService) private redis: RedisService,
  ) {}

  async create(schoolId: string, createStudentDto: CreateStudentDto) {
    const { parentEmail, parentPhone, parentName, ...studentData } = createStudentDto;

    // Check if admission number is unique within school
    if (studentData.admissionNo) {
      const existing = await this.prisma.student.findFirst({
        where: {
          schoolId,
          admissionNo: studentData.admissionNo,
        },
      });

      if (existing) {
        throw new ConflictException(`Admission number ${studentData.admissionNo} already exists`);
      }
    }

    // Handle parent linking
    let guardianId: string | undefined;
    if (parentEmail || parentPhone) {
      guardianId = await this.findOrCreateParent(schoolId, {
        email: parentEmail,
        phone: parentPhone,
        name: parentName,
      });
    }

    // Create student
    const student = await this.prisma.student.create({
      data: {
        ...studentData,
        schoolId,
        guardianId,
        dob: studentData.dob ? new Date(studentData.dob) : null,
      },
      include: {
        guardian: true,
        classRoom: true,
      },
    });

    // Invalidate cache
    await this.redis.del(`school:${schoolId}:students`).catch(() => {});

    return student;
  }

  private async findOrCreateParent(
    schoolId: string,
    parentInfo: { email?: string; phone?: string; name?: string },
  ): Promise<string | undefined> {
    const { email, phone, name } = parentInfo;

    if (!email && !phone) {
      return undefined;
    }

    // Try to find existing parent by email or phone
    let parent = null;
    if (email) {
      parent = await this.prisma.user.findFirst({
        where: {
          email,
          schoolId,
        },
      });
    }

    if (!parent && phone) {
      parent = await this.prisma.user.findFirst({
        where: {
          phone,
          schoolId,
        },
      });
    }

    // If not found, create new parent user
    if (!parent) {
      const displayName = name || `Parent of ${email || phone}`;
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 12);
      
      parent = await this.prisma.user.create({
        data: {
          email: email || `${phone}@temp.parent`,
          phone: phone || null,
          displayName,
          password: hashedPassword,
          isActive: true,
          schoolId,
        },
      });

      // Assign parent role
      const parentRole = await this.prisma.role.findFirst({
        where: {
          schoolId,
          name: 'PARENT',
        },
      });

      if (parentRole) {
        await this.prisma.userRole.create({
          data: {
            userId: parent.id,
            roleId: parentRole.id,
          },
        });
      }

      console.log(`Created parent user: ${parent.email} with temp password: ${tempPassword}`);
    }

    return parent.id;
  }

  async findAll(schoolId: string, page = 1, limit = 20) {
    const cacheKey = `school:${schoolId}:students:page:${page}:limit:${limit}`;
    
    // Try cache first
    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Redis cache error:', error);
    }

    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where: { schoolId },
        include: {
          guardian: true,
          classRoom: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.student.count({ where: { schoolId } }),
    ]);

    const result = {
      data: students,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };

    // Cache for 5 minutes
    try {
      await this.redis.set(cacheKey, JSON.stringify(result), 300);
    } catch (error) {
      console.warn('Redis cache set error:', error);
    }

    return result;
  }

  async findOne(schoolId: string, id: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        id,
        schoolId,
      },
      include: {
        guardian: true,
        classRoom: true,
        attendances: {
          take: 10,
          orderBy: { date: 'desc' },
        },
        results: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        behaviourIncidents: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async update(schoolId: string, id: string, updateStudentDto: UpdateStudentDto) {
    const { parentEmail, parentPhone, parentName, ...studentData } = updateStudentDto;

    // Check student exists and belongs to school
    await this.findOne(schoolId, id);

    // Handle parent linking if provided
    let guardianId: string | undefined;
    if (parentEmail || parentPhone) {
      guardianId = await this.findOrCreateParent(schoolId, {
        email: parentEmail,
        phone: parentPhone,
        name: parentName,
      });
    }

    const updateData: any = { ...studentData };
    if (guardianId !== undefined) {
      updateData.guardianId = guardianId;
    }
    if (studentData.dob) {
      updateData.dob = new Date(studentData.dob);
    }

    const student = await this.prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        guardian: true,
        classRoom: true,
      },
    });

    // Invalidate cache
    try {
      await this.redis.del(`school:${schoolId}:students`);
    } catch (error) {
      console.warn('Redis cache delete error:', error);
    }

    return student;
  }

  async remove(schoolId: string, id: string) {
    // Check student exists and belongs to school
    await this.findOne(schoolId, id);

    await this.prisma.student.delete({
      where: { id },
    });

    // Invalidate cache
    try {
      await this.redis.del(`school:${schoolId}:students`);
    } catch (error) {
      console.warn('Redis cache delete error:', error);
    }
  }

  async search(schoolId: string, query: string) {
    return this.prisma.student.findMany({
      where: {
        schoolId,
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { admissionNo: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 20,
      include: {
        guardian: true,
        classRoom: true,
      },
    });
  }
}
