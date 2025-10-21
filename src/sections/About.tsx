import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();

  const skills = [
    { icon: Code, name: 'Frontend', technologies: ['React', 'TypeScript', 'Next.js', 'Vue.js'] },
    { icon: Database, name: 'Backend', technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { icon: Globe, name: 'DevOps', technologies: ['Docker', 'AWS', 'CI/CD', 'Linux'] },
    { icon: Smartphone, name: 'Mobile', technologies: ['React Native', 'Flutter', 'iOS', 'Android'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
              <div className="space-y-3">
                <div className="glass-effect p-4 rounded-lg">
                  <h4 className="font-semibold text-white">Senior Full Stack Developer</h4>
                  <p className="text-gray-400">Company Name • 2022 - Present</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Leading development of scalable web applications using modern technologies.
                  </p>
                </div>
                <div className="glass-effect p-4 rounded-lg">
                  <h4 className="font-semibold text-white">Frontend Developer</h4>
                  <p className="text-gray-400">Previous Company • 2020 - 2022</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Developed responsive user interfaces and optimized application performance.
                  </p>
                </div>
              </div>
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
