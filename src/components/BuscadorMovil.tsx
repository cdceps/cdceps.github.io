import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';

export default function BuscadorMovil(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Sincronizamos con el input nativo oculto de Docusaurus con tipado HTML estricto
  const handleInputMovi = (e: ChangeEvent<HTMLInputElement>): void => {
    const nativoInput = document.querySelector('.navbar__search-input') as HTMLInputElement | null;
    if (nativoInput) {
      nativoInput.value = e.target.value;
      // Disparamos el evento nativo para que el plugin local busque al vuelo
      const evento = new Event('input', { bubbles: true });
      nativoInput.dispatchEvent(evento);
    }
  };

  // Bloquear el scroll de la web trasera cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className="cateps-search-movil-container">
      {/* 1. BOTÓN LUPA DE LA NAVBAR */}
      <button className="cateps-lupa-trigger" onClick={() => setIsOpen(true)} aria-label="Buscar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {/* 2. EL MODAL MODERNO ESTILO TAKKEN.IO */}
      {isOpen && (
        <div className="cateps-search-modal-overlay">
          <div className="cateps-search-modal-card">
            
            {/* Cabecera del Buscador */}
            <div className="cateps-search-modal-header">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cateps-lupa-interna">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="cateps-search-modal-input"
                onChange={handleInputMovi}
                autoFocus
              />
              
              <button className="cateps-search-modal-close" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>

            {/* Resultados espejo nativos */}
            <div className="cateps-search-modal-results" onClick={() => setIsOpen(false)}>
              <p style={{color: 'rgba(255,255,255,0.4)', fontSize: '14px', textAlign: 'center', marginTop: '2rem'}}>
                Escribe para ver los resultados...
              </p>
            </div>

            {/* Pie de página clónico */}
            <div className="cateps-search-modal-footer">
              <span>Desarrollado con Docusaurus 🦖</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}