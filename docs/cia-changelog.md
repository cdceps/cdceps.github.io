---
title: Historial de Cambios
sidebar_label: Changelog
tags:
  - Actualizaciones
  - Changelog
  - Mantenimiento
  - Scripts
sidebar_position: 2
---

# CIA Changelog

## 1.1.2 (08-06-2026)
---

<strong className="texto-verde">Refactorización y optimización del código</strong>

#### Seguridad (ACLs)
- **Optimización del módulo de restricciones:** Refactorización de la lógica de asignación de permisos administrativos. Se ha simplificado el código de bloqueo: ahora las restricciones se aplican a la vez con un bucle sobre una lista, reduciendo el volumen de código y facilitando la escalabilidad.

#### Actualización
- Actualización a [PowerShell 7.6.2](https://github.com/PowerShell/PowerShell/blob/master/CHANGELOG/7.6.md#762) en todos los puestos de `L1-D-ATC`, `L2-D-ATC` y `L1-A-ESC`.

#### Compatibilidad de sistemas
Se ha verificado la correcta aplicación de las directivas de seguridad en **Windows 11 25H2**.

| Sistema Operativo | Versión | Build | Arquitectura | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Windows 11** | 25H2 | 26200.x | x64 / ARM64 | ✅ Total|


## 1.1.1
---

<strong className="texto-verde">Mantenimiento y optimización de entorno</strong>

#### Modo examen
- El script muestra un mensaje en pantalla más descriptivo al activar o desactivar el **modo examen**.

#### Leyenda
- La opción 3 muestra, debajo de la tabla, una breve descripción de los tres estados posibles.

#### Actualización y mejoras
- Actualización a [PowerShell 7.6.1](https://github.com/PowerShell/PowerShell/blob/master/CHANGELOG/7.6.md#761) en la totalidad de los puestos de los laboratorios.
- Optimización del rendimiento global del script.
- Corrección y pulido de cadenas de texto en los menús interactivos.

## 1.1.0
---

<strong className="texto-verde">Soporte y Experiencia de Usuario</strong>

#### Ayuda e Integración
- Implementación de la función `Abrir-Ayuda`. Ahora el script redirige directamente a la documentación online de CIA.
- Añadida una animación de carga mediante caracteres ASCII para mejorar el feedback visual durante el acceso a red.

#### UI (Interfaz de usuario)
- Integración de códigos de escape ANSI para el renombrado dinámico de la pestaña de la terminal (`Control Internet Aulas`).

:::tip[Uso]
La documentación online (Opción 0) se abre en el navegador predeterminado del sistema, permitiendo al profesor consultar dudas sin cerrar la consola.
:::

## 1.0.0
---

<strong className="texto-verde">Primera versión en Producción</strong>

#### Funcionalidades del sistema
- **Finalización del módulo de gestión de puestos:** Se ha estabilizado la lógica de control para los equipos de las aulas, permitiendo el despliegue de la herramienta en los tres laboratorios del centro.
- **Optimización de tiempos de respuesta:** Ajuste de los tiempos de espera (*timeouts*) para garantizar la estabilidad en entornos de red con alta latencia.

#### Seguridad
- Implementación del "Bloqueo Total Administrativo": se añaden a la lista de restricciones `taskschd.msc`, `netplwiz.exe` y `secpol.msc`.
- Refactorización de la lógica de permisos: el script ahora comprueba si la ruta existe antes de intentar aplicar la ACL.

#### Compatibilidad de sistemas
Para garantizar un despliegue fiable en todos los laboratorios del centro, se ha verificado la robustez del script y la correcta aplicación de las directivas de seguridad en los siguientes entornos:

| Sistema Operativo | Versión | Build | Arquitectura | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Windows 11** | 24H2 | 26100.x | x64 / ARM64 | ✅ Total|
| **Windows 11** | 23H2 | 22631.x | x64 | ✅ Total|
| **Windows 11** | 22H2 | 22621.x | x64 | ✅ Total|
| **Windows 11** | 21H2 | 22000.x | x64 | ✅ Total|
| **Windows 10** | 22H2 | 19045.x | x86 / x64 | ✅ Total|

:::info[Nota Técnica]
La versión 22H2 de Windows 10 es la última versión oficial lanzada por Microsoft antes de centrar el soporte exclusivamente en actualizaciones de seguridad y mantenimiento. El script CIA aprovecha la madurez de esta build para garantizar una estabilidad del 100% en equipos de laboratorio más antiguos.
:::

## 0.9.0
---

<strong className="texto-verde">Monitorización avanzada</strong>

#### Ver-Estado
- Mejora visual de la tabla comparativa. Ahora incluye colores diferenciados para:
    - <span style={{color: 'red'}}>🔒 BLOQUEADO</span> (Proxy activo, navegación bloqueada)
    - <span style={{color: 'green'}}>🔓 LIBRE</span> (Navegación permitida)
    - <span style={{color: 'grey'}}>❌ OFFLINE</span> (Equipo apagado/sin red)
- Implementación del orden automático de puestos independientemente del orden de respuesta de los Jobs.

## 0.8.0
---

<strong className="texto-verde">Mejora del entorno visual y soporte ANSI</strong>

#### Interfaz de usuario y usabilidad (UI/UX)
- Incorporación del logo principal en ASCII con degradados magenta.
- Creación del menú enmarcado con caracteres especiales de caja (`╔═╗`).
- Implementación de la función `Esperar-Enter` para pausar el flujo del script tras cada acción y evitar la pérdida de información en pantalla.

:::info[Diseño]
Se han estandarizado los colores de la consola siguiendo la paleta corporativa de la EPS: Cyan para IPs, Amarillo para advertencias y Verde para procesos finalizados.
:::

## 0.7.0
---

<strong className="texto-verde">Refactorización de Red</strong>

#### Conectividad
- Mejora en la fiabilidad de `Invoke-Command`. Se ha añadido el parámetro `-Authentication Basic` para asegurar la compatibilidad con las directivas de seguridad de los equipos del aula.
- Migración de las IPs estáticas a un formato de diccionario (Hashtable) para facilitar futuras ampliaciones del aula.

#### Seguridad
- Inclusión de `lusrmgr.msc` en la lista de bloqueos para evitar la creación de usuarios locales "puente".

## 0.6.0
---

<strong className="texto-verde">Ampliación de restricciones de sistema</strong>

#### Seguridad (ACLs)
- El modo examen ahora también restringe el acceso a la consola de servicios (`services.msc`) y al Administrador de Dispositivos (`devmgmt.msc`).
- Bloqueo preventivo de la Microsoft Management Console (`mmc.exe`) para evitar la carga de complementos administrativos externos.

## 0.5.0
---

<strong className="texto-verde">Optimización de escaneo y UI</strong>

#### Funcionalidades del sistema
- Implementación de **PowerShell Jobs** en la función `Escanear-Equipos`. Ahora el script comprueba todos los puestos del aula en paralelo en lugar de uno a uno.
- Añadida barra de progreso (`Write-Progress`) para visualizar el estado del escaneo en tiempo real.

:::info[Rendimiento]
El tiempo de carga del menú inicial se ha reducido de ~20 segundos a menos de 3 segundos gracias al procesamiento asíncrono.
:::

#### UI (Interfaz de usuario)
- Inclusión de cabecera gráfica ASCII con las siglas "CATEPS" en el menú principal.
- Implementación de la función `Esperar-Enter`, que integra el control de interrupciones mediante `TreatControlCAsInput` para blindar la sesión y evitar cierres involuntarios del script durante procesos críticos.

## 0.4.0
---

<strong className="texto-verde">Fortalecimiento del Modo Examen</strong>

#### Seguridad (ACLs)
- Añadido bloqueo de herramientas administrativas avanzadas: `msconfig.exe`, `services.msc`, `compmgmt.msc` y `gpedit.msc`.
- Restricción de `reg.exe` para evitar cambios en el registro mediante línea de comandos.

#### Red
- Refinado el `ProxyOverride` para permitir excepciones críticas de la Universidad (`*.us.es`, `*.blackboard.com`) incluso durante el bloqueo.

## 0.3.0
---

<strong className="texto-verde">Gestión remota y Credenciales</strong>

#### Conectividad
- Implementación de `Invoke-Command` con autenticación **Basic** para la ejecución de comandos en bloque sobre el aula.
- Centralización de credenciales mediante el objeto `PSCredential`.

#### Funcionalidades del sistema
- Creación de la función `Ver-Estado`. Ahora es posible obtener una tabla comparativa en tiempo real de qué equipos están 🔒 BLOQUEADOS o 🔓 LIBRES.

## 0.2.0
---

<strong className="texto-verde">Control de persistencia</strong>

#### Funcionalidades del sistema
- Primera implementación del bloqueo por Proxy (`127.0.0.1:8080`).
- Añadida la restricción de permisos (ACL) sobre `regedit.exe` y `taskmgr.exe` para evitar que se pueda revertir el proxy manualmente.

#### UI (Interfaz de usuario)
- Añadidos códigos de escape ANSI para colores en la terminal (Verde para éxitos, Rojo para errores).

## 0.1.0
---

<strong className="texto-verde">Prueba de concepto</strong>

#### Funcionalidades del sistema
- Definición del diccionario de puestos y mapeo de IPs de los laboratorios `L1-D-ATC`, `L2-D-ATC` y `L1-A-ESC`.
- Funciones básicas de `Bloquear-Internet` y `Revertir-Bloqueo` mediante manipulación directa de la clave de registro `Internet Settings`.