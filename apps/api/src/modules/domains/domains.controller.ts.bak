import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { SchoolsService } from '../schools/schools.service';
import { PrismaService } from '../../database/prisma.service';

@Controller('schools/:schoolId/domains')
@UseGuards(JwtAuthGuard)
export class DomainsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @Permissions('schools:read')
  async getDomains(@Param('schoolId') schoolId: string) {
    return this.schoolsService.getSchoolDomains(schoolId);
  }

  @Post()
  @Permissions('schools:update')
  async addDomain(
    @Param('schoolId') schoolId: string,
    @Body() addDomainDto: any,
  ) {
    return this.schoolsService.addCustomDomain(
      schoolId,
      addDomainDto.host,
      addDomainDto.type,
      addDomainDto.module,
    );
  }

  @Patch(':domainId/verify')
  @Permissions('schools:update')
  async verifyDomain(
    @Param('schoolId') schoolId: string,
    @Param('domainId') domainId: string,
  ) {
    await this.schoolsService.verifyDomain(domainId);
    return { message: 'Domain verified successfully' };
  }

  @Patch(':domainId/primary')
  @Permissions('schools:update')
  async setPrimaryDomain(
    @Param('schoolId') schoolId: string,
    @Param('domainId') domainId: string,
  ) {
    return this.schoolsService.setPrimaryDomain(schoolId, domainId);
  }

  @Delete(':domainId')
  @Permissions('schools:update')
  async removeDomain(
    @Param('schoolId') schoolId: string,
    @Param('domainId') domainId: string,
  ) {
    await this.prisma.schoolDomain.delete({
      where: { id: domainId },
    });
    return { message: 'Domain removed successfully' };
  }
}
