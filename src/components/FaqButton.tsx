import React from 'react';
import styles from './FaqButton.module.css';

/**
 * FaqButton
 * Botón "Consultar todo el FAQ" (efecto blob al hover).
 * Primera prueba de migración de custom.css a CSS Modules.
 *
 * Uso:
 * import { FaqButton } from '@site/src/components/FaqButton';
 * <FaqButton href="/docs/cia-faq" label="Consultar todo el FAQ" />
 */

type Props = {
  href: string;
  label: string;
};

export const FaqButton: React.FC<Props> = ({ href, label }) => {
  return (
    <div style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>
      <a href={href} aria-label={label} className={styles.faqBtn}>
        <span className={styles.faqBtnLabel}>{label}</span>
        <span className={styles.faqBtnBlob} />
      </a>
    </div>
  );
};

export default FaqButton;
