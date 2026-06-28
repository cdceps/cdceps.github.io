import React, { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

export default function BuscadorMovil(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSearch = (): void => {
    const q = query.trim();
    if (!q) return;
    window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') setIsOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className="cateps-search-movil-container">
      {/* BOTÓN LUPA DE LA NAVBAR */}
      <button
        className="cateps-lupa-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Buscar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="cateps-search-modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}>
          <div className="cateps-search-modal-card">
            {/* Cabecera */}
            <div className="cateps-search-modal-header">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cateps-lupa-interna">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="search"
                placeholder="Buscar en Ayuda Docente..."
                className="cateps-search-modal-input"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button className="cateps-search-modal-close" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>

            {/* Área de resultados */}
            <div className="cateps-search-modal-results">
              {query.trim() === '' ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', textAlign: 'center', marginTop: '2rem' }}>
                  Escribe para buscar...
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', gap: '1rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textAlign: 'center' }}>
                    Pulsa <strong style={{ color: '#f9b905' }}>Enter</strong> o el botón para buscar
                  </p>
                  <button
                    onClick={handleSearch}
                    style={{
                      backgroundColor: '#f9b905',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '10px 24px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    Buscar "{query}"
                  </button>
                </div>
              )}
            </div>

            <div className="cateps-search-modal-footer" />
          </div>
        </div>
      )}
    </div>
  );
}