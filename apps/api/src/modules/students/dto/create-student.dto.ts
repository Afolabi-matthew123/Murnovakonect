import { IsString, IsEmail, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'Student first name' })
  @IsString()
  firstName!: string;  // Added !

  @ApiProperty({ description: 'Student last name' })
  @IsString()
  lastName!: string;   // Added !

  @ApiProperty({ description: 'Admission number', required: false })
  @IsOptional()
  @IsString()
  admissionNo?: string;

  @ApiProperty({ description: 'Gender', required: false, enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiProperty({ description: 'Date of birth (ISO format)', required: false })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiProperty({ description: 'Classroom ID', required: false })
  @IsOptional()
  @IsString()
  classRoomId?: string;

  // Parent linking fields
  @ApiProperty({ description: 'Parent email for linking', required: false })
  @IsOptional()
  @IsEmail()
  parentEmail?: string;

  @ApiProperty({ description: 'Parent phone number for linking', required: false })
  @IsOptional()
  @IsString()
  parentPhone?: string;

  @ApiProperty({ description: 'Parent name', required: false })
  @IsOptional()
  @IsString()
  parentName?: string;
}
