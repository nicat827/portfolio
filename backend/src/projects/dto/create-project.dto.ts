import { IsString, IsOptional, IsBoolean, IsArray, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Project description' })
  @IsString()
  description: string;

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
}
