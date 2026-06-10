import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // Función que busca y elimina los "title" nativos
  const cleanNativeTooltips = (): void => {
    // Apuntamos solo a la sidebar, al botón de colapsar y al BackToTop
    const selectors: string[] = [
      '.theme-doc-sidebar-container [title]',
      '.theme-doc-sidebar-container button',
      '.cateps-btn-flotante',
      '.cateps-btn-flotante [title]'
    ];

    const elements = document.querySelectorAll<HTMLElement>(selectors.join(','));
    
    elements.forEach((el: HTMLElement) => {
      const titleText = el.getAttribute('title');
      if (titleText) {
        // Guardamos el texto en un atributo "data-techname" por si lo queremos utilizar en el CSS
        el.setAttribute('data-techname', titleText);
        // Eliminamos el tooltip nativo del navegador relacionado con el Title
        el.removeAttribute('title'); 
      }
    });
  };

  // Se ejecuta al cargar la página
  window.addEventListener('DOMContentLoaded', cleanNativeTooltips);
  
  // Se ejecuta cada vez que el usuario cambia de documento (rutas internas de React)
  window.addEventListener('popstate', () => {
    setTimeout(cleanNativeTooltips, 100);
  });
  
  // Observador en tiempo real por si el menú se expande/colapsa dinámicamente
  const observer = new MutationObserver(() => {
    cleanNativeTooltips();
  });

  window.addEventListener('load', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}