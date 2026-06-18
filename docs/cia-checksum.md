---
title: Verificación de Integridad
sidebar_label: Checksum
tags:
  - Aulas
  - PowerShell 7
  - Seguridad
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### 🛡️ Verificación de Integridad

Con el fin de asegurar la trazabilidad y la integridad de la herramienta, proporcionamos la firma digital para verificar que el código fuente coincide exactamente con el distribuido por el Centro de Cálculo:

---

### 🔑 Hashes de los scripts (SHA-256)

A continuación, se facilitan las firmas de comprobación oficiales de los scripts de producción en los laboratorios.

<details>
  <summary>📦 Haga clic aquí para ver los *hashes* oficiales de las aulas</summary>
  <div style={{ marginTop: '15px' }}>

<Tabs>
  <TabItem value="l1d" label="Aula L1-D-ATC" default>
    <div className="launcher-command">
      **Script:** `CIA-L1-D-ATC.ps1`
      ```powershell title="Checksum SHA-256"
      F6EF3EA93F910D1EECFA13E0B2F3659B72E3BE786D5AFC3E0DF905E904FA4D20
      ```
	   {/*
		PS C:\Windows\System32> Get-FileHash -Path "C:\ProgramData\CATEPS\CIA-L1-D-ATC.ps1" -Algorithm SHA256 | Format-List Path, Hash
		Path : C:\ProgramData\CATEPS\CIA-L1-D-ATC.ps1
		Hash : F6EF3EA93F910D1EECFA13E0B2F3659B72E3BE786D5AFC3E0DF905E904FA4D20
	   */}
    </div>
  </TabItem>
  
  <TabItem value="l2d" label="Aula L2-D-ATC">
    <div className="launcher-command">
      **Script:** `CIA-L2-D-ATC.ps1`
      ```powershell title="Checksum SHA-256"
      65B0BFB94F88648DC6BBE9A5C20D94B97A024A480245509C487A1EB977696797
      ```
	   {/*
		PS C:\Windows\System32> Get-FileHash -Path "C:\ProgramData\CATEPS\CIA-L2-D-ATC.ps1" -Algorithm SHA256 | Format-List Path, Hash
		Path : C:\ProgramData\CATEPS\CIA-L2-D-ATC.ps1
		Hash : 65B0BFB94F88648DC6BBE9A5C20D94B97A024A480245509C487A1EB977696797
	   */}
    </div>
  </TabItem>

  <TabItem value="l1a" label="Aula L1-A-ESC">
    <div className="launcher-command">
      **Script:** `CIA-L1-A-ESC.ps1`
      ```powershell title="Checksum SHA-256"
      57A618946B2857B7B3698972687CF18C2BE6157F97C104BF88B9AE60EFED4443
      ```
	   {/*
	    PS C:\Windows\System32> Get-FileHash -Path "C:\ProgramData\CATEPS\CIA-L1-A-ESC.ps1" -Algorithm SHA256 | Format-List Path, Hash
	    Path : C:\ProgramData\CATEPS\CIA-L1-A-ESC.ps1
		Hash : 57A618946B2857B7B3698972687CF18C2BE6157F97C104BF88B9AE60EFED4443 
	   */}
    </div>
  </TabItem>
</Tabs>

  </div>
</details>

### ✅ Utilidad del Checksum

El **checksum** es una suma de comprobación generada a partir de un origen de datos. Se utiliza principalmente para verificar la integridad de un archivo y asegurar que no haya sido alterado durante la transferencia, ya sea por errores técnicos o de forma maliciosa.

Si una sola línea de código, un carácter o un espacio en blanco del script `.ps1` es modificado por un tercero o se corrompe durante una transferencia de red, el Hash resultante cambiará por completo.

### Windows

Podemos introducir el comando `Get-FileHash` en PowerShell seguido de la ubicación del archivo. También podemos introducir el comando y luego arrastrar y soltar el archivo en la ventana de PowerShell.

Por defecto, PowerShell utiliza SHA-256 para producir la suma de comprobación, pero podemos utilizar otros como ```SHA-512``` o ```MD5```. Todos ellos producen un hash diferente, pero seguirá siendo único para ese archivo. Para utilizar una función diferente, añadimos el comando ```-Algorithm``` seguido del código correspondiente.

<div className="launcher-command">

  ```powershell title="PowerShell (ejemplo)"
  Get-FileHash C:\CATEPS\Scripts\script-de-prueba.ps1 -Algorithm SHA256
  ```
  </div>
  
---

## Verify Authenticity Of Files

You can use the [file hashing method](https://en.wikipedia.org/wiki/File_verification) to verify if a file is genuine. This can be done using tools like [7-Zip](https://7-zip.org/) (After installing 7-Zip, right-click on the ISO file and go to 7-Zip > CRC SHA > SHA-256).

---

:::info

Windows 11 solo se distribuye como sistema operativo de 64 bits. Sin embargo, incluye versiones de 32 bits de Windows PowerShell y Windows PowerShell ISE. En nuestra sede del CATEPS solo disponemos de equipos con Windows 11 en las aulas.

:::

