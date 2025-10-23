import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceTranslationDto {
  @ApiProperty({ description: 'Language code', example: 'en' })
  @IsString()
  language: string; // 'en', 'ru', 'az'

  @ApiProperty({ description: 'Company name in this language', example: 'Tech Company Inc.' })
  @IsString()
  company: string;

  @ApiProperty({ description: 'Job position in this language', example: 'Senior Developer' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'Job description in this language', example: 'Developed web applications' })
  @IsString()
  description: string;
}
