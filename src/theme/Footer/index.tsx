import React, {useState, useEffect} from 'react';
import Footer from '@theme-original/Footer';
import { useLocation } from '@docusaurus/router';
import styles from './Footer.module.css';

// Tipamos las propiedades heredadas de forma segura para evitar bucles de rutas
export default function FooterWrapper(props: any): JSX.Element {
  const { pathname } = useLocation();

  // 1. Control de rutas específicas
  const isHome = pathname === '/' || pathname === '/index.html';

  // 🌟 DETECTOR DEL PORTAL DE INCIDENCIAS
  const isFormulario = pathname.includes('incidencias-aulas-cateps') || pathname.includes('gestion-aulas-cateps');

  // 📱 DETECTOR DE MÓVIL con hook reactivo
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'auto' }); // Hachazo instantáneo hacia arriba
  };

  // SVG del botón TOP reutilizable
  const TopButtonSVG = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      style={{ display: 'block', transform: 'rotate(-90deg)' }}
    >
      <g fill="currentColor">
        <path d="M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"></path>
        <path d="M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"></path>
      </g>
    </svg>
  );

  // 🪓 CASO A: Si estamos en el formulario, metemos el footer minimalista sin Dino ni fuentes alteradas
  if (isFormulario) {
    return (
      <div className={styles.footerWrapperRelative}>
        <footer className="footer footer--dark" style={{ backgroundColor: 'rgba(15, 15, 15, 0.9)', borderTop: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.5rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="container container-fluid text--center">
            <div className="footer__copyright" style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
              Copyright © {new Date().getFullYear()} Escuela Politécnica Superior.
            </div>
          </div>
        </footer>
        {/* Botón de TOP personalizado */}
        <button className={styles.backToTop} onClick={scrollToTop}>
          <TopButtonSVG />
          <span>TOP</span>
        </button>
      </div>
    );
  }

  // 📱 CASO B: Móvil — footer minimalista gris, solo copyright, sin dino
if (isMobile && !isHome) {
  return (
    <div className={styles.footerWrapperRelative} style={{backgroundColor: '#1b1b1d', padding: 0}}>
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#1b1b1d',
        padding: '0.75rem 1rem',
        textAlign: 'center',
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.45)',
          fontSize: '0.78rem',
        }}>
          Copyright © {new Date().getFullYear()} · Escuela Politécnica Superior
        </div>
      </footer>
    </div>
  );
}

  // 📋 CASO C: El comportamiento original del resto de la web se mantiene intacto
  return (
    <div className={styles.footerWrapperRelative}>
      {/* Footer original de Docusaurus recuperando su alias estándar */}
      <Footer {...props} />
      {/* Control con el SVG exacto de la sidebar rotado hacia arriba */}
      {!isHome && (
        <button className={styles.backToTop} onClick={scrollToTop}>
          <TopButtonSVG />
          <span>TOP</span>
        </button>
      )}
    </div>
  );
}