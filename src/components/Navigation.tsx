import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Download } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleDownloadCV = () => {
    // Здесь можно добавить логику скачивания CV
    // Например, открыть ссылку на файл или скачать напрямую
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Путь к файлу CV
    link.download = 'CV.pdf';
    link.click();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold gradient-text">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Language Switcher, CV Download & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {/* CV Download Button */}
            <button
              onClick={handleDownloadCV}
              className="btn-primary flex items-center gap-2 px-3 py-2 text-sm font-medium hidden sm:flex"
            >
              <Download className="w-4 h-4" />
              {t('nav.cv')}
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-effect p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-dark-900 z-50 md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <span className="text-xl font-bold gradient-text">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-left px-6 py-4 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 flex items-center text-lg font-medium"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}
              </div>
              
              {/* CV Download */}
              <div className="p-6 border-t border-gray-800">
                <button
                  onClick={handleDownloadCV}
                  className="w-full btn-primary flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-lg font-medium"
                >
                  <Download className="w-5 h-5" />
                  {t('nav.cv')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

