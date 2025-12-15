import { IsEmail, IsString, MinLength, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  TEACHER = 'TEACHER',
  BURSAR = 'BURSAR',
  PARENT = 'PARENT',
  STUDENT = 'STUDENT',
}

export class RegisterDto {
  @ApiProperty({ example: 'admin@murnova.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+2348012345678', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty({ 
    example: UserType.STUDENT, 
    enum: UserType,
    default: UserType.STUDENT 
  })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @ApiProperty({ example: 'school-uuid', required: false })
  @IsUUID()
  @IsOptional()
  schoolId?: string;

  @ApiProperty({ example: 'STU-2024-001', required: false })
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiProperty({ example: 'TCH-2024-001', required: false })
  @IsString()
  @IsOptional()
  staffId?: string;
}
