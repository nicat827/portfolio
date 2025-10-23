import { IsString, IsDateString, IsBoolean, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateExperienceTranslationDto } from './create-experience-translation.dto';

export class CreateExperienceDto {
  @ApiProperty({ description: 'Start date', type: 'string', format: 'date' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date', type: 'string', format: 'date', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ description: 'Whether this is current position', required: false })
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

