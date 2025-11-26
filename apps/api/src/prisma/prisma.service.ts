import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { join } from 'path';

// Dynamic import that works in both dev and prod
const getPrismaClient = () => {
  try {
    // Try direct import first (works in dev)
    return require('@prisma/client').PrismaClient;
  } catch {
    try {
      // Fallback to direct path (works when built)
      const prismaPath = join(__dirname, '../../node_modules/.prisma/client');
      return require(prismaPath).PrismaClient;
    } catch {
      // Final fallback
      return require('../../node_modules/.prisma/client').PrismaClient;
    }
  }
};

const PrismaClient = getPrismaClient();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
