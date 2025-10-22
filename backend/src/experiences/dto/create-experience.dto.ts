import { IsString, IsDateString, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({ description: 'Company name' })
  @IsString()
  company: string;

  @ApiProperty({ description: 'Job position' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'Job description' })
  @IsString()
  description: string;

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
}

