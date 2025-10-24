import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const { translations, ...experienceData } = createExperienceDto;
    
    return this.prisma.experience.create({
      data: {
        ...experienceData,
        translations: {
          create: translations,
        },
      },
    });
  }

  async findAll(language: string = 'en') {
    const experiences = await this.prisma.experience.findMany({
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return experiences.map(experience => {
      const translation = experience.translations[0];
      if (!translation) {
        throw new Error(`Translation not found for experience ${experience.id} in language ${language}`);
      }
      
      return {
        id: experience.id,
        company: translation.company,
        position: translation.position,
        description: translation.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        current: experience.current,
        technologies: experience.technologies,
        createdAt: experience.createdAt,
        updatedAt: experience.updatedAt,
      };
    });
  }

  async findCurrent(language: string = 'en') {
    const experiences = await this.prisma.experience.findMany({
      where: {
        current: true,
      },
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return experiences.map(experience => {
      const translation = experience.translations[0];
      if (!translation) {
        throw new Error(`Translation not found for experience ${experience.id} in language ${language}`);
      }
      
      return {
        id: experience.id,
        company: translation.company,
        position: translation.position,
        description: translation.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        current: experience.current,
        technologies: experience.technologies,
        createdAt: experience.createdAt,
        updatedAt: experience.updatedAt,
      };
    });
  }

  async findOne(id: string, language: string = 'en') {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    const translation = experience.translations[0];
    if (!translation) {
      throw new Error(`Translation not found for experience ${id} in language ${language}`);
    }

    return {
      id: experience.id,
      company: translation.company,
      position: translation.position,
      description: translation.description,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      technologies: experience.technologies,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
    };
  }

  async findOneWithAllTranslations(id: string) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return {
      id: experience.id,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      technologies: experience.technologies,
      translations: experience.translations.map(t => ({
        language: t.language,
        company: t.company,
        position: t.position,
        description: t.description,
      })),
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
    };
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    await this.findOne(id);
    
    const { translations, ...experienceData } = updateExperienceDto;
    
    const updateData: any = { ...experienceData };
    
    if (translations) {
      updateData.translations = {
        deleteMany: {},
        create: translations,
      };
    }

    return this.prisma.experience.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.experience.delete({
      where: { id },
    });
  }
}

