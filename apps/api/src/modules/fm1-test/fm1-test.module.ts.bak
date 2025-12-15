import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { Fm1TestService } from './fm1-test.service';
import { Fm1TestController } from './fm1-test.controller';

@Module({
  imports: [PrismaModule],
  providers: [Fm1TestService],
  controllers: [Fm1TestController],
})
export class Fm1TestModule {}
