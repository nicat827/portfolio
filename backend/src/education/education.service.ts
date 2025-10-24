import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async create(createEducationDto: CreateEducationDto) {
    const { translations, ...educationData } = createEducationDto;
    
    return this.prisma.education.create({
      data: {
        ...educationData,
        translations: {
          create: translations,
        },
      },
    });
  }

  async findAll(language: string = 'en') {
    const educations = await this.prisma.education.findMany({
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

    return educations.map(education => {
      const translation = education.translations[0];
      if (!translation) {
        throw new Error(`Translation not found for education ${education.id} in language ${language}`);
      }
      
      return {
        id: education.id,
        institution: translation.institution,
        degree: translation.degree,
        field: translation.field,
        description: translation.description,
        startDate: education.startDate,
        endDate: education.endDate,
        current: education.current,
        grade: education.grade,
        website: education.website,
        createdAt: education.createdAt,
        updatedAt: education.updatedAt,
      };
    });
  }

  async findCurrent(language: string = 'en') {
    const educations = await this.prisma.education.findMany({
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

    return educations.map(education => {
      const translation = education.translations[0];
      if (!translation) {
        throw new Error(`Translation not found for education ${education.id} in language ${language}`);
      }
      
      return {
        id: education.id,
        institution: translation.institution,
        degree: translation.degree,
        field: translation.field,
        description: translation.description,
        startDate: education.startDate,
        endDate: education.endDate,
        current: education.current,
        grade: education.grade,
        website: education.website,
        createdAt: education.createdAt,
        updatedAt: education.updatedAt,
      };
    });
  }

  async findOne(id: string, language: string = 'en') {
    const education = await this.prisma.education.findUnique({
      where: { id },
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
    });

    if (!education) {
      return null;
    }

    const translation = education.translations[0];
    if (!translation) {
      throw new Error(`Translation not found for education ${id} in language ${language}`);
    }

    return {
      id: education.id,
      institution: translation.institution,
      degree: translation.degree,
      field: translation.field,
      description: translation.description,
      startDate: education.startDate,
      endDate: education.endDate,
      current: education.current,
      grade: education.grade,
      website: education.website,
      createdAt: education.createdAt,
      updatedAt: education.updatedAt,
    };
  }

  async findOneWithAllTranslations(id: string) {
    const education = await this.prisma.education.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!education) {
      return null;
    }

    return {
      id: education.id,
      startDate: education.startDate,
      endDate: education.endDate,
      current: education.current,
      grade: education.grade,
      website: education.website,
      translations: education.translations.map(t => ({
        language: t.language,
        institution: t.institution,
        degree: t.degree,
        field: t.field,
      })),
      createdAt: education.createdAt,
      updatedAt: education.updatedAt,
    };
  }

  async update(id: string, updateEducationDto: UpdateEducationDto) {
    const { translations, ...educationData } = updateEducationDto;
    
    const updateData: any = { ...educationData };
    
    if (translations) {
      updateData.translations = {
        deleteMany: {},
        create: translations,
      };
    }

    return this.prisma.education.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.education.delete({
      where: { id },
    });
  }
}
