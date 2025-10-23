import { IsString, IsOptional } from 'class-validator';

export class CreateEducationTranslationDto {
  @IsString()
  language: string; // 'en', 'ru', 'az'

  @IsString()
  institution: string;

  @IsString()
  degree: string;

  @IsString()
  field: string;

  @IsOptional()
  @IsString()
  description?: string;
}
