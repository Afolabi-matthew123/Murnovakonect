import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SchoolUserService {
  constructor(private readonly prisma: PrismaService) {}

  async attachUserToSchool(
    userId: string,
    schoolId: string,
    roles: string[],
  ) {
    return this.prisma.schoolUser.upsert({
      where: {
        userId_schoolId: { userId, schoolId },
      },
      update: { roles },
      create: {
        userId,
        schoolId,
        roles,
      },
    });
  }

  async getUserRoles(userId: string, schoolId: string) {
    return this.prisma.schoolUser.findUnique({
      where: {
        userId_schoolId: { userId, schoolId },
      },
    });
  }
}
