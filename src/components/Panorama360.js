import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function PannellumViewer({ image, title, author = "Centro de Cálculo EPS" }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    // Importamos el CSS oficial de la librería
    import('pannellum/build/pannellum.css');
    
    // Cargamos Pannellum solo en el cliente
    const pannellum = require('pannellum');

    // Inicializamos el visor
    viewerRef.current = pannellum.viewer(containerRef.current, {
      type: 'equirectangular',
      panorama: image,
      title: title,
      author: author,
      autoLoad: true,
      autoRotate: -2,
      compass: true, // Un toque técnico extra
      mouseZoom: true,
    });

    // Al cerrar la página, destruimos el visor para liberar RAM
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [image, title, author]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '450px', 
        background: '#000' 
      }} 
    />
  );
}

// Componente exportado con protección para SSR (Server Side Rendering)
export default function Panorama360(props) {
  return (
    <div style={{ 
      border: '1px solid #333', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      margin: '20px 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)' 
    }}>
      <BrowserOnly fallback={<div style={{height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#18171c', color: '#93BD22', fontFamily: 'IBM Plex Mono'}}>Cargando entorno 360...</div>}>
        {() => <PannellumViewer {...props} />}
      </BrowserOnly>
    </div>
  );
}