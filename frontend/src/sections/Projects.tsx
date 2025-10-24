import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { useProjects } from '../hooks/useApi';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { projects, loading, error } = useProjects();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            <span className="ml-2 text-gray-400">Loading projects...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">Failed to load projects</p>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : (
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
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-effect rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden flex-shrink-0">
                <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-500/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-primary-400" />
                      </div>
                      <p className="text-gray-400 text-sm">Project Preview</p>
                    </div>
                  )}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-4">
                  {project.liveUrl && (
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
                  )}
                  {project.githubUrl && (
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
                  )}
                </div>
              </div>

              {/* Project Info - Flex grow to push technologies to bottom */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {/* Technologies - Fixed at bottom */}
                <div className="mt-auto">
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
        )}
      </div>
    </section>
  );
};

export default Projects;

