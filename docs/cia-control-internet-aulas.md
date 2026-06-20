---
id: cia-control-internet-aulas
title: Control Internet Aulas (CIA)
tags:
  - Automatización
  - Modo Examen
  - PowerShell 7
  - Seguridad
sidebar_position: 1
---

<span className="theme-doc-version-badge badge badge--secondary" style={{ verticalAlign: 'middle', marginBottom: '0.5rem', display: 'inline-block' }}>Versión: 1.1.2</span>

# Control Internet Aulas

**CIA** (Control Internet Aulas) es la herramienta que permite al docente **restringir el acceso a Internet** en los equipos de un aula durante prácticas y exámenes, pudiendo **restaurarlo** al terminar, todo desde su propio puesto y en cuestión de segundos.

:::info[¿Por qué existe esta herramienta?]
Cada vez es más frecuente que, durante exámenes o prácticas, algún alumno intente recurrir a páginas externas (asistentes de IA como ChatGPT o cualquier otro, así como foros, buscadores, etc.) para resolver las pruebas. Es una forma de plagio difícil de vigilar a simple vista. CIA cierra esa puerta: deja operativo únicamente lo necesario para el examen y bloquea el resto de Internet de forma simultánea en todos los puestos.
:::

{/* NUEVO: Infografía de arquitectura como pieza visual de cabecera */}
<figure style={{ margin: '2.5rem auto', textAlign: 'center' }}>
  <img
    src="/img/cia-infografia.svg"
    alt="Arquitectura del sistema CIA: el script en PowerShell 7 coordina el bloqueo de Internet en los puestos del aula mediante WinRM, con el modo examen, la seguridad por proxy y el control desde el equipo del profesor."
    style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
  />
</figure>

------------------------------------------------------------------------

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImageGallery from '@site/src/components/ImageGallery';
import { FaqAccordion, FaqItem } from '@site/src/components/FaqAccordion';

## ℹ️ En qué consiste

CIA es un script que se ejecuta **exclusivamente en el equipo del profesor**. Desde ahí envía las órdenes de bloqueo y desbloqueo al resto de puestos del aula a través de la red, sin necesidad de tocar físicamente ningún ordenador del alumnado.

- **No requiere instalación en los equipos de los alumnos.** Estos solo reciben las órdenes; no contienen ningún archivo del sistema.
- **Es independiente por aula.** Existe una versión del script para cada aula de informática. Cada una conoce únicamente sus propios puestos, de modo que un bloqueo **jamás afecta a otra aula**.
- **Actúa a demanda.** El docente decide cuándo activar el modo examen y cuándo retirarlo.

:::note[Lo que el alumno experimenta]
Cuando el modo examen está activo, el navegador del alumno deja de cargar páginas externas, pero **sigue teniendo acceso a Enseñanza Virtual y a los servicios de la Universidad**. Para el alumno es transparente: simplemente no puede salir a Internet abierto. Esto también afecta, por ejemplo, a asistentes de IA instalados localmente.
:::

------------------------------------------------------------------------

## 🚀 Cómo se usa

