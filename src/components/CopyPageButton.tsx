import React, { useState, useRef, useEffect } from 'react';

/**
 * CopyPageButton
 * El botón "Copiar página" copia el Markdown de la página al portapapeles
 * (útil para pegarlo en un LLM) o abre el Markdown en bruto en una pestaña nueva.
 * En ambos casos se elimina el frontmatter (--- ... ---) antes de mostrar/copiar.
 *
 * Uso:
 * import { CopyPageButton } from '@site/src/components/CopyPageButton';
 * <CopyPageButton mdUrl="https://raw.githubusercontent.com/cdceps/cdceps.github.io/main/docs/cia-control-internet-aulas.md" />
 */

const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconDoc = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

const IconChevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * Elimina el bloque de frontmatter (--- ... ---) del inicio del Markdown,
 * si existe. No toca el resto del contenido.
 */
function stripFrontmatter(text: string): string {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trimStart();
}

export const CopyPageButton: React.FC<{ mdUrl: string }> = ({ mdUrl }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCleanMarkdown = async (): Promise<string> => {
    const res = await fetch(mdUrl);
    const raw = await res.text();
    return stripFrontmatter(raw);
  };

  const copyMarkdown = async () => {
    try {
      const text = await fetchCleanMarkdown();
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch (err) {
      console.error('No se pudo copiar el Markdown:', err);
      setStatus('error');
    } finally {
      setOpen(false);
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const viewMarkdown = async () => {
    try {
      const text = await fetchCleanMarkdown();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
      // Liberamos el blob pasado un rato prudencial tras abrirse la pestaña
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    } catch (err) {
      console.error('No se pudo abrir el Markdown:', err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="eps-copypage-wrapper" ref={wrapperRef}>
      <div className="eps-copypage-bar">
        <button type="button" className="eps-copypage-main" onClick={copyMarkdown}>
          {status === 'copied' ? <IconCheck /> : <IconCopy />}
          <span>{status === 'copied' ? 'Copiado' : status === 'error' ? 'Error' : 'Copiar página'}</span>
        </button>
        <button
          type="button"
          className="eps-copypage-chevron"
          aria-expanded={open}
          aria-label="Más opciones"
          onClick={() => setOpen(!open)}
        >
          <IconChevron open={open} />
        </button>
      </div>

      {open && (
        <div className="eps-copypage-menu">
          <button type="button" className="eps-copypage-item" onClick={copyMarkdown}>
            <span className="eps-copypage-item-icon"><IconCopy /></span>
            <span className="eps-copypage-item-text">
              <strong>Copiar página</strong>
              <small>Copiar la página en Markdown para LLMs</small>
            </span>
          </button>
          <button type="button" className="eps-copypage-item" onClick={viewMarkdown}>
            <span className="eps-copypage-item-icon"><IconDoc /></span>
            <span className="eps-copypage-item-text">
              <strong>Ver como Markdown <IconExternal /></strong>
              <small>Ver esta página en texto plano</small>
            </span>
          </button>
        </div>
      )}

      <style>{`
        .eps-copypage-wrapper {
          position: relative;
          display: inline-block;
        }
        .eps-copypage-bar {
          display: flex;
          align-items: stretch;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }
        .eps-copypage-main, .eps-copypage-chevron {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          color: #e6e6e6;
          font-size: 13px;
          font-weight: 500;
          font-family: inherit;
          transition: background 150ms ease, color 150ms ease;
        }
        .eps-copypage-main {
          padding: 0.45rem 0.75rem;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .eps-copypage-chevron {
          padding: 0.45rem 0.55rem;
          justify-content: center;
        }
        .eps-copypage-main:hover, .eps-copypage-chevron:hover {
          background: rgba(249,185,5,0.10);
          color: #f9b905;
        }
        .eps-copypage-menu {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          width: 260px;
          background: #14180fee;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          padding: 6px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 50;
          backdrop-filter: blur(6px);
        }
        .eps-copypage-item {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          width: 100%;
          padding: 0.55rem 0.6rem;
          border-radius: 7px;
          cursor: pointer;
          color: #e6e6e6;
          transition: background 150ms ease;
        }
        .eps-copypage-item:hover {
          background: rgba(249,185,5,0.10);
        }
        .eps-copypage-item-icon {
          margin-top: 2px;
          color: #93BD22;
          flex-shrink: 0;
        }
        .eps-copypage-item-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .eps-copypage-item-text strong {
          font-size: 13.5px;
          font-weight: 600;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .eps-copypage-item-text small {
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
};

export default CopyPageButton;
