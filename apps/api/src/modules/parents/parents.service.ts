import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async linkParentToStudent(studentId: string, parentId: string) {
    return this.prisma.studentParent.create({
      data: {
        studentId,
        parentId,
        relation: 'guardian',
      },
    });
  }
}