<Tabs>
  <TabItem value="inicio" label="Método 1: Script PowerShell 7 (local)" default>

  El script se encuentra ya preparado en el equipo del profesor de cada aula. Encontrará su **acceso directo en el escritorio**, identificado con el icono de la herramienta.

  {/* NUEVO: Layout - imagen del acceso directo a la izquierda, pasos a la derecha */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', margin: '1.75rem 0' }}>

    <figure style={{ flex: '0 0 320px', maxWidth: '320px', margin: 0, textAlign: 'center' }}>
      <div style={{ borderRadius: '12px', padding: '0.5rem' }}>
        <img
          src="/img/Control-Internet-Aulas-acceso-directo.png"
          alt="Acceso directo de Control Internet Aulas en el escritorio del equipo del profesor."
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '10px' }}
        />
      </div>
    </figure>

    <div style={{ flex: '1 1 300px' }}>
      <ol style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
        <li style={{ marginBottom: '1rem' }}>Localice el acceso directo <strong>Control Internet Aulas</strong> en el escritorio.</li>
        <li style={{ marginBottom: '1rem' }}>Haga <strong>doble clic</strong> sobre él.</li>
        <li>Se abrirá una ventana de consola con el <strong>menú principal</strong> de CIA, listo para usar.</li>
      </ol>
      <p style={{ marginTop: '1.25rem', marginBottom: 0, fontSize: '1.05rem', lineHeight: '1.8' }}>
        A partir de ahí, todo se maneja <strong>escribiendo el número</strong> de la opción deseada y pulsando <strong>Enter</strong>.
      </p>
    </div>
  </div>
  
  Las opciones del menú son:

  | Opción | Acción | Para qué sirve |
  |:------:|:-------|:---------------|
  | **0** | Ayuda (documentación online) | Abre esta misma documentación en el navegador |
  | **1** | Bloquear Internet (modo examen) | Activa el bloqueo en todos los puestos encendidos |
  | **2** | Revertir bloqueo | Restaura el acceso normal a Internet |
  | **3** | Ver estado actual de los equipos | Muestra qué puestos están bloqueados, libres o apagados |
  | **4** | Listado de puestos | Lista los equipos del aula |
  | **5** | Salir | Cierra la herramienta |

  :::tip
  El menú permanece siempre abierto: tras cada acción, basta con pulsar **Enter** para volver a él. Puede consultar el estado tantas veces como necesite sin cerrar el programa.
  :::
  
  </TabItem>
  <TabItem value="menu" label="Método 2: Gestión Centralizada (NuGet Repo)">

  Actualmente en pruebas 🧐.

  </TabItem>
</Tabs>

------------------------------------------------------------------------

## 📝 Flujo de trabajo

El uso habitual durante una prueba sigue tres pasos muy sencillos:

1. **Antes de empezar** — Con todos los equipos encendidos (no es necesario que la sesión de Windows 11 esté iniciada), seleccione la **Opción 1 (Bloquear Internet)**. La herramienta detectará automáticamente los puestos activos y aplicará el bloqueo.
2. **Durante la prueba** — Use la **Opción 3 (Ver estado)** de vez en cuando para confirmar que todos los puestos siguen en estado 🔒 **BLOQUEADO**.
3. **Al terminar** — Seleccione la **Opción 2 (Revertir bloqueo)** para devolver el aula a la normalidad de cara a la siguiente clase.

:::warning[Bloquee con los equipos ya encendidos]
El bloqueo se aplica únicamente a los puestos que estén **encendidos con Windows cargado** en el momento de pulsar la Opción 1. Si un alumno llega tarde y enciende su equipo después, ese puesto arrancará con Internet libre. No es un problema: basta con **volver a pulsar la Opción 1** y la herramienta detectará el equipo nuevo y lo bloqueará sin alterar a los que ya lo estaban.
:::

------------------------------------------------------------------------

## 🚦 Interpretar el estado del aula

La **Opción 3 (Ver estado)** muestra una tabla con todos los puestos del aula y su situación en tiempo real. Cada equipo puede aparecer en uno de estos tres estados:

| Estado | Significado |
|:-------|:------------|
| 🔓 **LIBRE** | El equipo está encendido y tiene acceso normal a Internet |
| 🔒 **BLOQUEADO** | El equipo está encendido y en modo examen (Internet restringido) |
| ❌ **OFFLINE** | El equipo está apagado o sin conexión de red |

:::info[Un equipo encendido aparece como OFFLINE]
Lo más habitual es que se acabe de arrancar y aún esté obteniendo dirección de red. Espere unos instantes (puede demorarse hasta 60 segundos aproximadamente) y vuelva a consultar la Opción 3. Si pasados varios minutos sigue apareciendo como OFFLINE de forma persistente, puede tratarse de una incidencia real de red: en ese caso, abra un parte de incidencia.
:::

------------------------------------------------------------------------

## 📸 Capturas de CIA

