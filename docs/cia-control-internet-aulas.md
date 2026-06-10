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

# Control Internet Aulas (CIA)

:::info

- All download links available on our website lead to genuine files only.
- Slow download? Use a download manager like [FDM](https://www.freedownloadmanager.org/).
- Download link not working? Try [WARP](https://one.one.one.one/) VPN to unblock.

:::

------------------------------------------------------------------------

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImageGallery from '@site/src/components/ImageGallery';

## Métodos de ejecución

<Tabs>
  <TabItem value="powershell" label="Método 1: Script PowerShell 7 (local)" default>

  **Este método es el más recomendado y funciona tanto en Windows 10 como en Windows 11.**

  1. Click the **Start Menu**, type `PowerShell`, and open it, es un script Standalone.
  2. Copy and paste the code below and press **Enter.**
  
  <div className="launcher-command">
  ```powershell title="PowerShell"
  irm https://get.activated.win | iex
  ```
  </div>

  3. In the menu that appears, type the number corresponding to one of the **Green** options.
  
  <details>
    <summary><strong>Having trouble? (Blocked by ISP or Old Windows)</strong></summary>
    
    **If the command is blocked:**  
    Some ISPs block the URL. Use this command to bypass DNS blocks (Windows 10/11 only):
    ```powershell
    iex (curl.exe -s --doh-url https://1.1.1.1/dns-query https://get.activated.win | Out-String)
    ```

    **If you receive a TLS/SSL Error (Older Windows):**  
    If you are on an old build of Windows 8.1 or 10, run this command *before* the main command:
    ```powershell
    [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12
    ```
  </details>

  </TabItem>
  <TabItem value="online" label="Método 2: Gestión Centralizada (NuGet Repo)">

  **Use this method if you prefer downloading a file or cannot use the PowerShell method.**

  1. Download the script:
      *   [**MAS_AIO.cmd**](https://dev.azure.com/massgrave/Microsoft-Activation-Scripts/_apis/git/repositories/Microsoft-Activation-Scripts/items?path=/MAS/All-In-One-Version-KL/MAS_AIO.cmd&download=true) (Direct script)
      *   [**MAS_AIO.zip**](https://dev.azure.com/massgrave/Microsoft-Activation-Scripts/_apis/git/repositories/Microsoft-Activation-Scripts/items?$format=zip) (If the direct script is blocked by your browser)
  2. Run the `MAS_AIO.cmd` file.
  3. In the menu that appears, type the number corresponding to one of the **Green** options.
  
:::info

GitHub Gist es una herramienta de GitHub que nos permite crear y compartir fragmentos de código, scripts, configuraciones o notas de texto de forma rápida y sencilla.

:::

  </TabItem>
</Tabs>

:::danger[Atención]
Debido a la política de mantenimiento (Auto-Unlock), el bloqueo **no persiste tras un reinicio**. Es **imperativo** que el docente utilice la **Opción 3 (Ver estado)** periódicamente durante el examen para confirmar que ningún equipo ha sido reiniciado fraudulentamente.
:::

---

- To activate additional products such as **Office for macOS, Visual Studio, RDS CALs, and Windows XP**.
- To run the scripts in unattended mode.

---

:::note

- The `irm` command in PowerShell downloads a script from a specified URL, and the `iex` command executes it.
- Always double-check the URL before executing the command and verify the source is trustworthy when manually downloading files.
- Be cautious of third parties spreading malware disguised as MAS by altering the URL in the PowerShell command.

:::

------------------------------------------------------------------------

## Features

-   **HWID (Digital License):** Permanently activate Windows.
-   **Ohook:** Permanently activate Office.
-   **TSforge:** Permanently activate Windows, ESU, and Office.
-   **Online KMS:** Activate Windows/Office for 180 days (Lifetime with renewal task).
-   Advanced activation troubleshooting.
-   $OEM$ folders for pre-activation.
-   Change Windows edition.
-   Change Office edition.
-   Check Windows/Office activation status.
-   Available in All-In-One and separate file versions.
-   Fully open source and based on batch scripts.
-   Fewer antivirus detections.

------------------------------------------------------------------------

## Activations Summary

| Activation Type | Supported Product      | Activation Period                    | Is Internet Needed? |
|:----------------|:-----------------------|:-------------------------------------|:--------------------|
| HWID            | Windows 10-11          | Permanent                            | Yes                 |
| Ohook           | Office                 | Permanent                            | No                  |
| TSforge         | Windows / ESU / Office | Permanent                            | Yes, needed on build 26100 and later |
| Online KMS      | Windows / Office       | 180 Days (Lifetime with renewal task) | Yes                 |

For more details, see the respective pages in the documentation.  
To activate unsupported products such as **Office on Mac**.

------------------------------------------------------------------------

## Capturas

<ImageGallery images={[
  { src: '/img/CIA-script-menu.png', title: 'Menú principal de CIA' },
  { src: '/img/CIA-script-listado-puestos.png', title: 'Listado de puestos de un aula' },
  { src: '/img/CIA-script-carga-doc.png', title: 'Carga de documentación online' },
  { src: '/img/CIA-script-bloqueo.png', title: 'Bloqueo de Internet vía WinRM' },
  { src: '/img/CIA-script-desbloqueo.png', title: 'Equipos desbloqueados' },
  { src: '/img/CIA-script-escaneando.png', title: 'Escaneando el aula por consola' },
  { src: '/img/CIA-script-estado-aula.png', title: 'Estado de un aula' }
]} />

{/*
<img src="/img/CIA-script-menu.png" width="80%" style={{ display: 'block' }} />

<div style={{ borderTop: '1px solid var(--ifm-toc-border-color)', margin: '3rem 0', opacity: '0.5' }}></div>
*/}

## Download Windows
-  [Windows 11]
-  [Windows 10]
-  [Windows 10 / 11 Enterprise **LTSC**]
-  [Windows ARM64]
-  [Windows Server]
-  [Windows Embedded]
-  Windows Insider [10-11](https://www.microsoft.com/en-us/software-download/windowsinsiderpreviewiso) - [Server](https://www.microsoft.com/en-us/software-download/windowsinsiderpreviewserver) / [Registration](https://www.microsoft.com/en-us/windowsinsider/getting-started) is needed to download.

## Download Office
Activation with is required after the installation of Office.

-  [Office C2R Installers]❤️ (O365, 2024, 2021, 2019, 2016, 2013)  
-  [Office C2R Custom Install] (O365, 2024, 2021, 2019, 2016)
-  [Office MSI VL (Old versions)] (2016, 2013, 2010)
-  [Office For **Mac**]                             

---

#### There are both consumer and business ISOs listed here. What is the difference between them?

<details>
<summary>Click here for info</summary>

For Windows 10/11 General Availability Channel (GAC) releases (i.e., Home and Pro), Microsoft produces two types of ISO files: Consumer and Business. 

The Consumer ISO includes all editions such as Home, Pro, and Education, but excludes the Enterprise edition. In contrast, the Business ISO contains all editions except for the Home-level editions, and these ISO files come with a KMS key pre-installed (not activated) by default.

</details>

#### What are Windows N, K, and KN editions, and should I use them?

<details>
<summary>Click here for info</summary>

- **Windows N editions** are European versions of Windows **without media features** like Windows Media Player. They were created because the **EU required Microsoft** to offer Windows without built-in media software, as explained in [Microsoft’s statement](https://news.microsoft.com/source/2005/03/28/microsoft-statement-on-european-commission-process-2/) and the [EU decision](https://www.microsoft.com/en-us/legal/antitrust/eu-commission-decision).  

- **Windows K and KN editions** are versions for **South Korea**, made after a ruling by the Korea Fair Trade Commission (KFTC) requiring Microsoft to offer Windows without certain media and messaging apps. You can read Microsoft’s [official statement on the KFTC decision](https://news.microsoft.com/2005/12/06/microsoft-statement-on-korean-fair-trade-commission-decision/).

- You can restore most missing features by installing the Media Feature Pack, but **[some functions may still not work fully](https://support.microsoft.com/en-us/windows/media-feature-pack-for-windows-n-8622b390-4ce6-43c9-9b42-549e5328e407?#:~:text=Note%20that%20some%20of%20these%20may%20not%20work%20properly%20after%20installing%20the%20Media%20Feature%20Pack)** even after installation.  

- **Windows N, K, and KN editions** are **not recommended for general use**.

</details>

#### How can I obtain an official Microsoft ISO that is not available here?

<details>
<summary>Click here for info</summary>

You can request the file [here](https://discord.gg/FajfGaH3nD).

</details>

---

## HWID

This page is for people who do not want to use the script for any reason and would rather perform the HWID activation process themselves. If you'd like to use a tool for this.

:::info
HWID activation is only supported on Windows 10/11.
:::

## Manually Activate Windows
To manually activate Windows, follow these steps:
-   Make sure you have a working internet connection.
-   Determine your Windows Edition. You can find this by searching for "About your PC" in the start menu.
-   Download the appropriate ticket file from the table below; the ticket file must match your Windows edition.
-   Copy the downloaded ticket file to:  
    `C:\ProgramData\Microsoft\Windows\ClipSVC\GenuineTicket`    
    The `ProgramData` folder is hidden by default. You can access it directly by pasting the full path above into the Windows Explorer address bar.
-   Open the Windows Activation settings and click the "Change product key" button.
-   Copy the corresponding product key from the table below and paste it into the product key field.
-   After waiting for a few seconds, Windows should be activated.

:::tip
If you're seeing error `0x803fa067` while trying to change the product key, disconnect your PC from the internet and try changing the product key again.   
After you have done that, connect to the internet again and Windows should be activated.
:::

### Windows 10/11

| Edition                               | Key                           | Ticket                                                                                                                      |
|---------------------------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Education                             | YNMGQ-8RYV3-4PGQ3-C8XTP-7CFBY | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Education.xml)                             |
| Education N                           | 84NGF-MHBT6-FXBX8-QWJK7-DRR8H | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Education.N.xml)                           |
| Enterprise                            | XGVPP-NMH47-7TTHJ-W3FW7-8HV2C | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.xml)                            |
| Enterprise N                          | 3V6Q6-NQXCX-V8YXR-9QCYV-QPFCT | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.N.xml)                          |
| Enterprise LTSB 2015                  | FWN7H-PF93Q-4GGP8-M8RF3-MDWWW | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.LTSB.2015.xml)                  |
| Enterprise LTSB 2016                  | NK96Y-D9CD8-W44CQ-R8YTK-DYJWX | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.LTSB.2016.xml)                  |
| Enterprise LTSC 2019                  | 43TBQ-NH92J-XKTM7-KT3KK-P39PB | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.LTSC.2019.xml)                  |
| Enterprise N LTSB 2015                | NTX6B-BRYC2-K6786-F6MVQ-M7V2X | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.N.LTSB.2015.xml)                |
| Enterprise N LTSB 2016                | 2DBW3-N2PJG-MVHW3-G7TDK-9HKR4 | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Enterprise.N.LTSB.2016.xml)                |
| Home                                  | YTMG3-N6DKC-DKB77-7M9GH-8HVX7 | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Home.xml)                                  |
| Home N                                | 4CPRK-NM3K3-X6XXQ-RXX86-WXCHW | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Home.N.xml)                                |
| Home China                            | N2434-X9D7W-8PF6X-8DV9T-8TYMD | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Home.China.xml)                            |
| Home Single Language                  | BT79Q-G7N6G-PGBYW-4YWX6-6F4BT | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Home.Single.Language.xml)                  |
| IoT Enterprise                        | XQQYW-NFFMW-XJPBH-K8732-CKFFD | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/IoT.Enterprise.xml)                        |
| IoT Enterprise Subscription           | P8Q7T-WNK7X-PMFXY-VXHBG-RRK69 | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/IoT.Enterprise.Subscription.xml)           |
| IoT Enterprise LTSC 2021              | QPM6N-7J2WJ-P88HH-P3YRH-YY74H | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/IoT.Enterprise.LTSC.2021.xml)              |
| IoT Enterprise LTSC 2024              | CGK42-GYN6Y-VD22B-BX98W-J8JXD | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/IoT.Enterprise.LTSC.2024.xml)              |
| IoT Enterprise LTSC Subscription 2024 | N979K-XWD77-YW3GB-HBGH6-D32MH | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/IoT.Enterprise.LTSC.Subscription.2024.xml) |
| Pro                                   | VK7JG-NPHTM-C97JM-9MPGT-3V66T | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Pro.xml)                                   |
| Pro N                                 | 2B87N-8KFHP-DKV6R-Y2C8J-PKCKT | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Pro.N.xml)                                 |
| Pro Education                         | 8PTT6-RNW4C-6V7J2-C2D3X-MHBPB | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Pro.Education.xml)                         |
| Pro Education N                       | GJTYN-HDMQY-FRR76-HVGC7-QPF8P | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Pro.Education.N.xml)                       |
| Pro for Workstations                  | DXG7C-N36C4-C4HTG-X4T3X-2YV77 | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Pro.for.Workstations.xml)                  |
| Pro N for Workstations                | WYPNQ-8C467-V2W6J-TX4WX-WT2RQ | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Pro.N.for.Workstations.xml)                |
| S                                     | V3WVW-N2PV2-CGWC3-34QGF-VMJ2C | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Cloud.S.xml)                               |
| S N                                   | NH9J3-68WK7-6FB93-4K3DF-DJ4F6 | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Cloud.S.N.xml)                             |
| SE                                    | KY7PN-VR6RX-83W6Y-6DDYQ-T6R4W | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/CloudEdition.SE.xml)                       |
| SE N                                  | K9VKN-3BGWV-Y624W-MCRMQ-BHDCD | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/CloudEdition.SE.N.xml)                     |
| Team                                  | XKCNC-J26Q9-KFHD2-FKTHY-KD72Y | [Link](https://github.com/massgravel/hwid-kms38-tickets/releases/latest/download/Team.xml)                                  |

## Office 2010

- [Office 2010 Installer.] 
- [Ohook Script for Office 2010 by abbodi1406.](https://gitlab.com/-/project/11037551/uploads/bbdc7aae987d08f8e2bf6533942e623a/office2010_ohook.7z) *(Password: `2010`)*  

1. Extract the Ohook archive.
2. Run 	`_install.cmd` script.
3. Get a key for the installed Office 2010 product.
4. Open an Office app > `File > Help > Activate/Change Product Key`.
5. Enter the key and finish activation.

Office 2010 should now be permanently activated.  

**Note:** 
- Before uninstalling Office, run `_uninstall.cmd` script to remove Ohook.
- MAS supports Office on Windows Vista and later.

------------------------------------------------------------------------

## Remote Desktop Services

**Activation**  

1. Open **Remote Desktop Licensing Manager**.
2. Right-click your server and select **Activate Server**.
3. Choose **Web Browser** as the connection method, then click Next.
4. On the next screen, a **Product ID** will be displayed.  
   Go to the [LyssaRDSGen website](https://thecatontheceiling.github.io/LyssaRDSGen/) and use this Product ID to generate a **License Server ID**.
5. Enter the generated License Server ID into the wizard.
6. When you see the message **"The license server has been successfully activated."**, click Next.
7. Continue by clicking Next again.  
   The wizard will prompt you to enter a **License Key Pack ID**.
8. Generate the License Key Pack ID from the same LyssaRDSGen website and enter it into the wizard.
9. Once the message **"The requested licenses have been successfully installed."** appears, the process is complete.

------------------------------------------------------------------------

## Visual Studio

-	Download - https://visualstudio.microsoft.com/downloads/
-	Activation keys:

| Editions                        | Activation Key                |
|---------------------------------|-------------------------------|
| Visual Studio 2026 Professional | NVTDK-QB8J9-M28GR-92BPC-BTHXK |
| Visual Studio 2026 Enterprise   | VYGRN-WPR22-HG4X3-692BF-QGT2V |
| Visual Studio 2022 Professional | TD244-P4NB7-YQ6XK-Y8MMM-YWV2J |
| Visual Studio 2022 Enterprise   | VHF9H-NXBBB-638P6-6JHCY-88JWH |
| Visual Studio 2019 Professional | NYWVH-HT4XC-R2WYW-9Y3CM-X4V3Y |
| Visual Studio 2019 Enterprise   | BF8Y8-GN2QH-T84XB-QVY3B-RC4DF |

------------------------------------------------------------------------

## SQL Server

-	Download - https://www.microsoft.com/en-us/evalcenter/sql-server-2025-download
-	Activation keys:

| Editions                        | Activation Key                |
|---------------------------------|-------------------------------|
| SQL Server 2025 Enterprise      | B64XM-XC68Y-XRM4N-MTX7B-MY9J4 |
| SQL Server 2025 Enterprise Core | H62HC-BCYXW-PP88N-PXPV3-BHD6H |
| SQL Server 2025 Standard        | HX782-X7RHN-BVHGT-8HB24-2KGXG |
| SQL Server 2022 Enterprise      | J4V48-P8MM4-9N3J9-HD97X-DYMRM |
| SQL Server 2022 Enterprise Core | 2Q48Q-PB48J-DRCVN-GB844-X2H4Q |
| SQL Server 2022 Standard        | FG86G-CHH2T-CB7NJ-XT7D2-V8V4X |
| SQL Server 2022 Web             | 2R97W-F4XNT-T6MYV-3TKB7-6X3JM |
| SQL Server 2022 Developer       | 22222-00000-00000-00000-00000 |
| SQL Server 2019 Enterprise      | HMWJ3-KY3J2-NMVD7-KG4JR-X2G8G |
| SQL Server 2019 Standard        | PMBDC-FXVM3-T777P-N4FY8-PKFF4 |

------------------------------------------------------------------------

{/*
#### Video Tutorial

import ReactPlayer from 'react-player'

<ReactPlayer controls width='100%' height='auto' src='/how_to_verify_files.mp4' />
*/}
