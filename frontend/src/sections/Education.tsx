import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { useEducation } from '../hooks/useApi';

const Education: React.FC = () => {
  const { t } = useTranslation();
  const { education, loading, error } = useEducation();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      t('education.months.January'),
      t('education.months.February'),
      t('education.months.March'),
      t('education.months.April'),
      t('education.months.May'),
      t('education.months.June'),
      t('education.months.July'),
      t('education.months.August'),
      t('education.months.September'),
      t('education.months.October'),
      t('education.months.November'),
      t('education.months.December'),
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const getDateRange = (startDate: string, endDate?: string, current?: boolean) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : current ? t('education.present') : '';
    return end ? `${start} - ${end}` : start;
  };

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('education.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-effect rounded-lg p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left side - Institution and degree */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-primary-400" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {edu.degree}
                        </h3>
                        <h4 className="text-xl text-primary-400 mb-2">
                          {edu.institution}
                        </h4>
                        <p className="text-gray-300 mb-4">
                          {edu.field}
                        </p>
                        
                        {edu.description && (
                          <p className="text-gray-400 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Date and details */}
                  <div className="lg:w-80 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {getDateRange(edu.startDate, edu.endDate, edu.current)}
                      </span>
                    </div>

                    {edu.grade && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-sm">
                          <strong className="text-white">{t('education.grade')}:</strong> {edu.grade}
                        </span>
                      </div>
                    )}

                    {edu.website && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary-400" />
                        <a
                          href={edu.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300 text-sm transition-colors duration-200"
                        >
                          {t('education.visitWebsite')}
                        </a>
                      </div>
                    )}

                    {edu.current && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 w-fit">
                        {t('education.current')}
                      </div>
                    )}
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

export default Education;
