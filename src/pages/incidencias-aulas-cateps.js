import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

// =========================================================================
// 🚀 REPERTORIO DE FONDOS ALEATORIOS DEL CATEPS
// Los archivos deben estar ubicados exactamente en 'static/img/'
// =========================================================================
const fondosCATEPS = [
  '/img/cateps.webp',               // Imagen base/original
  '/img/cateps-aerea.webp',         // Vista aérea
  '/img/cateps-edificios.webp',      // Perspectiva de los bloques de edificios
  '/img/cateps-patio-central.webp'  // Encuadre del patio central
];
// =========================================================================

export default function IncidenciasAulas() {
  const [formData, setFormData] = useState({
    nombreProfesor: '',
    tipoIncidencia: '',
    aula: '',
    descripcion: '',
    notificarEstado: '', 
    email: '' 
  });
  const [state, setState] = useState({ loading: false, success: false, error: false });
  const [errors, setErrors] = useState({}); 
  const [sysTime, setSysTime] = useState('');
  const [showPrivacy, setShowPrivacy] = useState(false); // Control del tooltip y la capa oscura

  // Almacena el fondo activo seleccionado en la carga
  const [fondoActual, setFondoActual] = useState('/img/cateps.webp');

  // Controla el Modo Inspector (Ocultar o mostrar la interfaz)
  const [hideForm, setHideForm] = useState(false);

  // Estilo reutilizable para el asterisco rojo flúor/neón
  const fluorAsterisk = (
    <span style={{ color: '#ff0055', textShadow: '0 0 8px rgba(255, 0, 85, 0.6)', fontWeight: 'bold' }}>
      {" "}*
    </span>
  );

  // Reloj en tiempo real y selector de fondo aleatorio robusto para SSR
  useEffect(() => {
    // 1. Selección de imagen al azar entre las opciones disponibles
    const randomIndex = Math.floor(Math.random() * fondosCATEPS.length);
    setFondoActual(fondosCATEPS[randomIndex]);

    // 2. Formateador dinámico del reloj del sistema
    const formatTime = () => {
      const now = new Date();
      const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setSysTime(now.toLocaleString('es-ES', options).replace(',', ' ·'));
    };
    formatTime();
    const timer = setInterval(formatTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 'Sí' : 'No') : value;
    
    setFormData({
      ...formData,
      [name]: val
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // 🧹 FUNCIÓN RESET: Devuelve el formulario y los estados de error a cero
  const handleReset = () => {
    setFormData({
      nombreProfesor: '',
      tipoIncidencia: '',
      aula: '',
      descripcion: '',
      notificarEstado: '',
      email: ''
    });
    setErrors({});
    setState({ loading: false, success: false, error: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, success: false, error: false });

    const validationErrors = {};
    if (!formData.nombreProfesor.trim()) validationErrors.nombreProfesor = true;
    if (!formData.tipoIncidencia) validationErrors.tipoIncidencia = true;
    if (!formData.aula) validationErrors.aula = true;
    if (!formData.descripcion.trim()) validationErrors.descripcion = true;
    if (!formData.notificarEstado) validationErrors.notificarEstado = true;
    if (formData.notificarEstado === 'Sí' && !formData.email.trim()) validationErrors.email = true;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setState({ loading: false, success: false, error: false });
      return; 
    }

    try {
      const response = await fetch('https://formspree.io/f/mzdovvjg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setState({ loading: false, success: true, error: false });
        setErrors({});
        setFormData({ nombreProfesor: '', tipoIncidencia: '', aula: '', descripcion: '', notificarEstado: '', email: '' });
      } else {
        setState({ loading: false, success: false, error: true });
      }
    } catch (err) {
      setState({ loading: false, success: false, error: true });
    }
  };

  return (
    <Layout title="Incidencias CATEPS" description="Apertura de incidencias en las aulas">
      
      {/* Oculta el navbar y el padding fantasma de Docusaurus */}
      <style dangerouslySetInnerHTML={{__html: `
        .navbar { display: none !important; }
        .main-wrapper { padding-top: 0 !important; }
      `}} />

      {/* Capa contenedora principal con la imagen aleatoria inline fusionada con el degradado */}
      <div 
        className="incidencias-page-bg"
        style={{
          backgroundImage: hideForm
            ? `linear-gradient(rgba(18, 18, 18, 0.45), rgba(18, 18, 18, 0.45)), url(${fondoActual})`
            : `linear-gradient(rgba(18, 18, 18, 0.88), rgba(18, 18, 18, 0.88)), url(${fondoActual})`,
          transition: 'background-image 0.4s ease-in-out'
        }}
      >
        
        {/* RESCATE: Ojo normal centrado arriba del todo */}
        {hideForm && (
          <div className="rescue-eye-top-center">
            <button 
              type="button" 
              className="rescue-eye-top-btn"
              onClick={() => setHideForm(false)}
              title="Volver a mostrar el formulario"
            >
              <img src="/img/eye-on-icon.svg" alt="Mostrar formulario" className="rescue-eye-top-svg" />
            </button>
          </div>
        )}

        {/* El overlay y la caja flotando en la raíz de la página para que las aspas funcionen al 100% */}
        {/* El overlay, el botón espejo, la flecha y la caja flotando libres por encima de la oscuridad */}
        {showPrivacy && (
          <>
            <div className="privacy-overlay"></div>
            
            {/* 🌟 BOTÓN ESPEJO: Se dibuja por encima del overlay para mantener su brillo intacto */}
            <div className="mirror-info-zone">
              <button 
                type="button" 
                className="info-icon-btn active"
                onClick={() => setShowPrivacy(false)} /* Si lo pulsan estando abierto, se cierra */
                title="Cerrar aviso de privacidad"
              >
                <img src="/img/info-icon.svg" alt="Info Icon" className="info-svg-icon" />
              </button>
            </div>
            
            {/* La flecha libre en la raíz */}
            <img src="/img/arrow-icon.svg" alt="Indicador" className="privacy-drawn-arrow" />

            {/* La caja de privacidad perfecta */}
            <div className="tooltip-privacy-box">
              
              {/* ❌ Aspas de cierre */}
              <button 
                type="button" 
                className="tooltip-privacy-close" 
                onClick={() => setShowPrivacy(false)}
                title="Cerrar aviso"
              >
                &times;
              </button>
              
              <h4 className="tooltip-privacy-title">AVISO DE PRIVACIDAD</h4>
              <p className="tooltip-privacy-text">
                Este formulario no almacena sesiones ni credenciales universitarias de forma automática. Únicamente se registrarán los datos introducidos explícitamente en los campos obligatorios para la gestión del parte.
              </p>
            </div>
          </>
        )}

        {/* Bloque contenedor que responde dinámicamente al Modo Inspector */}
        <div 
          className="incidencias-wrapper inspector-fade"
          style={{
            opacity: hideForm ? 0 : 1,
            pointerEvents: hideForm ? 'none' : 'auto'
          }}
        >
          
          {/* BARRA DE ESTADO EXTERNA */}
          <div className="incidencias-status-bar">
            
            {/* Contenedor Flex de Utilidades (Izquierda) */}
            <div className="status-bar-utilities">
              
              {/* Botón Info + Ventana flotante */}
              <div className="incidencias-info-zone" style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  className={`info-icon-btn ${showPrivacy ? 'active' : ''}`}
                  onClick={() => setShowPrivacy(!showPrivacy)}
                  title="Haz clic para ver el aviso de privacidad"
                >
                  <img src="/img/info-icon.svg" alt="Info Icon" className="info-svg-icon" />
                </button>
              </div>

              {/* Botón de Reset del Formulario */}
              <button 
                type="button" 
                className="reset-icon-btn"
                onClick={handleReset}
                title="Limpiar todo el formulario"
              >
                <img src="/img/reset-icon.svg" alt="Reset Icon" className="reset-svg-icon" />
              </button>

              {/* Botón del ojo tachado fijo para ocultar el formulario */}
              <button 
                type="button" 
                className="reset-icon-btn"
                onClick={() => setHideForm(true)}
                title="Ocultar interfaz para ver la foto de fondo"
              >
                <img src="/img/eye-off-icon.svg" alt="Ocultar interfaz" className="reset-svg-icon" />
              </button>
            </div>

            {/* Sello del sistema (Derecha) */}
            <div className="incidencias-timestamp">
              {sysTime || 'CONECTANDO...'}
            </div>
          </div>

          <div className="incidencias-card">
            
            {/* Barra superior de la tarjeta al estilo consola */}
            <div className="incidencias-top-controls">
              
              {/* Izquierda: Dots terminal */}
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>

              {/* Derecha: Bloque de marca EPS */}
              <div className="incidencias-card-branding">
                <a href="https://eps.us.es/" target="_blank" rel="noopener noreferrer" className="branding-link" title="Ir a la web de la Escuela Politécnica Superior">
                  <img src="/img/eps-isotipo-color.svg" alt="EPS Logo" className="incidencias-card-logo eps-logo-dim" />
                </a>
              </div>

            </div>

            {/* Título elevado y centrado nativo */}
            <h2 className="terminal-title-center">INCIDENCIAS AULAS CATEPS</h2>
            
            {/* Línea divisoria */}
            <hr className="incidencias-divider" />

            {/* Subtítulo de la automatización */}
            <p className="subtitle">Apertura automatizada de incidencias en las aulas del CATEPS.</p>

            <form onSubmit={handleSubmit} noValidate className="incidencias-form">
              
              <div className="form-group">
                <label>1. Nombre completo del profesor o profesora{fluorAsterisk}</label>
                <input type="text" name="nombreProfesor" value={formData.nombreProfesor} onChange={handleChange} placeholder="Introduzca su nombre completo, por favor..." />
                {errors.nombreProfesor && <span className="incidencias-error-msg">Por favor, rellena este campo obligatorio.</span>}
              </div>

              <div className="form-group">
                <label>2. Seleccione el tipo de incidencia{fluorAsterisk}</label>
                <select name="tipoIncidencia" value={formData.tipoIncidencia} onChange={handleChange}>
                  <option value="" disabled>Seleccione una opción...</option>
                  <option value="Audiovisual">Audiovisual</option>
                  <option value="Equipos informáticos">Equipos informáticos</option>
                  <option value="Instalaciones y redes">Instalaciones y redes</option>
                  <option value="Otras">Otras</option>
                </select>
                {errors.tipoIncidencia && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

              <div className="form-group">
                <label>3. Aula{fluorAsterisk}</label>
                <select name="aula" value={formData.aula} onChange={handleChange}>
                  <option value="" disabled>Seleccione el aula afectada...</option>
                  <option value="L1-A-ESC">L1-A-ESC</option>
                  <option value="L1-D-ATC">L1-D-ATC</option>
                  <option value="L2-D-ATC">L2-D-ATC</option>
                  <option value="L1-D-IQ">L1-D-IQ</option>
                  <option value="L1-D-IEL">L1-D-IEL</option>
                  <option value="L1-D-MMC">L1-D-MMC</option>
                  <option value="L2-D-QA">L2-D-QA</option>
                  <option value="DS5.4">DS5.4</option>
                  <option value="Otras">Otras</option>
                </select>
                {errors.aula && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

              <div className="form-group">
                <label>4. Escriba una breve descripción de la incidencia{fluorAsterisk}</label>
                <textarea name="descripcion" rows="4" value={formData.descripcion} onChange={handleChange} placeholder="Escriba su respuesta describiendo el problema..." />
                {errors.descripcion && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
              </div>

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

              {formData.notificarEstado === 'Sí' && (
                <div className="form-group field-animate-fade">
                  <label>6. Correo electrónico{fluorAsterisk}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Inserte su correo electrónico..." />
                  {errors.email && <span className="incidencias-error-msg">Por favor, rellene este campo obligatorio.</span>}
                </div>
              )}

              {state.success && (
                <div className="alert alert-success">
                  <strong>[OK]</strong> Incidencia registrada con éxito. La incidencia ha sido enviada al Centro de Cálculo.
                </div>
              )}

              {state.error && (
                <div className="alert alert-danger">
                  <strong>[ERROR]</strong> No se pudo procesar el envío de la incidencia. Compruebe la red del aula.
                </div>
              )}

              <button type="submit" disabled={state.loading} className="btn-submit">
                {state.loading ? 'ENVIANDO...' : 'ENVIAR INCIDENCIA'}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}