<ImageGallery images={[
  { src: '/img/CIA-script-menu.png', title: 'Menú principal de CIA' },
  { src: '/img/CIA-script-listado-puestos.png', title: 'Listado de puestos de un aula' },
  { src: '/img/CIA-script-bloqueo.png', title: 'Bloqueo de Internet vía WinRM' },
  { src: '/img/CIA-script-desbloqueo.png', title: 'Equipos desbloqueados' },
  { src: '/img/CIA-script-escaneando.png', title: 'Escaneando el aula por consola' },
  { src: '/img/CIA-script-estado-aula.png', title: 'Estado de un aula' }
]} />

------------------------------------------------------------------------

## 🔐 Seguridad y modo examen

Cuando se activa el bloqueo, CIA aplica dos capas de protección complementarias para que la restricción sea **robusta durante el tiempo que dura la prueba**:

- **Redirección del tráfico.** El equipo deja de poder salir a Internet abierto. Solo se mantiene operativa una **lista blanca** de servicios imprescindibles para el examen (véase más abajo).
- **Bloqueo de herramientas de configuración.** Se restringe el acceso a las utilidades del sistema que un alumno podría usar para intentar revertir la restricción (editor del registro, administrador de tareas, configuración de red, etc.). Durante el examen, esas herramientas quedan deshabilitadas.

### ✅ Lista blanca (whitelist)

Aunque el resto de Internet quede bloqueado, el alumno conserva el acceso a los recursos necesarios para realizar la prueba:

| Categoría | Acceso permitido |
|:----------|:-----------------|
| **Plataformas docentes** | Enseñanza Virtual (Blackboard) y portales de la US |
| **Identidad y acceso** | Inicio de sesión institucional (SSO) de la Universidad |
| **Autenticación** | Servicios técnicos necesarios para el login institucional |
| **Red local** | Recursos compartidos del propio laboratorio |

:::danger[El bloqueo NO persiste tras reiniciar]
Por diseño, **si un equipo se reinicia o el alumno cierra y reabre la sesión, el bloqueo desaparece** en ese puesto. Es una medida de seguridad consensuada entre el profesorado y el Centro de Cálculo: evita que un aula quede inutilizable para el siguiente turno si se olvida desbloquear.

La consecuencia es clara: **debe supervisar el aula durante el examen** y consultar periódicamente la **Opción 3 (Ver estado)** para confirmar que ningún puesto ha vuelto al estado 🔓 LIBRE por un reinicio o cierre de sesión.
:::

------------------------------------------------------------------------

## 🛠️ Situaciones frecuentes

<FaqAccordion>

<FaqItem question="Necesito desbloquear un solo puesto sin afectar al resto de la clase">

No hace falta levantar el bloqueo general. Pida al alumno que **cierre la sesión o reinicie el equipo**: al volver a iniciar sesión, ese puesto recuperará automáticamente el acceso normal, sin alterar el bloqueo de los demás compañeros.

</FaqItem>

<FaqItem question="He cerrado el script sin querer durante el examen">

No afecta a la seguridad del aula. Una vez enviada la orden de bloqueo, esta reside en los puestos de los alumnos. El script solo es necesario para **enviar** la orden inicial y para **revertirla** al final. Vuelva a abrirlo cuando quiera para seguir consultando el estado o para desbloquear al terminar.

</FaqItem>

<FaqItem question="El número de puesto físico no coincide con el de la consola">

Puede ocurrir de forma excepcional si el Centro de Cálculo ha sustituido un equipo averiado, por poner un ejemplo. Deje que la clase continúe con normalidad y avise al personal técnico del CATEPS indicando el número de puesto afectado para actualizar el mapa de equipos.

</FaqItem>

<FaqItem question="¿Funciona con cualquier navegador?">

Sí. La restricción se aplica a nivel del sistema operativo, por lo que afecta por igual a Edge, Chrome, Firefox, Brave, Opera y cualquier aplicación que use la configuración de red estándar de Windows.

</FaqItem>

</FaqAccordion>

<div style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>
  <a href="/docs/cia-faq" aria-label="Consultar todo el FAQ" className="eps-faq-btn">
    <span className="eps-faq-btn-label">Consultar todo el FAQ</span>
    <span className="eps-faq-btn-blob" />
  </a>
</div>

------------------------------------------------------------------------