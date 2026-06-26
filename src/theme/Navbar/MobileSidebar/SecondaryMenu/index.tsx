import React, {useState, type ReactNode} from 'react';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';

// Icono externo idéntico al de Docusaurus
const ExternalIcon = () => (
  <svg
    width="13.5"
    height="13.5"
    aria-hidden="true"
    viewBox="0 0 24 24"
    style={{marginLeft: '0.3rem', verticalAlign: 'middle', opacity: 0.6}}>
    <path
      fill="currentColor"
      d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
    />
  </svg>
);

function CollapseToggle({label, children}: {label: string; children: ReactNode}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <li className={`menu__list-item${collapsed ? ' menu__list-item--collapsed' : ''}`}>
      <div className="menu__list-item-collapsible" style={{gap: 0}}>
        <span className="menu__link menu__link--sublist" style={{cursor: 'default', paddingRight: 0}}>
          {label}
        </span>
        <button
          className="clean-btn menu__caret"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expandir' : 'Contraer'}
          style={{marginLeft: -8}}
        />
      </div>
      <ul className="menu__list">
        {children}
      </ul>
    </li>
  );
}

function InstitutionalLinks(): ReactNode {
  return (
    <ul className="menu__list" style={{borderTop: '1px solid var(--ifm-toc-border-color)', paddingTop: '0.5rem', marginTop: '0.5rem'}}>
      <li className="menu__list-item">
        <a className="menu__link" href="https://www.us.es/" target="_blank" rel="noopener noreferrer">
          US <ExternalIcon />
        </a>
      </li>
      <li className="menu__list-item">
        <a className="menu__link" href="https://eps.us.es/" target="_blank" rel="noopener noreferrer">
          EPS <ExternalIcon />
        </a>
      </li>
      <li className="menu__list-item">
        <a className="menu__link" href="https://github.com/cdceps/" target="_blank" rel="noopener noreferrer">
          GitHub EPS <ExternalIcon />
        </a>
      </li>
      <li className="menu__list-item">
        <Link className="menu__link" to="/docs/contacto">
          Contacto
        </Link>
      </li>
    </ul>
  );
}

function StaticDocsMenu(): ReactNode {
  return (
    <ul className="menu__list">
      <li className="menu__list-item">
        <Link className="menu__link" to="/docs">
          Introducción
        </Link>
      </li>
      <CollapseToggle label="Aulas CATEPS">
        <li className="menu__list-item">
          <Link className="menu__link" to="/docs/aulas/L1-D-ATC">L1-D-ATC</Link>
        </li>
        <li className="menu__list-item">
          <Link className="menu__link" to="/docs/aulas/L2-D-ATC">L2-D-ATC</Link>
        </li>
        <li className="menu__list-item">
          <Link className="menu__link" to="/docs/aulas/L1-A-ESC">L1-A-ESC</Link>
        </li>
      </CollapseToggle>
      <CollapseToggle label="Scripts">
        <CollapseToggle label="CIA / Control Internet Aulas">
          <li className="menu__list-item">
            <Link className="menu__link" to="/docs/cia-control-internet-aulas">Introducción CIA</Link>
          </li>
          <li className="menu__list-item">
            <Link className="menu__link" to="/docs/cia-changelog">Changelog</Link>
          </li>
          <li className="menu__list-item">
            <Link className="menu__link" to="/docs/cia-checksum">Checksum</Link>
          </li>
          <li className="menu__list-item">
            <Link className="menu__link" to="/docs/cia-faq">FAQs</Link>
          </li>
        </CollapseToggle>
      </CollapseToggle>
      <CollapseToggle label="Guías">
        <li className="menu__list-item">
          <Link className="menu__link" to="/docs/powershell-7">PowerShell 7</Link>
        </li>
        <li className="menu__list-item">
          <Link className="menu__link" to="/docs/powershell-gallery">PowerShell Gallery</Link>
        </li>
      </CollapseToggle>
      <InstitutionalLinks />
    </ul>
  );
}

export default function NavbarMobileSidebarSecondaryMenu(): ReactNode {
  const secondaryMenu = useNavbarSecondaryMenu();

  if (secondaryMenu.content) {
    return (
      <>
        {secondaryMenu.content}
        <InstitutionalLinks />
      </>
    );
  }

  return <StaticDocsMenu />;
}