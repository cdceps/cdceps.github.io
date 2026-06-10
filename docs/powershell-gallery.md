---
title: PowerShell Gallery
tags:
  - Aulas
  - PowerShell 7
  - Gestión de Dependencias
  - Repositorio de Paquetes
sidebar_label: PowerShell Gallery
---

# <img src="/img/PowerShell.svg" alt="PowerShell" className="img-header-contacto" /> PowerShell Gallery

Repositorio central oficial de Microsoft.

<div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: '20px', 
  padding: '20px', 
  borderRadius: '8px',
  marginBottom: '20px'
}}>
  <img 
    src="/img/powershell-hero.svg" 
    alt="PowerShell Logo" 
    style={{ width: '160px', height: 'auto' }} 
  />
  <div style={{ fontSize: '17px', lineHeight: '1.6' }}>
    <div style={{ marginBottom: '15px' }}>
      La [Galería de PowerShell](https://www.powershellgallery.com/) es el repositorio central para el contenido de PowerShell. En él encontramos scripts, módulos que contienen cmdlets de PowerShell y recursos de Desired State Configuration (DSC).
    </div>
    <div>
      En la gestión de nuestras aulas, integramos módulos de administración y automatización de tareas, asegurándonos de que el entorno de escritorio sea consistente en todos los puestos. Esto permite que herramientas críticas y dependencias de sistema se mantengan actualizadas mediante paquetes verificados por la comunidad y Microsoft.
    </div>
  </div>
</div>

---

## 🏗️ Implementación en la EPS

La gestión de más de 300 puestos de trabajo entre los edificios que conforman la EPS requiere una consistencia absoluta. No instalamos software manualmente; desplegamos y orquestamos de forma centralizada.

### ⚡ Uso de PowerShell Gallery

* **Verificación de Identidad:** Si necesitamos utilizar módulos para nuestros scripts, nos aseguramos previamente de que están firmados digitalmente y publicados por fuentes confiables (Microsoft o comunidades verificadas).
* **Gestión de Dependencias:** El sistema resuelve automáticamente qué librerías necesita un script antes de ejecutarse, evitando errores de "archivo no encontrado".
* **Inmutabilidad:** Aseguramos que la versión del módulo instalada en un aula del CATEPS sea exactamente la misma que la de un aula de la sede de Los Remedios.

---

### 📈 Esquema de Distribución

{/* ![Diagrama de Orquestación](/img/diagrama-powershell-gallery.svg) */}
<br />
<img 
  src="/img/diagrama-powershell-gallery.svg" 
  alt="Paradigma de Gestión" 
  style={{ width: '95%', display: 'block', margin: '0 auto' }} 
/>