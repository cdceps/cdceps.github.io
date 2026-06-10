import React from 'react';
import { useLocation } from '@docusaurus/router'; // Hook nativo para rastrear la URL real
import Layout from '@theme-original/Layout';
import BackToTopFlotante from '@site/src/components/BackToTopFlotante';
import BuscadorMovil from '@site/src/components/BuscadorMovil';

export default function LayoutWrapper(props: any): JSX.Element {
  const { pathname } = useLocation();
  
  /* Condicional de inmunidad: Si estamos en incidencias, evitamos inyectar los accesos de la navbar */
  const esPaginaIncidencias = pathname.includes('incidencias-aulas-cateps');

  return (
    <>
      <Layout {...props} />
      {/* Botón flotante integrado de forma nativa en la raíz de la web */}
      <BackToTopFlotante />
      
      {!esPaginaIncidencias && (
        <>
          <BuscadorMovil /> 
          
          {/* Botón de GitHub exclusivo para pantallas móviles */}
          <div className="cateps-github-movil-container">
            <a 
              href="https://github.com/cdceps/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cateps-github-movil-btn"
              aria-label="GitHub"
            ></a>
          </div>
        </>
      )}
    </>
  );
}