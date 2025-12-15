import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'admin@murnova.com', 
    description: 'Email, phone, student ID, or teacher ID',
    required: false 
  })
  @IsString()
  @IsOptional()
  identifier?: string;

  @ApiProperty({ 
    example: 'STU-2024-001',
    description: 'Student ID (alternative to identifier field)',
    required: false 
  })
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiProperty({ 
    example: 'TCH-2024-001',
    description: 'Teacher ID (alternative to identifier field)',
    required: false 
  })
  @IsString()
  @IsOptional()
  staffId?: string;

  @ApiProperty({ 
    example: 'admin@murnova.com',
    description: 'Email (alternative to identifier field)',
    required: false 
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ 
    example: '+2348012345678',
    description: 'Phone number (alternative to identifier field)',
    required: false 
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password!: string;
}
