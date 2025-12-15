import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  private readonly logger = new Logger(SchoolsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.school.findMany({
        include: {
          domains: true,
          users: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch schools', (error as Error).stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const school = await this.prisma.school.findUnique({
        where: { id },
        include: {
          domains: true,
          users: true,
        },
      });

      if (!school) {
        throw new NotFoundException(`School with ID ${id} not found`);
      }

      return school;
    } catch (error) {
      this.logger.error(`Failed to fetch school ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async findBySlug(slug: string) {
    try {
      const school = await this.prisma.school.findUnique({
        where: { slug },
        include: {
          domains: true,
          users: true,
        },
      });

      if (!school) {
        throw new NotFoundException(`School with slug ${slug} not found`);
      }

      return school;
    } catch (error) {
      this.logger.error(
        `Failed to fetch school by slug ${slug}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async create(createSchoolDto: CreateSchoolDto) {
    try {
      return await this.prisma.school.create({
        data: createSchoolDto,
        include: {
          domains: true,
          users: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create school', (error as Error).stack);
      throw error;
    }
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    try {
      return await this.prisma.school.update({
        where: { id },
        data: updateSchoolDto,
        include: {
          domains: true,
          users: true,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to update school ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.school.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(
        `Failed to delete school ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async createStudent(schoolId: string, createStudentDto: any) {
    try {
      // NOTE: this currently creates a User, not a Student domain aggregate.
      // FM-1: this is acceptable as a simple smoke helper.
      return await this.prisma.user.create({
        data: {
          ...createStudentDto,
          schoolId,
        },
        include: {
          school: true,
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to create student for school ${schoolId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async getSchoolDomains(schoolId: string) {
    try {
      return await this.prisma.schoolDomain.findMany({
        where: { schoolId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch domains for school ${schoolId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async addCustomDomain(
    schoolId: string,
    host: string,
    type: string,
    module?: string,
  ) {
    try {
      return await this.prisma.schoolDomain.create({
        data: {
          schoolId,
          host,
          type: type as any,
          module,
          isPrimary: false,
          verified: false,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to add domain for school ${schoolId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async verifyDomain(domainId: string) {
    try {
      return await this.prisma.schoolDomain.update({
        where: { id: domainId },
        data: { verified: true },
      });
    } catch (error) {
      this.logger.error(
        `Failed to verify domain ${domainId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async setPrimaryDomain(schoolId: string, domainId: string) {
    try {
      await this.prisma.schoolDomain.updateMany({
        where: { schoolId },
        data: { isPrimary: false },
      });

      return await this.prisma.schoolDomain.update({
        where: { id: domainId },
        data: { isPrimary: true },
      });
    } catch (error) {
      this.logger.error(
        `Failed to set primary domain ${domainId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
