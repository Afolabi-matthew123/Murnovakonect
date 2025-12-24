import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@nestjs-modules/ioredis';
import { PrismaService } from '../../../../prisma.service';

@Injectable()
export class QuantumSessionService {
  private readonly logger = new Logger(QuantumSessionService.name);
  private readonly SESSION_TTL = 8 * 60 * 60;

  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  generateSessionId(): string {
    return `qs_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}
