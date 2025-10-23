import { IsString, IsOptional, IsBoolean, IsArray, IsUrl, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateProjectTranslationDto } from './create-project-translation.dto';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project image URL', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ description: 'Technologies used in the project', type: [String] })
  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @ApiProperty({ description: 'GitHub repository URL', required: false })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @ApiProperty({ description: 'Live demo URL', required: false })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @ApiProperty({ description: 'Whether the project is featured', required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ description: 'Project translations', type: [CreateProjectTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectTranslationDto)
  translations: CreateProjectTranslationDto[];
}
