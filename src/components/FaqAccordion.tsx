import React, { useState, useRef, useEffect } from 'react';

/**
 * FaqAccordion + FaqItem
 * Acordeón minimalista estilo sin cajas, "+" que rota a "x",
 * animación suave de despliegue (max-height), sin saltos.
 *
 * Uso en MDX:
 *
 * import { FaqAccordion, FaqItem } from '@site/src/components/FaqAccordion';
 *
 * <FaqAccordion>
 *   <FaqItem question="¿Pregunta?">
 *     Respuesta en **markdown** normal.
 *   </FaqItem>
 * </FaqAccordion>
 */

export const FaqAccordion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="eps-faq-accordion-v2">
      {children}
      <style>{`
        .eps-faq-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        }
        .eps-faq-question {
          all: unset;
          box-sizing: border-box;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.15rem 0;
          cursor: pointer;
          color: #ffffff;
          font-weight: 500;
          font-size: 18px;
          font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .eps-faq-icon {
          flex-shrink: 0;
          font-size: 1.6rem;
          font-weight: 300;
          line-height: 1;
          color: #ffffff;
          transition: color 250ms ease, transform 250ms ease;
        }
        .eps-faq-question:hover .eps-faq-icon {
          color: #f9b905;
          transform: scale(1.6);
        }
        .eps-faq-question[aria-expanded="true"] .eps-faq-icon {
          transform: rotate(45deg);
        }
        .eps-faq-question[aria-expanded="true"]:hover .eps-faq-icon {
          color: #f9b905;
          transform: rotate(45deg) scale(1.3);
        }
        .eps-faq-panel {
          overflow: hidden;
          max-height: 0px;
          opacity: 0;
          transition: max-height 350ms cubic-bezier(.4,0,.2,1), opacity 280ms ease;
        }
        .eps-faq-panel.eps-faq-open {
          opacity: 1;
        }
        .eps-faq-answer {
          padding: 0 2.5rem 1.25rem 0;
          color: var(--ifm-color-emphasis-700);
          font-size: 16px;
          line-height: 1.7;
        }
        .eps-faq-answer p {
          margin: 0 0 0.6rem 0;
        }
        .eps-faq-answer p:last-child {
          margin-bottom: 0;
        }
        .eps-faq-answer ul,
        .eps-faq-answer ol {
          padding-left: 1.25rem;
          margin: 0 0 0.6rem 0;
        }
      `}</style>
    </div>
  );
};

export const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    if (open && panelRef.current) {
      setMaxHeight(`${panelRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [open, children]);

  return (
    <div className="eps-faq-item">
      <button
        type="button"
        className="eps-faq-question"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className="eps-faq-icon" aria-hidden="true">+</span>
      </button>
      <div
        ref={panelRef}
        className={`eps-faq-panel${open ? ' eps-faq-open' : ''}`}
        style={{ maxHeight }}
      >
        <div className="eps-faq-answer">{children}</div>
      </div>
    </div>
  );
};

export default FaqAccordion;
