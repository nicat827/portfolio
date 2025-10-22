import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/ecommerce',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Socket.io', 'MongoDB', 'Express', 'Redis'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/taskmanager',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features dark mode, animations, and contact form.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/portfolio',
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A weather dashboard application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'Leaflet'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/weather',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-effect rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-500/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-primary-400" />
                    </div>
                    <p className="text-gray-400 text-sm">Project Preview</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden xs:inline">{t('projects.viewProject')}</span>
                    <span className="xs:hidden">View</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto justify-center"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden xs:inline">{t('projects.viewCode')}</span>
                    <span className="xs:hidden">Code</span>
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    {t('projects.tech')}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

