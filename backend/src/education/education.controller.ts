import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  findAll(@Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.educationService.findAll(lang);
  }

  @Get('current')
  findCurrent(@Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.educationService.findCurrent(lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('accept-language') language: string = 'en') {
    const lang = language?.split(',')[0]?.split('-')[0] || 'en';
    return this.educationService.findOne(id, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
