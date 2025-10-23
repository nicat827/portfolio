import { IsString } from 'class-validator';

export class CreateProjectTranslationDto {
  @IsString()
  language: string; // 'en', 'ru', 'az'

  @IsString()
  title: string;

  @IsString()
  description: string;
}
