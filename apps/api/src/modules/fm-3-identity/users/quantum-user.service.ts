import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';

@Injectable()
export class QuantumUserService {
  private readonly logger = new Logger(QuantumUserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createQuantumUser(email: string) {
    const existing = await this.prisma.user.findFirst({ where: { email } });
    if (existing) {
      throw new ConflictException('Quantum duplicate detected');
    }

    return this.prisma.user.create({
      data: {
        email,
        status: 'PENDING',
      },
    });
  }
}
