import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './health/health.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { StudentsModule } from './modules/students/students.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';

import { TenancyMiddleware } from './common/middleware/tenancy.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // í´’ CORE INFRA (DO NOT MOVE)
    PrismaModule,

    // SYSTEM
    HealthModule,

    // FM-1 CORE
    AuthModule,
    UsersModule,
    SchoolsModule,
    StudentsModule,
    SuperAdminModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes('*');
  }
}
