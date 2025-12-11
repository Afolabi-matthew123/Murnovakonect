import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('schools:create')
  @ApiBearerAuth()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('schools:read')
  @ApiBearerAuth()
  findAll() {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('schools:read')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.schoolsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('schools:update')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolsService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('schools:delete')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  // NOTE: This is a foundation endpoint; real student creation flows will come later modules.
  @Post(':schoolId/students')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('students:create')
  @ApiBearerAuth()
  createStudent(
    @Param('schoolId') schoolId: string,
    @Body() createStudentDto: any,
  ) {
    return this.schoolsService.createStudent(schoolId, createStudentDto);
  }
}
