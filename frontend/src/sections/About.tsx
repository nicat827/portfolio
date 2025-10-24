import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Loader2, Briefcase } from 'lucide-react';
import {  useExperiences } from '../hooks/useApi';

const About: React.FC = () => {
  const { t } = useTranslation();
  const { experiences: currentExperiences, loading: experiencesLoading, error: experiencesError } = useExperiences();

  const skills = [
    { icon: Code, name: 'Frontend', technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
    { icon: Database, name: 'Backend', technologies: ['C# .NET', 'Nest.js', 'ORM (Prisma, Dapper, EfCore)', 'SQL / NoSQL'] },
    { icon: Globe, name: 'DevOps', technologies: ['Docker', 'AWS', 'CI/CD', 'Microsoft Azure'] },
    { icon: Briefcase, name: 'Common', technologies: ['Agile', 'Git', 'Swagger / Postman', 'Jira', "WebSocket"] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-dark-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">
                {t('about.experience')}
              </h3>
              {experiencesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
                  <span className="ml-2 text-gray-400">Loading experience...</span>
                </div>
              ) : experiencesError ? (
                <div className="text-center py-8">
                  <p className="text-red-400">Failed to load experience</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...currentExperiences]
                    .sort((a, b) => {
                      // Current experiences first
                      if (a.current && !b.current) return -1;
                      if (!a.current && b.current) return 1;
                      
                      // Sort by endDate descending (newest first)
                      if (a.current && b.current) {
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                      }
                      
                      if (a.endDate && b.endDate) {
                        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
                      }
                      
                      return 0;
                    })
                    .map((experience) => {
                    const formatDate = (dateString: string) => {
                      const date = new Date(dateString);
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      return `${month}/${year}`;
                    };

                    const startDate = formatDate(experience.startDate);
                    const endDate = experience.endDate ? formatDate(experience.endDate) : null;
                    const endText = experience.current ? t('about.present') : endDate;
                    const dateRange = `${startDate} - ${endText}`;

                    return (
                      <div key={experience.id} className="glass-effect p-4 rounded-lg">
                        <h4 className="font-semibold text-white">{experience.position}</h4>
                        <p className="text-gray-400">
                          {experience.company} • {dateRange}
                        </p>
                        <p className="text-sm text-gray-300 mt-2">
                          {experience.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {experience.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white text-center">
              {t('about.skills')}
            </h3>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-effect p-6 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <skill.icon className="w-6 h-6 text-primary-400" />
                    <h4 className="font-semibold text-white">{skill.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
