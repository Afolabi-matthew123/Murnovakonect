import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { Tenant } from '../../common/decorators/tenant.decorator';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('students') // ✅ no /api here
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student with optional parent linking' })
  @Permissions('student:create')
  create(
    @Tenant('schoolId') schoolId: string,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create(schoolId, createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Permissions('student:read')
  findAll(
    @Tenant('schoolId') schoolId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.studentsService.findAll(schoolId, page, limit);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search students' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @Permissions('student:read')
  search(
    @Tenant('schoolId') schoolId: string,
    @Query('q') query: string,
  ) {
    return this.studentsService.search(schoolId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  @Permissions('student:read')
  findOne(
    @Tenant('schoolId') schoolId: string,
    @Param('id') id: string,
  ) {
    return this.studentsService.findOne(schoolId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student' })
  @Permissions('student:update')
  update(
    @Tenant('schoolId') schoolId: string,
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(schoolId, id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  @Permissions('student:delete')
  remove(
    @Tenant('schoolId') schoolId: string,
    @Param('id') id: string,
  ) {
    return this.studentsService.remove(schoolId, id);
  }
}
