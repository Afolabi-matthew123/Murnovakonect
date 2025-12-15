import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class StudentParentService {
  constructor(private readonly prisma: PrismaService) {}

  async linkParentToStudent(
    studentId: string,
    parentId: string,
    relation: string,
    verified = false,
  ) {
    return this.prisma.studentParent.upsert({
      where: {
        studentId_parentId: { studentId, parentId },
      },
      update: { verified, relation },
      create: {
        studentId,
        parentId,
        relation,
        verified,
      },
    });
  }

  async getParentsOfStudent(studentId: string) {
    return this.prisma.studentParent.findMany({
      where: { studentId },
      include: { parent: true },
    });
  }
}
