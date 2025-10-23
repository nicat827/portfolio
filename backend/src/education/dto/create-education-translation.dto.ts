import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationTranslationDto {
  @ApiProperty({ description: 'Language code', example: 'en' })
  @IsString()
  language: string; // 'en', 'ru', 'az'

  @ApiProperty({ description: 'Institution name in this language', example: 'Azerbaijan Technical University' })
  @IsString()
  institution: string;

  @ApiProperty({ description: 'Degree name in this language', example: 'Bachelor Degree' })
  @IsString()
  degree: string;

  @ApiProperty({ description: 'Field of study in this language', example: 'Information Technologies' })
  @IsString()
  field: string;

  @ApiProperty({ description: 'Description in this language', example: 'Studying software development', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
