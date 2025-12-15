import { IsString, IsOptional, IsUrl, IsHexColor, IsBoolean } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsHexColor()
  @IsOptional()
  primaryColor?: string;

  @IsHexColor()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  motto?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  vision?: string;
}
