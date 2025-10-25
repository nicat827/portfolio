import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Download } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'education', href: '#education' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const openMenu = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleDownloadCV = () => {
    // Open CV from Cloudinary in new tab
    window.open(import.meta.env.VITE_CV_URL, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900 border-b border-gray-600">
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
                onClick={toggleMenu}
                className="bg-dark-800 p-2 rounded-lg hover:bg-dark-700 transition-colors duration-200"
              >
                {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Sidebar */}
            <div className={`absolute right-0 top-0 h-full w-80 bg-dark-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isClosing ? 'translate-x-full' : 'translate-x-0'
            }`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-600">
                  <span className="text-xl font-bold text-white">{t('nav.menu')}</span>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8 space-y-2">
                  {navItems.map((item, index) => (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left px-4 py-3 rounded-lg text-white hover:bg-gray-700 hover:text-primary-400 transition-all duration-200 flex items-center text-base font-medium transform hover:translate-x-2"
                      style={{
                        animation: `slideInRight 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {t(`nav.${item.key}`)}
                    </button>
                  ))}
                </div>
                
                {/* CV Download */}
                <div 
                  className="p-6 border-t border-gray-600"
                  style={{
                    animation: `slideInUp 0.4s ease-out 0.3s both`
                  }}
                >
                  <button
                    onClick={handleDownloadCV}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    {t('nav.cv')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;