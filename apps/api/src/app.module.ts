import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { TenancyMiddleware } from './common/middleware/tenancy.middleware';
import { ResponseTimeInterceptor } from './common/interceptors/response-time.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { RedisModule } from './config/redis.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { StudentsModule } from './modules/students/students.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { HealthModule } from './modules/health/health.module';
import { DomainsModule } from './modules/domains/domains.module';
import { AiModule } from './modules/ai/ai.module';
import { SeedModule } from './modules/seed/seed.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { Fm1TestModule } from './modules/fm1-test/fm1-test.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Health checks
    TerminusModule,

    // Core modules
    PrismaModule,
    RedisModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    SchoolsModule,
    RolesModule,
    PermissionsModule,
    StudentsModule,
    TenancyModule,
    HealthModule,
    DomainsModule,
    AiModule,
    SeedModule,
    SuperAdminModule,

    // FM-1 smoke testing helpers
    Fm1TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Global Guards
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },

    // Global Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply tenancy middleware to all routes
    consumer
      .apply(TenancyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
