---
title: PowerShell 7
sidebar_label: PowerShell 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <img src="/img/PowerShell.svg" alt="PowerShell" className="img-header-contacto" /> PowerShell 7

Automatización de procesos en la EPS.

## ⚙️ ¿Qué es PowerShell?

Es una solución multiplataforma desarrollada por Microsoft para la automatización de tareas. Un ecosistema compuesto por un shell de línea de comandos, un lenguaje de scripting y un robusto marco de administración. Este entorno se apoya en dos pilares clave: [PowerShell Gallery](./powershell-gallery.md), el repositorio centralizado para compartir y adquirir módulos de confianza, y [PowerShell Remoting](/gestion-aulas-cateps/powershell-7#powershell-remoting), la tecnología que permite la administración y ejecución de comandos en equipos remotos de forma segura y escalable.

Aunque Windows PowerShell viene preinstalado en todas las versiones modernas de Windows para automatizar tareas administrativas, en la [Escuela Politécnica Superior](https://eps.us.es/) estandarizamos el uso de PowerShell 7, aprovechando sus nuevas funcionalidades y mejoras en el rendimiento.

---

### 🏗️ Orquestación de Aulas EPS

<br />
<img 
  src="/img/diagrama-powershell-remoto.svg" 
  alt="Paradigma de Gestión" 
  style={{ width: '85%', display: 'block', margin: '0 auto' }} 
/>
<br />

## 🌐 PowerShell remoting

El corazón de nuestra gestión es **PowerShell Remoting (Comunicación remota de PowerShell)**. Basado en el protocolo **WinRM (Administración remota de Windows)**, nos permite ejecutar comandos de forma síncrona y asíncrona en los más de 300 puestos de la Escuela de forma centralizada.

<br />
<img 
  src="/img/escenario-powershell-remoto.svg" 
  alt="PowerShell remoto en acción" 
  style={{ width: '80%', display: 'block', margin: '0 auto' }} 
/><br /><br />

:::warning[Seguridad]

No abrimos la administración remota a toda la red. El tráfico WinRM está filtrado mediante reglas de acceso, aceptando únicamente peticiones provenientes de la IP certificada del equipo del profesor o del Centro de Cálculo.

:::

### 🛠️ Estandarización

- **Ejecución en Paralelo:** Mediante `Invoke-Command`, podemos lanzar un script de actualización en 30 equipos simultáneamente, reduciendo tiempos de mantenimiento de horas a segundos.
- **Sesiones Persistentes:** Capacidad de abrir sesiones interactivas (`Enter-PSSession`) para resolución de problemas puntuales en cualquier puesto del CATEPS o Los Remedios.
- **Gestión de Configuración:** Aseguramos que el software instalado, las variables de entorno y las políticas de seguridad sean idénticas en todo el aula.

<div style={{ textAlign: 'center', margin: '2rem 0' }}>
  <div style={{
    position: 'relative',
    paddingBottom: '56.25%', 
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
    borderRadius: '12px',
    border: '2px solid #F9B905',
    boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
    backgroundColor: '#000'
  }}>
    <iframe
      src="https://www.youtube.com/embed/qvJRaYlxI1w"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
  <div style={{ 
    marginTop: '15px', 
    fontSize: '0.9em', 
    color: 'var(--ifm-color-emphasis-600)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }}>
    PowerShell Remoting y administración de sistemas.
  </div>
</div>

---

## 🤝 Sinergia con OpenGnsys

El paradigma de gestión en la EPS se basa en un modelo híbrido que combina la potencia de la clonación con la flexibilidad del scripting dinámico.

<Tabs>
<TabItem value="opengnsys" label="1. Capa de Imagen (OpenGnsys)" default>

OpenGnsys se encarga del despliegue masivo de la imagen del sistema operativo. Proporciona un estado **inalterable** y limpio en cada arranque mediante Multicast u otros protocolos, asegurando que el hardware esté listo y el SO base sea idéntico.

</TabItem>
<TabItem value="psremoting" label="2. Capa de Control (PS Remoting)">

Una vez el equipo está encendido, PowerShell 7 toma el control. Permite realizar cambios "Just-in-Time" sin necesidad de volver a clonar: actualizar una extensión de VS Code, cambiar una clave de registro o desplegar un script para una práctica específica.

</TabItem>
<TabItem value="automation" label="3. Automatización (Tareas)">

Mediante tareas programadas vinculadas a eventos de sistema, el equipo implementa un mecanismo de autocuración. Por ejemplo, si el script CIA sigue ejecutado en los equipos, una tarea restablece automáticamente el puesto al estado deseado definido por el Centro de Cálculo.

</TabItem>
</Tabs>

---

## 📈 Escalabilidad y Futuro

Nuestra infraestructura de scripts está diseñada para crecer. No buscamos solo "ejecutar comandos", sino implementar un modelo de **Infraestructura como Código (IaC)** en las aulas.

### 🚀 Posibles Mejoras en el Ecosistema

1. **Módulos Propios:** Centralización de funciones comunes en un módulo interno de la EPS alojado en nuestro repo local.
2. **Auditoría Automatizada:** Scripts que reportan el estado de salud del hardware y software de cada aula a una base de datos central en tiempo real.
3. **Manejo de Errores Avanzado:** Logging remoto en un servidor de eventos dedicado. Centralizar la Información y enviar reportes para analizarlos.
<br />
:::info[Nota de Compatibilidad]

Windows 11 solo se distribuye como sistema operativo de 64 bits. En nuestras sedes, aprovechamos la arquitectura x64 para ejecutar PowerShell 7 con el máximo rendimiento, manteniendo la compatibilidad con módulos de 32 bits solo cuando es estrictamente necesario para software educativo heredado.

:::