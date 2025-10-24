import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const { translations, ...projectData } = createProjectDto;
    
    return this.prisma.project.create({
      data: {
        ...projectData,
        translations: {
          create: translations,
        },
      },
    });
  }

  async findAll(language: string = 'en') {
    const projects = await this.prisma.project.findMany({
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects.map(project => {
      const translation = project.translations[0];
      if (!translation) {
        throw new Error(`Translation not found for project ${project.id} in language ${language}`);
      }
      
      return {
        id: project.id,
        title: translation.title,
        description: translation.description,
        imageUrl: project.imageUrl,
        technologies: project.technologies,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };
    });
  }

  async findFeatured(language: string = 'en') {
    const projects = await this.prisma.project.findMany({
      where: {
        featured: true,
      },
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects.map(project => {
      const translation = project.translations[0];
      if (!translation) {
        throw new Error(`Translation not found for project ${project.id} in language ${language}`);
      }
      
      return {
        id: project.id,
        title: translation.title,
        description: translation.description,
        imageUrl: project.imageUrl,
        technologies: project.technologies,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };
    });
  }

  async findOne(id: string, language: string = 'en') {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        translations: {
          where: {
            language: language,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const translation = project.translations[0];
    if (!translation) {
      throw new Error(`Translation not found for project ${id} in language ${language}`);
    }

    return {
      id: project.id,
      title: translation.title,
      description: translation.description,
      imageUrl: project.imageUrl,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async findOneWithAllTranslations(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return {
      id: project.id,
      imageUrl: project.imageUrl,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      translations: project.translations.map(t => ({
        language: t.language,
        title: t.title,
        description: t.description,
      })),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);
    
    const { translations, ...projectData } = updateProjectDto;
    
    const updateData: any = { ...projectData };
    
    if (translations) {
      updateData.translations = {
        deleteMany: {},
        create: translations,
      };
    }

    return this.prisma.project.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}

