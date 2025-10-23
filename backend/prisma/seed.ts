import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with React and Nest',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Nest', 'Prisma', 'PostgreSQL', 'Swagger'],
      githubUrl: 'https://github.com/nicat827/portfolio',
      liveUrl: 'https://nijatmajidov.com',
      featured: true,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'E-commerce API',
      description: 'RESTful API for e-commerce platform with NestJS and PostgreSQL',
      technologies: ['NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
      githubUrl: 'https://github.com/yourusername/ecommerce-api',
      featured: true,
    },
  });

  // Create sample experiences
  const experience1 = await prisma.experience.create({
    data: {
      company: 'Tech Company Inc.',
      position: 'Senior Full Stack Developer',
      description: 'Led development of web applications using modern technologies',
      startDate: new Date('2022-01-01'),
      current: true,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    },
  });

  const experience2 = await prisma.experience.create({
    data: {
      company: 'Aseto Group',
      position: 'Full-Stack Developer',
      description: 'Developed user interfaces for mobile and web applications',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      current: false,
      technologies: ['React', 'Vue.js', 'JavaScript', 'CSS'],
    },
  });

  console.log('Seed data created successfully!');
  console.log('Projects:', { project1, project2 });
  console.log('Experiences:', { experience1, experience2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
