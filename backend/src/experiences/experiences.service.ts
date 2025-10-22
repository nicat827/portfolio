import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async create(createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: createExperienceDto,
    });
  }

  async findAll() {
    return this.prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async findCurrent() {
    return this.prisma.experience.findMany({
      where: {
        current: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return experience;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    await this.findOne(id);

    return this.prisma.experience.update({
      where: { id },
      data: updateExperienceDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.experience.delete({
      where: { id },
    });
  }
}

