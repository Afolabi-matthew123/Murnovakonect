import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class StudentActivationService {
  constructor(private readonly prisma: PrismaService) {}

  async canActivateStudent(studentId: string): Promise<boolean> {
    const parents = await this.prisma.studentParent.findMany({
      where: {
        studentId,
        verified: true,
        parent: {
          subscriptionStatus: 'ACTIVE',
        },
      },
    });

    return parents.length > 0;
  }
}
