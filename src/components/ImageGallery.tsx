import React, { useState, useEffect } from 'react';
import styles from './ImageGallery.module.css';

interface GalleryImage {
  src: string;
  title: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps): JSX.Element | null {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (index === null) return;
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const closeLightbox = (): void => { setIndex(null); setZoom(1); };

  const nextImg = (e?: React.MouseEvent): void => {
    e?.stopPropagation();
    if (index !== null) {
      setIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      setZoom(1);
    }
  };

  const prevImg = (e?: React.MouseEvent): void => {
    e?.stopPropagation();
    if (index !== null) {
      setIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      setZoom(1);
    }
  };

  const handleZoom = (factor: number): void => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + factor)));
  };

  if (!images || images.length === 0) return null;

  return (
    <div style={{ margin: '2rem 0' }}>
      <div className={styles.galleryGrid}>
        {images.map((img, idx) => (
          <div key={idx} className={styles.galleryCard} onClick={() => setIndex(idx)}>
            <div className={styles.galleryThumbnailWrapper}>
              <img src={img.src} alt={img.title} className={styles.galleryThumbnail} />
            </div>
            <div className={styles.galleryCardFooter}><span>{img.title}</span></div>
          </div>
        ))}
      </div>

      {index !== null && (
        <div className={styles.galleryLightbox} onClick={closeLightbox}>

          {/* Indicadores de Teclado Fijos */}
          <div className={`${styles.kbdHelp} ${styles.topLeft}`}>Esc para cerrar</div>
          <div className={`${styles.kbdHelp} ${styles.topRight}`}>Flechas para navegar</div>

          {/* Controles Superiores Fijos */}
          <div className={styles.galleryControlsTop} onClick={e => e.stopPropagation()}>
            <button onClick={() => setZoom(1)} title="Ajustar tamaño inicial">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 30"
                width="16"
                height="15"
                fill="currentColor"
                style={{ display: 'block' }}
              >
                <path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" />
              </svg>
            </button>
            <button onClick={() => handleZoom(0.25)}>+</button>
            <button onClick={() => handleZoom(-0.25)}>-</button>
            <button onClick={closeLightbox} className={styles.closeX} title="Cerrar">
              <span style={{ display: 'inline-block', transform: 'translateY(-2px)', lineHeight: 1 }}>
                &times;
              </span>
            </button>
          </div>

          {/* Flechas Laterales Fijas */}
          <button className={`${styles.navBtnClean} ${styles.prev}`} onClick={prevImg}>&#10094;</button>
          <button className={`${styles.navBtnClean} ${styles.next}`} onClick={nextImg}>&#10095;</button>

          {/* Contenedor de Imagen a Pantalla Completa Real */}
          <div className={styles.imgZoomContainer} onClick={closeLightbox}>
            <img
              src={images[index].src}
              alt={images[index].title}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: `${85 * zoom}vw`,
                maxHeight: `${75 * zoom}vh`
              }}
            />
          </div>

          {/* Pie de foto Fijo Flotante */}
          <p className={styles.galleryLightboxCaption} onClick={e => e.stopPropagation()}>
             [{index + 1} / {images.length}] {images[index].title}
          </p>
        </div>
      )}
    </div>
  );
}
