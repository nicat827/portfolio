import { IsString } from 'class-validator';

export class CreateExperienceTranslationDto {
  @IsString()
  language: string; // 'en', 'ru', 'az'

  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsString()
  description: string;
}
