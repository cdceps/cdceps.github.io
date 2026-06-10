import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Importamos los tipos de eventos nativos de React para blindar los controladores
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import Layout from '@theme/Layout';

/**
 * =========================================================================
 * CONFIGURACIÓN DE RECURSOS ESTÁTICOS DE LA APP (FUERA DEL CICLO DE REACT)
 * =========================================================================
 */
const FONDOS_CATEPS: string[] = [
  '/img/cateps.webp',           /* Imagen base / original */
  '/img/cateps-aerea.webp',         /* Vista aérea */
  '/img/cateps-patio-central.webp',   /* Encuadre del patio central */
  '/img/cateps-edificio.webp',      /* Lateral de edificio */
  '/img/cateps-terraza.webp',       /* Terraza */
  '/img/cateps-entrada.webp'        /* Edificio de entrada */
];

const ENLACE_FORMSPREE = 'https://formspree.io/f/mzdovvjg';

const TIPOS_INCIDENCIA: string[] = [
  'Audiovisual',
  'Equipos informáticos',
  'Instalaciones y redes',
  'Otras'
];

const LISTADO_AULAS: string[] = [
  'L1-A-ESC', 'L1-D-ATC', 'L2-D-ATC', 'L1-D-IQ', 
  'L1-D-IEL', 'L1-D-MMC', 'L2-D-QA', 'DS5.4', 'Otras'
];

interface FormDataState {
  nombreProfesor: string;
  tipoIncidencia: string;
  aula: string;
  descripcion: string;
  notificarEstado: string;
  email: string;
}

const INITIAL_FORM_STATE: FormDataState = {
  nombreProfesor: '',
  tipoIncidencia: '',
  aula: '',
  descripcion: '',
  notificarEstado: '',
  email: ''
};

interface ApiState {
  loading: boolean;
  success: boolean;
  error: boolean;
}

