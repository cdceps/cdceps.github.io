import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function BackToTopFlotante(): JSX.Element | null {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isHome = pathname === '/' || pathname === '/index.html';
  const isFormulario = pathname.includes('incidencias-aulas-cateps') || pathname.includes('gestion-aulas-cateps');

  useEffect(() => {
    if (isHome || isFormulario) return;

    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      const distanceFromBottom = totalHeight - (scrollY + windowHeight);

      if (scrollY > 300 && distanceFromBottom > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, isFormulario]);

  const scrollToTopSmooth = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isHome || isFormulario) return null;

  return (
    <button
      type="button"
      onClick={scrollToTopSmooth}
      className={`cateps-btn-flotante ${isVisible ? 'visible' : ''}`}
      title="Volver arriba"
      aria-label="Volver arriba"
    >
      {/* 📏 Línea horizontal industrial */}
      <span className="cateps-linea-tope"></span>
      
      {/* 🚀 SVG con Chevron simple */}
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        aria-hidden="true"
        style={{ display: 'block', transform: 'rotate(-90deg)' }}
      >
        <g fill="currentColor">
          <path d="M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"></path>
        </g>
      </svg>
    </button>
  );
}