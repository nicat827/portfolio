import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Smooth smoke particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
      targetX: number;
      targetY: number;
    }> = [];

    // Create smooth smoke particles
    const createParticle = () => {
      const startX = Math.random() * canvas.width;
      const startY = canvas.height + Math.random() * 50;
      
      particles.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.8 - 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        targetX: startX + (Math.random() - 0.5) * 100,
        targetY: startY - Math.random() * 200 - 100,
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles slowly
      if (Math.random() < 0.1) {
        createParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Smooth movement towards target
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        particle.vx += dx * 0.001;
        particle.vy += dy * 0.001;
        
        // Apply gentle forces
        particle.vx *= 0.99; // Air resistance
        particle.vy *= 0.99;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        // Fade out smoothly
        particle.opacity = (1 - particle.life / particle.maxLife) * 0.4;
        particle.size *= 1.005; // Very slow growth

        // Draw particle with gradient
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Create radial gradient for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(0.5, '#1d4ed8');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove dead particles
        if (particle.life >= particle.maxLife || particle.y < -100) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      
      {/* Smooth Smoke Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Gentle Floating Tech Elements (static for calmness) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Subtle Tech Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 30s linear infinite'
        }} />
      </div>

      {/* Floating Tech Symbols - static for calmer look */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary-400/10 font-mono text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {['</>', '{ }', '()', '[]', '=>', '&&', '||', '++', '--', '==', '===', '!=='].sort(() => Math.random() - 0.5)[0]}
          </div>
        ))}
      </div>

      {/* Subtle Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 L20,10 M10,0 L10,20" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" fill="none"/>
              <circle cx="10" cy="10" r="1" fill="rgba(59, 130, 246, 0.2)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="text-white">{t('hero.title')}</span>
            <br />
            <span className="gradient-text">{t('hero.name')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium"
          >
            {t('hero.subtitle')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToProjects}
              className="btn-primary text-lg px-8 py-4"
            >
              {t('hero.cta')}
            </button>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/nicat827"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nicatmajidov"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:nicatmajidov@gmail.com"
                className="glass-effect p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Now at the bottom (no animation, no dots) */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors duration-300"
        >
          <span className="text-sm font-medium">{t('hero.scroll')}</span>
          <div>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
