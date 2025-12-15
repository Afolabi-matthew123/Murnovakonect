import { Module } from '@nestjs/common';
import { DomainsController } from './domains.controller';
import { SchoolsService } from '../schools/schools.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DomainsController],
  providers: [SchoolsService],
})
export class DomainsModule {}
