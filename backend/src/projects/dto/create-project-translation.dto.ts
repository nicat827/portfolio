import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectTranslationDto {
  @ApiProperty({ description: 'Language code', example: 'en' })
  @IsString()
  language: string; // 'en', 'ru', 'az'

  @ApiProperty({ description: 'Project title in this language', example: 'Portfolio Website' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Project description in this language', example: 'A modern portfolio website' })
  @IsString()
  description: string;
}
