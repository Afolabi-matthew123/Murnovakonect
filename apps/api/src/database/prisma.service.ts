import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';

export const tenantContext = new AsyncLocalStorage<{ schoolId: string }>();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableTenantContext() {
    this.$use(async (params, next) => {
      const store = tenantContext.getStore();

      if (store?.schoolId) {
        await this.$executeRawUnsafe(
          `SET LOCAL app.current_school = '${store.schoolId}'`
        );
      }

      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
