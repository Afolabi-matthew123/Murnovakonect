import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoleName, UserType } from '@prisma/client';

@Injectable()
export class Fm1TestService {
  private readonly logger = new Logger(Fm1TestService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Idempotent bootstrap of two demo tenants with users + students.
   * This is only for FM-1 smoke testing of multi-tenant isolation.
   */
  async bootstrapDemoTenants() {
    this.logger.log('Bootstrapping FM-1 demo tenants...');

    // --- TENANT A ---
    const tenantA = await this.prisma.school.upsert({
      where: { slug: 'tenant-a' },
      update: {},
      create: {
        name: 'Tenant A Demo School',
        slug: 'tenant-a',
        motto: 'Tenant A Motto',
      },
    });

    const tenantAParent = await this.prisma.user.upsert({
      where: { phone: '08000000011' },
      update: {
        schoolId: tenantA.id,
        userType: UserType.PARENT,
        displayName: 'Tenant A Parent',
      },
      create: {
        phone: '08000000011',
        password: 'PLACEHOLDER_HASH',
        displayName: 'Tenant A Parent',
        userType: UserType.PARENT,
        schoolId: tenantA.id,
        isActive: true,
      },
    });

    const tenantAStudent = await this.prisma.student.upsert({
      where: { admissionNo: 'TA-001' },
      update: {
        schoolId: tenantA.id,
        guardianId: tenantAParent.id,
      },
      create: {
        firstName: 'TenantA',
        lastName: 'StudentOne',
        admissionNo: 'TA-001',
        schoolId: tenantA.id,
        guardianId: tenantAParent.id,
      },
    });

    // --- TENANT B ---
    const tenantB = await this.prisma.school.upsert({
      where: { slug: 'tenant-b' },
      update: {},
      create: {
        name: 'Tenant B Demo School',
        slug: 'tenant-b',
        motto: 'Tenant B Motto',
      },
    });

    const tenantBParent = await this.prisma.user.upsert({
      where: { phone: '08000000012' },
      update: {
        schoolId: tenantB.id,
        userType: UserType.PARENT,
        displayName: 'Tenant B Parent',
      },
      create: {
        phone: '08000000012',
        password: 'PLACEHOLDER_HASH',
        displayName: 'Tenant B Parent',
        userType: UserType.PARENT,
        schoolId: tenantB.id,
        isActive: true,
      },
    });

    const tenantBStudent = await this.prisma.student.upsert({
      where: { admissionNo: 'TB-001' },
      update: {
        schoolId: tenantB.id,
        guardianId: tenantBParent.id,
      },
      create: {
        firstName: 'TenantB',
        lastName: 'StudentOne',
        admissionNo: 'TB-001',
        schoolId: tenantB.id,
        guardianId: tenantBParent.id,
      },
    });

    this.logger.log('FM-1 demo tenants bootstrapped');

    return {
      tenants: [
        {
          school: { id: tenantA.id, slug: tenantA.slug, name: tenantA.name },
          parent: { id: tenantAParent.id, phone: tenantAParent.phone },
          student: { id: tenantAStudent.id, admissionNo: tenantAStudent.admissionNo },
        },
        {
          school: { id: tenantB.id, slug: tenantB.slug, name: tenantB.name },
          parent: { id: tenantBParent.id, phone: tenantBParent.phone },
          student: { id: tenantBStudent.id, admissionNo: tenantBStudent.admissionNo },
        },
      ],
    };
  }

  /**
   * List all schools in a minimal way (for smoke testing only).
   */
  async listSchools() {
    return this.prisma.school.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Verify multi-tenant isolation by returning counts scoped to a given school slug.
   */
  async getTenantSnapshot(schoolSlug: string) {
    const school = await this.prisma.school.findUnique({
      where: { slug: schoolSlug },
    });

    if (!school) {
      throw new NotFoundException(`School with slug ${schoolSlug} not found`);
    }

    const [usersCount, studentsCount, classesCount] = await Promise.all([
      this.prisma.user.count({ where: { schoolId: school.id } }),
      this.prisma.student.count({ where: { schoolId: school.id } }),
      this.prisma.classRoom.count({ where: { schoolId: school.id } }),
    ]);

    return {
      school: {
        id: school.id,
        slug: school.slug,
        name: school.name,
      },
      counts: {
        users: usersCount,
        students: studentsCount,
        classRooms: classesCount,
      },
    };
  }
}
