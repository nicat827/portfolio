import { useEffect } from 'react';
import './i18n';
import Navigation from './components/Navigation';
import ThreeBackground from './components/ThreeBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Nijat Majidov',
      url: 'https://nijatmajidov.com',
      sameAs: [
        'https://github.com/nijatmajidov',
        'https://linkedin.com/in/nijatmajidov',
      ],
      jobTitle: 'Full-Stack Developer',
      description: 'Full-stack developer specializing in React, TypeScript, Node.js, and NestJS',
      skills: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <ThreeBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;