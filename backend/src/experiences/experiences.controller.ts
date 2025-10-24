import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { JwtGuard } from '../auth/jwt.guard';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiResponse({ status: 201, description: 'Experience created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiResponse({ status: 200, description: 'Experiences retrieved successfully' })
  findAll(@Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.experiencesService.findAll(lang);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current experiences' })
  @ApiResponse({ status: 200, description: 'Current experiences retrieved successfully' })
  findCurrent(@Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.experiencesService.findCurrent(lang);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experience by ID' })
  @ApiResponse({ status: 200, description: 'Experience retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  findOne(@Param('id') id: string, @Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.experiencesService.findOne(id, lang);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update an experience' })
  @ApiResponse({ status: 200, description: 'Experience updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiResponse({ status: 204, description: 'Experience deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}

