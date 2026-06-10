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

### Características

- You can use the to activate the [3-Year ESU](https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates) (Oct 2025 to Oct 2028).
- If you have any questions, please see the FAQ.


#### Commercial ESU Program (3 years) ❤️

- You can use the to activate the [3-Year ESU](https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates) (Oct 2025 to Oct 2028).
- If you have any questions, please see the FAQ.

#### Consumer ESU Program (1 Year)

- Microsoft is offering a free Consumer ESU Program (1 Year) for Windows 10 Home, Professional, Pro Education, and Workstation editions.
- To get this free ESU, you need to log in to your Microsoft account and [sync your PC settings](https://support.microsoft.com/windows/deebcba2-5bc0-4e63-279a-329926955708#id0ebd=windows_10).
- [More info](https://support.microsoft.com/en-us/windows/windows-10-consumer-extended-security-updates-esu-program-33e17de9-36b3-43bb-874d-6c53d2e4bf42).

---

## Windows 10 IoT Enterprise LTSC 2021

Microsoft releases Windows 10/11 in two servicing channels:

1.  **GAC (General Availability Channel):** (e.g., Home, Pro, Enterprise). This reached the end of support on [October 14th, 2025](https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro).
2.  **LTSC (Long-Term Servicing Channel):** (e.g., Enterprise LTSC, IoT Enterprise LTSC). Windows 10 Enterprise LTSC 2021 will reach the end of support on [Jan 12, 2027](https://learn.microsoft.com/en-us/lifecycle/products/windows-10-enterprise-ltsc-2021), while Windows 10 IoT Enterprise LTSC 2021 will reach the end of support on [Jan 13, 2032](https://learn.microsoft.com/en-us/lifecycle/products/windows-10-iot-enterprise-ltsc-2021).

The solution is simple: use the official Windows 10 IoT Enterprise LTSC 2021 edition to continue receiving updates until January 13, 2032.

#### Clean Install Windows 10 IoT Enterprise LTSC 2021

<details>
<summary>Click here for info</summary>

The IoT edition ISO is only available in English, but don't worry.

- Download the [Enterprise LTSC 2021] ISO in your desired language. The ISO file does not need to be the IoT version.
- Install Windows using this [clean installation guide](clean_install_windows).
- After installing Windows, change the edition by entering the IoT LTSC 2021 key `QPM6N-7J2WJ-P88HH-P3YRH-YY74H` on the activation page in Windows Settings.
- You also need to activate this edition. Follow the for activation.

</details>

#### Upgrade Windows 10 Home, Pro, etc., to Windows 10 IoT Enterprise LTSC 2021 (Keep Files & Apps)

<details>
<summary>Click here for info</summary>

The IoT edition ISO is only available in English, but don't worry.

- Download the Windows 10 Enterprise LTSC 2021 ISO from [here] in the **same Windows language and architecture**. The ISO file does not need to be the IoT version.  
  - To check the installed Windows architecture, open PowerShell and enter:  
`Get-WmiObject -Class Win32_OperatingSystem | Format-List OSArchitecture`  
    AMD64/x64 indicates 64-bit; x86 indicates 32-bit.  
  - To check the installed Windows language, open PowerShell as administrator and enter:  
`dism /english /online /get-intl | find /i "Default system UI language"`
- Right-click the downloaded ISO file and select **Open with** > **Windows Explorer**
- A new DVD drive will appear in Windows Explorer, which means the installation image has been mounted successfully.
- Now open Command Prompt as administrator and enter:  
  `reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v EditionID /d IoTEnterpriseS /f`
- Quickly open the newly mounted DVD drive, run `setup.exe`, and continue until you reach the final confirmation screen. (Do not delay at this step, or the option to keep files and apps may not appear.)
- Make sure it says "**Keep personal files and apps**" on the final screen. You can then continue the process and wait until it is finished.
- You also need to activate this edition. Follow the for activation.

:::note

These are generic keys intended for use during edition changes or when running `setup.exe`.

If you applied the registry command and ran the setup promptly, it shouldn’t ask you to enter a key. However, if a key is needed, use the keys below:

- `M7XTQ-FN8P6-TTKYV-9D4CC-J462D` – **Enterprise LTSC 2021 key**  
  Use this during setup when performing the upgrade. The IoT LTSC 2021 key will **not** work here.
  
- `QPM6N-7J2WJ-P88HH-P3YRH-YY74H` – **IoT Enterprise LTSC 2021 key**  
  After the upgrade is complete, use this key on the Windows activation page in Settings to change the edition to IoT Enterprise LTSC 2021.

:::

</details>

## Verify Authenticity Of Files

You can use the [file hashing method](https://en.wikipedia.org/wiki/File_verification) to verify if a file is genuine. This can be done using tools like [7-Zip](https://7-zip.org/) (After installing 7-Zip, right-click on the ISO file and go to 7-Zip > CRC SHA > SHA-256).

There are many places where you can find these checksums for verification. Examples can be found below.

 -  [files.rg-adguard](https://files.rg-adguard.net/search) (the most complete collection)
 -  [MVS dump](https://awuctl.github.io/mvs/)
 -  [genuine-iso-verifier](https://genuine-iso-verifier.weebly.com/)
 -  [msdn.rg-adguard](https://msdn.rg-adguard.net/)
 -  [sha1.rg-adguard](https://sha1.rg-adguard.net/)
 -  Google

#### Microsoft's Official free links for checksums:

 -	[MVS](https://my.visualstudio.com/Downloads)
 -	[Windows 11](https://www.microsoft.com/en-us/software-download/windows11)
 -	[Windows 10](https://www.microsoft.com/en-us/software-download/windows10)

<details>
  <summary>More info on Official links!</summary>

**MVS**  
On MVS, you need to login and click on 'All Downloads' button and then search the product name.  

**MVS Limitations:**  
 -	They used to publish only SHA-1, but later started publishing SHA-1 and SHA-256 both and from 2022 they now publish only SHA-256.  
 -	However they removed all the SHA-1 data and as a result, old files checksums are simply not available on MVS site.  
 -	Also, around the time when they were publishing SHA-1 and SHA-256 both, they messed up some SHA-256 data, for example 
 	```
 	Incorrect SHA-256 example
 	SHA256: BDB3D0C5C933B201ECE736A172FB604AA5D7D0705DD75681F9FCC4B1EE79FAC8
 	File name: en-uk_windows_10_enterprise_ltsc_2019_x64_dvd_723dfbc1.iso
 	```
 -	So its useful only for the latest files.

**Windows 11**  
SHA-256 list will appear if you download the ISO file.

**Windows 10**  
Microsoft doesn't allow you to download ISO file directly if browser's useragent is Windows OS. So you need to change it to something else like Android or IOS and then download the ISO file to see the list.

</details>

---

:::info

Windows 11 solo se distribuye como sistema operativo de 64 bits. Sin embargo, incluye versiones de 32 bits de Windows PowerShell y Windows PowerShell ISE. En nuestra sede del CATEPS solo disponemos de equipos con Windows 11 en las aulas.

:::

