import React, { useState, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  BaseEdge,
  getStraightPath,
  Handle,
  Position
} from '@xyflow/react';
import type { Node, Edge, EdgeProps, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const FONDOS_CATEPS = [
  '/img/cateps.webp',
  '/img/cateps-aerea.webp',
  '/img/cateps-patio-central.webp',
  '/img/cateps-edificio.webp',
  '/img/cateps-terraza.webp',
  '/img/cateps-entrada.webp'
];

const AccesoIndicador: React.FC = () => (
  <div style={{
    position: 'absolute', top: '25px', right: '40px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    color: '#93BD22', zIndex: 10, pointerEvents: 'none',
    fontFamily: 'monospace'
  }}>
    <div style={{ fontSize: '11px', letterSpacing: '2px', marginBottom: '2px', opacity: 0.9, fontFamily: 'sans-serif', fontWeight: 'bold' }}>
      ACCESO AL AULA
    </div>
    <div className="arrow-animated-vertical-final">
      <svg width="40" height="60" viewBox="0 0 24 55" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6l8 8 8-8" />
        <path d="M4 18l8 8 8-8" />
        <path d="M4 30l8 8 8-8" />
        <path d="M4 42l8 8 8-8" />
      </svg>
    </div>
    <style>{`
      .arrow-animated-vertical-final { 
        animation: arrowPulseDownCorrected 1.5s infinite ease-in-out; 
        filter: drop-shadow(0 0 10px rgba(147, 189, 34, 0.7));
      }
      @keyframes arrowPulseDownCorrected { 
        0%, 100% { opacity: 0.4; transform: translateY(0); } 
        50% { opacity: 1; transform: translateY(15px); } 
      }
    `}</style>
  </div>
);

const PowerShellConsole: React.FC<{ visible: boolean }> = ({ visible }) => {
  const commands = ['Ejecutando Windows Terminal...', 'PowerShell 7 activado', 'Lanzando comando remoto 🚀'];
  const [text, setText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [cmdIndex, setCmdIndex] = useState(0);

  useEffect(() => {
    if (!visible) { setText(''); setCharIndex(0); setCmdIndex(0); return; }
    if (charIndex < commands[cmdIndex].length) {
      const t = setTimeout(() => {
        setText(prev => prev + commands[cmdIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText(''); setCharIndex(0);
        setCmdIndex(prev => (prev + 1) % commands.length);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [charIndex, cmdIndex, visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute', top: '-3px', left: '170px', width: '240px',
      background: 'rgba(10, 10, 15, 0.9)', border: '1px solid #93BD22',
      borderRadius: '4px', padding: '10px', fontSize: '11px',
      fontFamily: 'monospace', color: '#fff', boxShadow: '0 0 20px rgba(147, 189, 34, 0.2)',
      zIndex: 20, textAlign: 'left'
    }}>
      <div style={{ color: '#93BD22', fontSize: '9px', marginBottom: '5px', opacity: 0.7 }}>ADMIN: POWERSHELL</div>
      {text}<span style={{ animation: 'blink 1s infinite' }}>_</span>
    </div>
  );
};

const ProfesorNode: React.FC<NodeProps> = ({ data }) => (
  <div style={{ 
    background: 'linear-gradient(135deg, rgba(147, 189, 34, 0.25) 0%, rgba(10, 10, 10, 0.9) 100%)', 
    border: '2px solid #93BD22', 
    padding: '15px 10px', 
    borderRadius: '6px', 
    width: '150px', 
    textAlign: 'center', 
    color: '#fff', 
    position: 'relative',
    boxShadow: data.showEffects ? '0 0 15px rgba(147, 189, 34, 0.3)' : 'none'
  }}>
    <PowerShellConsole visible={!!data.showEffects} />
    <div style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '1px' }}>{data.label as string}</div>
    <Handle type="source" id="h-pc01" position={Position.Bottom} style={{ left: '35%', opacity: 0 }} />
    <Handle type="source" id="h-pc02" position={Position.Bottom} style={{ left: '50%', opacity: 0 }} />
    <Handle type="source" id="h-pc03" position={Position.Bottom} style={{ left: '65%', opacity: 0 }} />
    <Handle type="source" id="h-pc04" position={Position.Bottom} style={{ left: '96%', opacity: 0 }} />
  </div>
);

const PulseEdge: React.FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
  if (!data?.showEffects) return null;
  let path: string;
  if (data?.straight) {
    [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  } else {
    const dx = targetX - sourceX;
    const k = (data?.k as number) ?? 0.6;
    const dy = (data?.dy as number) ?? 60;
    const ay = (data?.ay as number) ?? 60;
    const c1x = sourceX + dx * k;
    const c1y = sourceY + dy;
    const c2x = targetX;
    const c2y = targetY - ay;
    path = `M ${sourceX} ${sourceY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${targetX} ${targetY}`;
  }
  return (
    <>
      <BaseEdge id={id} path={path} style={{ stroke: '#93BD22', strokeWidth: 2, opacity: 0.4 }} />
      <circle r="6" fill="#fff" style={{ filter: 'drop-shadow(0 0 5px #93BD22)' }}>
        <animateMotion dur="3s" repeatCount="indefinite" path={path} />
      </circle>
    </>
  );
};

const PCNodeContent: React.FC<{ data: any }> = ({ data }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'crosshair' }}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', textAlign: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>{data.label}</span>
        <span style={{ fontSize: '10px', color: '#93BD22', marginTop: '1px', fontWeight: 'bold' }}>{data.alias ? data.alias : data.sub}</span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      {isHovered && (
        <div style={{ position: 'absolute', bottom: '55px', left: '50%', transform: 'translateX(-50%)', width: '130px', padding: '8px', background: 'rgba(10, 10, 20, 0.95)', border: '1px solid #93BD22', borderRadius: '4px', color: '#fff', fontSize: '11px', zIndex: 1000, boxShadow: '0 0 15px rgba(147, 189, 34, 0.4)', textAlign: 'left' }}>
          <div><strong>IP:</strong> {data.sub}</div>
          <div style={{ color: data.inactive ? '#A40133' : '#00ff00', fontSize: '10px', fontWeight: 'bold', borderTop: '1px solid rgba(147, 189, 34, 0.3)', marginTop: '4px', paddingTop: '4px' }}>
            ● {data.inactive ? 'SISTEMA INACTIVO' : 'SISTEMA ACTIVO'}
          </div>
          <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid #93BD22` }} />
        </div>
      )}
    </div>
  );
};

const nodeTypes = { profNode: ProfesorNode };
const edgeTypes = { pulseEdge: PulseEdge };

export default function AulaL1AESC(): JSX.Element {
  const [showEffects, setShowEffects] = useState(false);
  const [rfInstance, setRfInstance] = useState<any>(null);

  useEffect(() => {
    if (rfInstance) { rfInstance.fitView({ padding: 0.07 }); }
  }, [rfInstance]);

  const initialNodes: Node[] = [
    { id: 'prof', type: 'profNode', data: { label: 'PROFESOR' }, position: { x: 0, y: 0 } },
    { id: '1', data: { label: 'PC-04', sub: '10.1.56.13', alias: 'Taller13' }, position: { x: 0, y: 150 } },
    { id: '2', data: { label: 'PC-03', sub: '10.1.56.14', alias: 'Taller14' }, position: { x: 130, y: 150 } },
    { id: '3', data: { label: 'PC-02', sub: '10.1.56.15', alias: 'Taller15' }, position: { x: 260, y: 150 } },
    { id: '4', data: { label: 'PC-01', sub: '10.1.56.16', alias: 'Taller16' }, position: { x: 390, y: 150 } },
    { id: '5', data: { label: 'PC-08', sub: '10.1.56.17', alias: 'Taller17' }, position: { x: 0, y: 225 } },
    { id: '6', data: { label: 'PC-07', sub: '10.1.56.18', alias: 'Taller18' }, position: { x: 130, y: 225 } },
    { id: '7', data: { label: 'PC-06', sub: '10.1.56.19', alias: 'Taller19' }, position: { x: 260, y: 225 } },
    { id: '8', data: { label: 'PC-05', sub: '10.1.56.20', alias: 'Taller20' }, position: { x: 390, y: 225 } },
    { id: '9', data: { label: 'PC-12', sub: '10.1.56.21', alias: 'Taller21' }, position: { x: 0, y: 300 } },
    { id: '10', data: { label: 'PC-11', sub: '10.1.56.22', alias: 'Taller22' }, position: { x: 130, y: 300 } },
    { id: '11', data: { label: 'PC-10', sub: '10.1.56.23', alias: 'Taller23' }, position: { x: 260, y: 300 } },
    { id: '12', data: { label: 'PC-09', sub: '10.1.56.24', alias: 'Taller24' }, position: { x: 390, y: 300 } },
    { id: '13', data: { label: 'PC-16', sub: '10.1.56.25', alias: 'Taller25' }, position: { x: 0, y: 375 } },
    { id: '14', data: { label: 'PC-15', sub: '10.1.56.26', alias: 'Taller26' }, position: { x: 130, y: 375 } },
    { id: '15', data: { label: 'PC-14', sub: '10.1.56.27', alias: 'Taller27' }, position: { x: 260, y: 375 } },
    { id: '16', data: { label: 'PC-13', sub: '10.1.56.28', alias: 'Taller28' }, position: { x: 390, y: 375 } },
    { id: '17', data: { label: 'PC-20', sub: '10.1.56.29', alias: 'Taller29' }, position: { x: 0, y: 450 } },
    { id: '18', data: { label: 'PC-19', sub: '10.1.56.30', alias: 'Taller30' }, position: { x: 130, y: 450 } },
    { id: '19', data: { label: 'PC-18', sub: '10.1.56.31', alias: 'Taller31' }, position: { x: 260, y: 450 } },
    { id: '20', data: { label: 'PC-17', sub: '10.1.56.32', alias: 'Taller32' }, position: { x: 390, y: 450 } },
    { id: '21', data: { label: 'PC-24', sub: '10.1.56.33', alias: 'Taller33' }, position: { x: 0, y: 525 } },
    { id: '22', data: { label: 'PC-23', sub: '10.1.56.34', alias: 'Taller34' }, position: { x: 130, y: 525 } },
    { id: '23', data: { label: 'PC-22', sub: '10.1.56.35', alias: 'Taller35' }, position: { x: 260, y: 525 } },
    { id: '24', data: { label: 'PC-21', sub: '10.1.56.36', alias: 'Taller36' }, position: { x: 390, y: 525 } },
    { id: '25', data: { label: 'PC-28', sub: '10.1.56.37', alias: 'Taller37' }, position: { x: 0, y: 600 } },
    { id: '26', data: { label: 'PC-27', sub: '10.1.56.38', alias: 'Taller38' }, position: { x: 130, y: 600 } },
    { id: '27', data: { label: 'PC-26', sub: '10.1.56.39', alias: 'Taller39' }, position: { x: 260, y: 600 } },
    { id: '28', data: { label: 'PC-25', sub: '10.1.56.40', alias: 'Taller40' }, position: { x: 390, y: 600 } },
    { id: '29', data: { label: 'PC-32', sub: '10.1.56.41', alias: 'Taller41' }, position: { x: 0, y: 675 } },
    { id: '30', data: { label: 'PC-31', sub: '10.1.56.42', alias: 'Taller42' }, position: { x: 130, y: 675 } },
    { id: '31', data: { label: 'PC-30', sub: '10.1.56.43', alias: 'Taller43' }, position: { x: 260, y: 675 } },
    { id: '32', data: { label: 'PC-29', sub: '10.1.56.44', alias: 'Taller44' }, position: { x: 390, y: 675 } },
    { id: 'anchor', position: { x: 520, y: 0 }, data: { label: '' }, style: { opacity: 0, width: 1, height: 1, pointerEvents: 'none' } }
  ];

  const initialEdges: Edge[] = [
    { id: 'e-p1', source: 'prof', sourceHandle: 'h-pc01', target: '1', type: 'pulseEdge', data: { straight: true, showEffects } },
    { id: 'e-p2', source: 'prof', sourceHandle: 'h-pc02', target: '2', type: 'pulseEdge', data: { k: 0.45, dy: 40, ay: 40, showEffects } },
    { id: 'e-p3', source: 'prof', sourceHandle: 'h-pc03', target: '3', type: 'pulseEdge', data: { k: 0.65, dy: 60, ay: 60, showEffects } },
    { id: 'e-p4', source: 'prof', sourceHandle: 'h-pc04', target: '4', type: 'pulseEdge', data: { k: 0.85, dy: 80, ay: 80, showEffects } },
  ];

  for (let col = 1; col <= 4; col++) {
    let nodesInCol: number[] = [];
    for (let i = col; i <= 32; i += 4) nodesInCol.push(i);
    for (let i = 0; i < nodesInCol.length - 1; i++) {
      initialEdges.push({
        id: `l-${col}-${nodesInCol[i]}`, source: `${nodesInCol[i]}`, target: `${nodesInCol[i + 1]}`,
        style: { stroke: '#93BD22', strokeWidth: 1.5, opacity: showEffects ? 0.3 : 0 },
        type: 'straight', zIndex: -1
      });
    }
  }

  const nodesWithStyle = initialNodes.map(n => {
    if (n.id === 'anchor') return n;
    return {
      ...n,
      zIndex: 1,
      data: { ...n.data, showEffects, label: n.type === 'profNode' ? n.data.label : <PCNodeContent data={n.data} /> },
      style: n.type === 'profNode' ? {} : {
        background: 'linear-gradient(135deg, rgba(147, 189, 34, 0.15) 0%, rgba(5, 5, 5, 0.95) 100%)', 
        border: '1px solid #93BD22', borderRadius: '6px', width: 110, height: 50, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        animation: showEffects ? 'pulse 2s infinite ease-out' : 'none'
      }
    };
  });

  return (
    <div style={{ width: '100%', height: '850px', background: '#0a0a0a', border: '1px solid #93BD22', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => setShowEffects(!showEffects)} className={!showEffects ? "btn-pulsador-l2 heartbeat-active" : "btn-pulsador-l2 btn-activo"}
          style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #93BD22', background: showEffects ? '#93BD22' : 'transparent', cursor: 'pointer', transition: 'all 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: showEffects ? '#000' : '#93BD22', transition: '0.3s' }} />
        </button>
        <span style={{ color: '#93BD22', fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold' }}>{showEffects ? 'Desactivar' : 'Activar'}</span>
      </div>
      <div style={{ position: 'absolute', bottom: '15px', right: '25px', color: '#93BD22', fontSize: '32px', fontWeight: '300', opacity: 0.5, zIndex: 5 }}>L1-A-ESC</div>
      <AccesoIndicador />
      <style>{`
        @keyframes heartbeat { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .heartbeat-active { animation: heartbeat 1.5s infinite ease-in-out; }
        .btn-activo { box-shadow: 0 0 15px #93BD22; }
        .btn-pulsador-l2:hover { box-shadow: 0 0 25px #93BD22 !important; transform: scale(1.15) !important; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(147, 189, 34, 0.6); } 70% { box-shadow: 0 0 0 10px rgba(147, 189, 34, 0); } 100% { box-shadow: 0 0 0 0 rgba(147, 189, 34, 0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .react-flow__handle { opacity: 0 !important; }
        .react-flow__controls { left: 20px; bottom: 20px; border: 1px solid #93BD22 !important; background: rgba(0,0,0,0.5) !important; }
        .react-flow__controls-button { border-bottom: 1px solid #93BD22 !important; background: transparent !important; }
        .react-flow__controls-button svg { fill: #93BD22 !important; }
      `}</style>
      <ReactFlow nodes={nodesWithStyle} edges={initialEdges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onInit={setRfInstance} fitView fitViewOptions={{ padding: 0.07 }} nodesDraggable={false} proOptions={{ hideAttribution: true }}>
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}