export default function IncidenciasAulas(): JSX.Element {
  /**
   * =========================================================================
   * 1. GESTIÓN DE ESTADOS CORE
   * =========================================================================
   */
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sysTime, setSysTime] = useState<string>('');
  
  /* Estados booleanos de control de interfaz de usuario */
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const [hideForm, setHideForm] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [fondoActual, setFondoActual] = useState<string>('/img/cateps.webp');

  /* Estado de la petición API a Formspree */
  const [apiState, setApiState] = useState<ApiState>({ 
    loading: false, 
    success: false, 
    error: false 
  });

  /**
   * =========================================================================
   * 2. COMPONENTES MEMORIZADOS (PREVENCIÓN DE RE-RENDERS POR EL RELOJ)
   * =========================================================================
   */
  const fluorAsterisk = useMemo(() => (
    <span style={{ 
      color: isDark ? '#ff0055' : '#dc2626', 
      textShadow: isDark ? '0 0 8px rgba(255, 0, 85, 0.6)' : 'none', 
      fontWeight: 'bold' 
    }}>
      {" "}*
    </span>
  ), [isDark]);

  /**
   * =========================================================================
   * 3. EFECTOS (SINCRONIZACIÓN CON EL DOM Y RELOJ DEL SISTEMA)
   * =========================================================================
   */
  
  /* Sincronización inicial del tema visual con Docusaurus */
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');
  }, []);

  /* Orquestador del reloj en tiempo real y selector aleatorio de fondo */
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FONDOS_CATEPS.length);
    setFondoActual(FONDOS_CATEPS[randomIndex]);

    const formatTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
      };
      setSysTime(now.toLocaleString('es-ES', options).replace(',', ' ·'));
    };

    formatTime();
    const timer = setInterval(formatTime, 1000);
    return () => clearInterval(timer);
  }, []);

  /**
   * =========================================================================
   * 4. CONTROLADORES DE EVENTOS (HANDLERS INTERACTIVOS)
   * =========================================================================
   */

  /* Motor de animación expansiva Paul Stamatiou (CSS View Transitions API) */
  const handleThemeToggle = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;
    const x = event.clientX ?? window.innerWidth / 2;
    const y = event.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const applyThemeDOM = (toDark: boolean) => {
      document.documentElement.setAttribute('data-theme', toDark ? 'dark' : 'light');
      setIsDark(toDark);
    };

    // Extensiones globales para simular el comportamiento experimental en TS
    const docWithTransition = document as any;

    if (!docWithTransition.startViewTransition || hideForm) {
      applyThemeDOM(nextDark);
      return;
    }

    const transition = docWithTransition.startViewTransition(() => {
      applyThemeDOM(nextDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      
      document.documentElement.animate(
        { clipPath: nextDark ? clipPath : [...clipPath].reverse() },
        {
          duration: 450,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: nextDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
        }
      );
    });
  }, [isDark, hideForm]);

  /* Captura de datos en inputs reactivos con tipado estricto de controles HTML */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let val: string = value;

    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked ? 'Sí' : 'No';
    }
    
    setFormData((prev) => {
      const nextState = { ...prev, [name]: val };
      /* Si cambia la notificación a 'No', purgamos el correo electrónico de forma preventiva */
      if (name === 'notificarEstado' && val === 'No') {
        nextState.email = '';
      }
      return nextState;
    });

    /* Limpieza automática del flag de error inline al escribir */
    setErrors((prev) => {
      if (prev[name]) {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      }
      return prev;
    });
  }, []);

  /* Reset estructural de hilos y campos */
  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setApiState({ loading: false, success: false, error: false });
  }, []);

  /* Validador y gestor de envíos asíncronos a Formspree */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiState({ loading: true, success: false, error: false });

    /* Análisis de campos obligatorios mediante mapeo estructurado */
    const validationErrors: Record<string, boolean> = {};
    const camposRequeridos: (keyof FormDataState)[] = ['nombreProfesor', 'tipoIncidencia', 'aula', 'descripcion', 'notificarEstado'];
    
    camposRequeridos.forEach(campo => {
      if (!formData[campo] || !formData[campo].trim()) {
        validationErrors[campo] = true;
      }
    });

    /* Condicional de correo condicionado al campo obligatorio número 5 */
    if (formData.notificarEstado === 'Sí' && !formData.email.trim()) {
      validationErrors.email = true;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiState({ loading: false, success: false, error: false });
      return; 
    }

    try {
      const response = await fetch(ENLACE_FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setApiState({ loading: false, success: true, error: false });
        setErrors({});
        setFormData(INITIAL_FORM_STATE);
      } else {
        setApiState({ loading: false, success: false, error: true });
      }
    } catch (err) {
      setApiState({ loading: false, success: false, error: true });
    }
  };

  return (
    <Layout title="Incidencias CATEPS" description="Apertura de incidencias en las aulas">
      
      {/* Purga perimetral de Layout nativo de Docusaurus en el portal de incidencias */}
      <style dangerouslySetInnerHTML={{__html: `
        .navbar { display: none !important; }
        .main-wrapper { padding-top: 0 !important; }
      `}} />

      {/* Switcher de tema flotante (Oculto en modo visualización pura de fondo) */}
      {!hideForm && (
        <button 
          id="theme-toggle-btn" 
          type="button"
          className="cateps-theme-toggle-btn"
          onClick={handleThemeToggle}
          title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          aria-label="Cambiar tema visual"
        >
          <svg className="theme-toggle-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <mask id="moon-mask-cateps">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle className="moon-cradle-cateps" cx="32" cy="0" r="12" fill="black" />
            </mask>
            <circle className="main-circle-cateps" cx="16" cy="16" r="6.5" fill="currentColor" mask="url(#moon-mask-cateps)" />
            <path className="sun-rays-cateps" fill="currentColor" stroke="none" d="M16 .9c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3S14.7.9 16 .9zm0 25.6c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3zm12.8-12.8c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zM6.7 4.4c1.3 0 2.3 1 2.3 2.3S8 9 6.7 9 4.4 8 4.4 6.7s1-2.3 2.3-2.3zm18.6 18.6c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3zM25.3 4.4c1.3 0 2.3 1 2.3 2.3S26.6 9 25.3 9 23 8 23 6.7s1-2.3 2.3-2.3zM6.7 23c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
          </svg>
        </button>
      )}

      {/* Telón perimetral de fondo de la página */}
      <div 
        className="incidencias-page-bg"
        style={{
          backgroundImage: hideForm
            ? `linear-gradient(rgba(18, 18, 18, 0.45), rgba(18, 18, 18, 0.45)), url(${fondoActual})`
            : `linear-gradient(rgba(18, 18, 18, 0.88), rgba(18, 18, 18, 0.88)), url(${fondoActual})`,
          transition: 'background-image 0.4s ease-in-out'
        }}
      >
        
        {/* Recuperación de Interfaz: Ojo activo superior (Solo modo visualización) */}
        {hideForm && (
          <div className="rescue-eye-top-center">
            <button type="button" className="rescue-eye-top-btn" onClick={() => setHideForm(false)} title="Volver a mostrar el formulario">
              <img src="/img/eye-on-icon.svg" alt="Mostrar formulario" className="rescue-eye-top-svg" />
            </button>
          </div>
        )}

        {/* Módulo de protección de datos e información perimetral */}
        {showPrivacy && (
          <>
            <div className="privacy-overlay" onClick={() => setShowPrivacy(false)}></div>
            <div className="mirror-info-zone">
              <button type="button" className="info-icon-btn active" onClick={() => setShowPrivacy(false)} title="Cerrar aviso de privacidad">
                <img src="/img/info-icon.svg" alt="Info Icon" className="info-svg-icon" />
              </button>
            </div>
            <img src="/img/arrow-icon.svg" alt="Indicador" className="privacy-drawn-arrow" />
            <div className="tooltip-privacy-box">
              <button type="button" className="tooltip-privacy-close" onClick={() => setShowPrivacy(false)} title="Cerrar aviso">&times;</button>
              <h4 className="tooltip-privacy-title">AVISO DE PRIVACIDAD</h4>
              <p className="tooltip-privacy-text">
                Este formulario no almacena sesiones ni credenciales universitarias de forma automática. Únicamente se registrarán los datos introducidos explícitamente en los campos obligatorios para la gestión del parte.
              </p>
            </div>
          </>
        )}

        {/* Tarjeta y Envoltorio Principal */}
        <div 
          className="incidencias-wrapper inspector-fade"
          style={{
            opacity: hideForm ? 0 : 1,
            pointerEvents: hideForm ? 'none' : 'auto'
          }}
        >
          {/* Barra de utilidades externa perimetral */}
          <div className="incidencias-status-bar">
            <div className="status-bar-utilities">
              <button type="button" className={`info-icon-btn ${showPrivacy ? 'active' : ''}`} onClick={() => setShowPrivacy(!showPrivacy)} title="Aviso de privacidad">
                <img src="/img/info-icon.svg" alt="Info Icon" className="info-svg-icon" />
              </button>
              <button type="button" className="reset-icon-btn" onClick={handleReset} title="Limpiar formulario">
                <img src="/img/reset-icon.svg" alt="Reset Icon" className="reset-svg-icon" />
              </button>
              <button type="button" className="reset-icon-btn" onClick={() => setHideForm(true)} title="Ocultar interfaz para ver fondo">
                <img src="/img/eye-off-icon.svg" alt="Ocultar interfaz" className="reset-svg-icon" />
              </button>
            </div>
            <div className="incidencias-timestamp">
              {sysTime || 'CONECTANDO...'}
            </div>
          </div>

          {/* Tarjeta Consola */}
          <div className="incidencias-card">
            <div className="incidencias-top-controls">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <div className="incidencias-card-branding">
                <a href="https://eps.us.es/" target="_blank" rel="noopener noreferrer" className="branding-link" title="Web Oficial EPS">
                  <img src="/img/eps-isotipo-color.svg" alt="EPS Logo" className="incidencias-card-logo eps-logo-dim" />
                </a>
              </div>
            </div>

            <h2 className="terminal-title-center">INCIDENCIAS AULAS CATEPS</h2>
            <hr className="incidencias-divider" />
            <p className="subtitle">Apertura automatizada de incidencias en las aulas del CATEPS.</p>

            <form onSubmit={handleSubmit} noValidate className="incidencias-form">
              
              {/* Campo 1: Nombre */}
              <div className="form-group">
                <label>1. Nombre completo del profesor o profesora{fluorAsterisk}</label>
                <input type="text" name="nombreProfesor" value={formData.nombreProfesor} onChange={handleChange} placeholder="Introduzca su nombre completo, por favor..." />
                {errors.nombreProfesor && <span className="incidencias-error-msg">Por favor, rellena este campo obligatorio.</span>}
              </div>

              {/* Campo 2: Categoría */}
              <div className="form-group">
                <label>2. Seleccione el tipo de incidencia{fluorAsterisk}</label>
                <select name="tipoIncidencia" value={formData.tipoIncidencia} onChange={handleChange}>
                  <option value="" disabled>Seleccione una opción...</option>
                  {TIPOS_INCIDENCIA.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                </select>
                {errors.tipoIncidencia && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

              {/* Campo 3: Aula */}
              <div className="form-group">
                <label>3. Aula{fluorAsterisk}</label>
                <select name="aula" value={formData.aula} onChange={handleChange}>
                  <option value="" disabled>Seleccione el aula afectada...</option>
                  {LISTADO_AULAS.map(aula => <option key={aula} value={aula}>{aula}</option>)}
                </select>
                {errors.aula && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

              {/* Campo 4: Descripción */}
              <div className="form-group">
                <label>4. Escriba una breve descripción de la incidencia{fluorAsterisk}</label>
                <textarea name="descripcion" rows={4} value={formData.descripcion} onChange={handleChange} placeholder="Escriba su respuesta describiendo el problema..." />
                {errors.descripcion && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

              {/* Campo 5: Radios Notificación */}
              <div className="form-group">
                <label>5. ¿Desea recibir información sobre el estado de esta incidencia?{fluorAsterisk}</label>
                <div className="incidencias-radio-group">
                  <label className="incidencias-radio-label radio-si">
                    <input type="radio" name="notificarEstado" value="Sí" checked={formData.notificarEstado === 'Sí'} onChange={handleChange} required />
                    <span className="custom-radio-box"></span> Sí
                  </label>
                  <label className="incidencias-radio-label radio-no">
                    <input type="radio" name="notificarEstado" value="No" checked={formData.notificarEstado === 'No'} onChange={handleChange} required />
                    <span className="custom-radio-box"></span> No
                  </label>
                </div>
                {errors.notificarEstado && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

              {/* Campo 6: Email condicional */}
              {formData.notificarEstado === 'Sí' && (
                <div className="form-group field-animate-fade">
                  <label>6. Correo electrónico{fluorAsterisk}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Inserte su correo electrónico..." />
                  {errors.email && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
                </div>
              )}

              {/* Alertas de Feedback */}
              {apiState.success && (
                <div className="alert alert-success">
                  <strong>[OK]</strong> Incidencia registrada con éxito. La incidencia ha sido enviada al Centro de Cálculo.
                </div>
              )}

              {apiState.error && (
                <div className="alert alert-danger">
                  <strong>[ERROR]</strong> No se pudo procesar el envío de la incidencia. Compruebe la red del aula.
                </div>
              )}

              <button type="submit" disabled={apiState.loading} className="btn-submit">
                {apiState.loading ? 'ENVIANDO...' : 'ENVIAR INCIDENCIA'}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}