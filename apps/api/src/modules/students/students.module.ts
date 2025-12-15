import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { PrismaModule } from '../../database/prisma.module';
import { RedisModule } from '../../config/redis.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,   // ✅ REQUIRED — FIXES THE ERROR
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
