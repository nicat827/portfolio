import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtGuard } from '../auth/jwt.guard';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new education entry' })
  @ApiResponse({ status: 201, description: 'Education created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all education entries' })
  @ApiResponse({ status: 200, description: 'Education entries retrieved successfully' })
  findAll(@Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.educationService.findAll(lang);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current education entries' })
  @ApiResponse({ status: 200, description: 'Current education entries retrieved successfully' })
  findCurrent(@Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.educationService.findCurrent(lang);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an education entry by ID' })
  @ApiResponse({ status: 200, description: 'Education entry retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Education entry not found' })
  findOne(@Param('id') id: string, @Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.educationService.findOne(id, lang);
  }

  @Get(':id/admin')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get education entry with all translations for admin editing' })
  @ApiResponse({ status: 200, description: 'Education entry retrieved successfully with all translations' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Education entry not found' })
  findOneForAdmin(@Param('id') id: string) {
    return this.educationService.findOneWithAllTranslations(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update an education entry' })
  @ApiResponse({ status: 200, description: 'Education entry updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Education entry not found' })
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete an education entry' })
  @ApiResponse({ status: 204, description: 'Education entry deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Education entry not found' })
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
