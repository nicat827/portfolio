import { IsString, IsOptional, IsDateString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { CreateEducationTranslationDto } from './create-education-translation.dto';

export class CreateEducationDto {
  @ApiProperty({ 
    description: 'Start date (ISO-8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)',
    type: 'string',
    format: 'date',
    example: '2019-09-01',
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
    example: '2023-06-01',
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

  @ApiProperty({ 
    description: 'Whether currently studying',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiProperty({ 
    description: 'Grade or GPA',
    required: false,
  })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiProperty({ 
    description: 'Institution website',
    required: false,
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ 
    description: 'Education translations',
    type: [CreateEducationTranslationDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationTranslationDto)
  translations: CreateEducationTranslationDto[];
}
