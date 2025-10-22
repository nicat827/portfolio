import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Task Management App',
        description: 'A full-stack task management application with real-time updates, user authentication, and project organization features.',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500',
        technologies: ['Vue.js', 'Socket.io', 'MongoDB', 'Express', 'Redis'],
        githubUrl: 'https://github.com/username/task-management-app',
        liveUrl: 'https://taskapp.example.com',
        featured: true,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and dark mode.',
        imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        githubUrl: 'https://github.com/username/portfolio-website',
        liveUrl: 'https://portfolio.example.com',
        featured: true,
      },
    }),
    prisma.project.create({
      data: {
        title: 'E-commerce Platform',
        description: 'A comprehensive e-commerce solution with payment integration, inventory management, and admin dashboard.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
        technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Stripe'],
        githubUrl: 'https://github.com/username/ecommerce-platform',
        liveUrl: 'https://shop.example.com',
        featured: false,
      },
    }),
  ]);

  // Create sample experiences
  const experiences = await Promise.all([
    prisma.experience.create({
      data: {
        company: 'Tech Solutions Inc.',
        position: 'Senior Full Stack Developer',
        description: 'Led development of multiple web applications using modern technologies. Mentored junior developers and implemented best practices.',
        startDate: new Date('2022-01-01'),
        current: true,
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      },
    }),
    prisma.experience.create({
      data: {
        company: 'Digital Agency',
        position: 'Frontend Developer',
        description: 'Developed responsive web applications and collaborated with design teams to create user-friendly interfaces.',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2021-12-31'),
        current: false,
        technologies: ['Vue.js', 'JavaScript', 'CSS3', 'Figma'],
      },
    }),
    prisma.experience.create({
      data: {
        company: 'StartupXYZ',
        position: 'Junior Developer',
        description: 'Worked on various projects including mobile apps and web platforms. Gained experience in agile development methodologies.',
        startDate: new Date('2019-01-01'),
        endDate: new Date('2020-05-31'),
        current: false,
        technologies: ['React Native', 'Python', 'Django', 'MySQL'],
      },
    }),
  ]);

  console.log('✅ Seed data created successfully!');
  console.log(`📁 Created ${projects.length} projects`);
  console.log(`💼 Created ${experiences.length} experiences`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
