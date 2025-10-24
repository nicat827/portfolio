import { IsString, IsDateString, IsBoolean, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { CreateExperienceTranslationDto } from './create-experience-translation.dto';

export class CreateExperienceDto {
  @ApiProperty({ 
    description: 'Start date (ISO-8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)',
    type: 'string', 
    format: 'date',
    example: '2024-04-01',
  })
  @IsDateString()
  @Transform(({ value }) => {
    if (!value) return value;
    // If already has time component, return as is
    if (value.includes('T')) return value;
    // Convert YYYY-MM-DD to YYYY-MM-DDTHH:mm:ssZ
    return new Date(value + 'T00:00:00Z').toISOString();
  })
  startDate: string;

  @ApiProperty({ 
    description: 'End date (ISO-8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)',
    type: 'string', 
    format: 'date',
    required: false,
    example: '2024-07-01',
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => {
    if (!value) return value;
    // If already has time component, return as is
    if (value.includes('T')) return value;
    // Convert YYYY-MM-DD to YYYY-MM-DDTHH:mm:ssZ
    return new Date(value + 'T00:00:00Z').toISOString();
  })
  endDate?: string;

  @ApiProperty({ description: 'Whether this is current position', required: false, default: false })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiProperty({ description: 'Technologies used', type: [String] })
  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @ApiProperty({ description: 'Experience translations', type: [CreateExperienceTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExperienceTranslationDto)
  translations: CreateExperienceTranslationDto[];
}

