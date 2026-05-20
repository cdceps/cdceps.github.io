import React, { useState, useEffect } from 'react';
import { ReactFlow, Controls, BaseEdge, getSmoothStepPath, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// COMPONENTE ACCESO AL AULA (VERDE EPS)
const AccesoIndicador = () => (
  <div style={{
    position: 'absolute', top: '30px', right: '25px', 
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    color: '#93BD22', zIndex: 10, pointerEvents: 'none',
    fontFamily: 'monospace'
  }}>
    <div style={{ fontSize: '11px', letterSpacing: '2px', marginBottom: '2px', opacity: 0.9, fontFamily: 'sans-serif', fontWeight: 'bold' }}>ACCESO AL AULA</div>
    <div className="arrow-animated" style={{ 
      display: 'flex', alignItems: 'center', lineHeight: 1, fontSize: '35px', fontWeight: 'bold', letterSpacing: '-6px'
    }}>&lt;&lt;&lt;&lt;</div>
    <style>{`
      @keyframes arrowPulse {
        0%, 100% { opacity: 0.3; transform: translateX(0); }
        50% { opacity: 1; transform: translateX(-10px); }
      }
      .arrow-animated { animation: arrowPulse 1.5s infinite ease-in-out; text-shadow: 0 0 10px rgba(147, 189, 34, 0.5); }
    `}</style>
  </div>
);

// TERMINAL POWERSHELL (VERDE EPS)
const PowerShellConsole = ({ visible }) => {
  const commands = ["Ejecutando Windows Terminal...", "PowerShell 7 activado", "Lanzando comando remoto 🚀"];
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [cmdIndex, setCmdIndex] = useState(0);

  useEffect(() => {
    if (!visible) { setText(""); setCharIndex(0); setCmdIndex(0); return; }
    if (charIndex < commands[cmdIndex].length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + commands[cmdIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText(""); setCharIndex(0); setCmdIndex(prev => (prev + 1) % commands.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, cmdIndex, visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute', top: '70px', right: '-4px', width: '320px', minHeight: '80px',
      background: 'rgba(10, 10, 15, 0.9)', border: '1px solid #93BD22', borderRadius: '4px',
      padding: '15px', fontSize: '13px', fontFamily: 'monospace', color: '#fff',
      boxShadow: '0 0 25px rgba(147, 189, 34, 0.2)', zIndex: 20, textAlign: 'left',
      lineHeight: '1.4'
    }}>
      <div style={{ color: '#93BD22', fontSize: '10px', marginBottom: '8px', opacity: 0.8, fontWeight: 'bold' }}>ADMIN: POWERSHELL_SYSTEM</div>
      {text}<span style={{ animation: 'blink 1s infinite', color: '#93BD22' }}>█</span>
    </div>
  );
};

// NODOS (PROFESOR CON GRADIENTE VERDE)
const ProfesorNode = ({ data }) => (
  <div style={{ 
    background: 'linear-gradient(135deg, rgba(147, 189, 34, 0.25) 0%, rgba(10, 10, 10, 0.9) 100%)', 
    border: '2px solid #93BD22', 
    borderRadius: '6px', width: '150px', height: '60px', color: '#fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' 
  }}>
    <PowerShellConsole visible={data.showEffects} />
    <div style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '1px' }}>{data.label}</div>
    <Handle type="source" position={Position.Top} id="h-t1" style={{ left: '15%', opacity: 0 }} />
    <Handle type="source" position={Position.Top} id="h-t2" style={{ left: '50%', opacity: 0 }} />
    <Handle type="source" position={Position.Top} id="h-t3" style={{ left: '85%', opacity: 0 }} />
  </div>
);

const PCNode = ({ id, data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isInactive = data.inactive === true;
  const showEffects = data.showEffects;
  const isPC01 = id === '1';

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className={showEffects ? (isInactive ? "node-pulse-red pc-inactive-cross" : "node-pulse-final") : (isInactive ? "pc-inactive-cross-static" : "")}
      style={{ 
        width: '125px', height: '55px', 
        background: 'linear-gradient(135deg, rgba(147, 189, 34, 0.1) 0%, rgba(5, 5, 5, 0.95) 100%)',
        border: `1px solid ${isInactive ? '#A40133' : '#93BD22'}`, 
        borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        cursor: 'crosshair',
        zIndex: isHovered ? 1000 : 1 
      }}>
      <div className="pc-text-container">
        <span className="pc-label-l2">{data.label}</span>
        <span className="pc-sub-l2" style={{ color: isInactive ? '#A40133' : '#93BD22' }}>{data.alias ? data.alias : data.sub}</span>
      </div>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      {isHovered && (
        <div style={{
          position: 'absolute', bottom: '61px', left: isPC01 ? '35%' : '50%', 
          transform: isPC01 ? 'translateX(0)' : 'translateX(-50%)',
          width: '140px', padding: '10px', background: 'rgba(5, 5, 15, 0.95)',
          border: `1px solid ${isInactive ? '#A40133' : '#93BD22'}`, borderRadius: '4px',
          color: '#fff', fontSize: '11px', zIndex: 1001, textAlign: 'left',
          boxShadow: `0 0 15px ${isInactive ? 'rgba(164, 1, 51, 0.3)' : 'rgba(147, 189, 34, 0.3)'}`
        }}>
          <div><strong>IP:</strong> {data.sub}</div>
          <div style={{ color: isInactive ? '#A40133' : '#00ff00', fontSize: '10px', fontWeight: 'bold', borderTop: `1px solid ${isInactive ? 'rgba(164, 1, 51, 0.2)' : 'rgba(147, 189, 34, 0.2)'}`, marginTop: '5px', paddingTop: '5px' }}>
            ● {isInactive ? 'SISTEMA INACTIVO' : 'SISTEMA ACTIVO'}
          </div>
          <div style={{ position: 'absolute', bottom: '-7px', left: isPC01 ? '14%' : '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${isInactive ? '#A40133' : '#93BD22'}` }} />
        </div>
      )}
    </div>
  );
};

// EDGES (VERDE EPS)
const AnimatedEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const [edgePath] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 40, offset: data?.offset || 20 });
  if (!data?.showEffects) return null;
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: '#93BD22', strokeWidth: 2, opacity: 0.3 }} />
      <circle r="6" fill="#fff" style={{ filter: 'drop-shadow(0px 0px 5px #93BD22)' }}>
        <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
};

const nodeTypes = { profNode: ProfesorNode, pcNode: PCNode };
const edgeTypes = { animEdge: AnimatedEdge };

export default function AulaL2D() {
  const [showEffects, setShowEffects] = useState(false);

  const initialNodes = [
    { id: 'prof', type: 'profNode', position: { x: 750, y: 780 }, data: { label: 'PROFESOR' } },
    { id: '1', type: 'pcNode', position: { x: 50, y: 20 }, data: { label: 'PC-22', sub: '10.1.56.96', alias: 'L2ATC96' } },
    { id: '2', type: 'pcNode', position: { x: 50, y: 95 }, data: { label: 'PC-21', sub: '10.1.56.95', alias: 'L2ATC95' } },
    { id: '3', type: 'pcNode', position: { x: 300, y: 100 }, data: { label: 'PC-11', sub: '10.1.56.87', alias: 'L2ATC87' } },
    { id: '4', type: 'pcNode', position: { x: 300, y: 175 }, data: { label: 'PC-12', sub: '10.1.56.88', alias: 'L2ATC88' } },
    { id: '5', type: 'pcNode', position: { x: 300, y: 245 }, data: { label: 'PC-13', sub: '10.1.56.89', alias: 'L2ATC89' } },
    { id: '6', type: 'pcNode', position: { x: 300, y: 315 }, data: { label: 'PC-14', sub: '10.1.56.90', alias: 'L2ATC90' } },
    { id: '7', type: 'pcNode', position: { x: 300, y: 385 }, data: { label: 'PC-15', sub: '10.1.56.77', alias: 'L2ATC77' } },
    { id: '8', type: 'pcNode', position: { x: 300, y: 455 }, data: { label: 'PC-16', sub: '10.1.56.78', alias: 'L2ATC78' } },
    { id: '9', type: 'pcNode', position: { x: 300, y: 525 }, data: { label: 'PC-17', sub: '10.1.56.75', alias: 'L2ATC75' } },
    { id: '10', type: 'pcNode', position: { x: 300, y: 595 }, data: { label: 'PC-18', sub: '10.1.56.76', alias: 'L2ATC76' } },
    { id: '11', type: 'pcNode', position: { x: 300, y: 665 }, data: { label: 'PC-19', sub: '10.1.56.93', alias: 'L2ATC93' } },
    { id: '12', type: 'pcNode', position: { x: 300, y: 735 }, data: { label: 'PC-20', sub: '10.1.56.94', alias: 'L2ATC94' } },
    { id: '13', type: 'pcNode', position: { x: 450, y: 100 }, data: { label: 'PC-10', sub: '10.1.56.81', alias: 'L2ATC81' } },
    { id: '14', type: 'pcNode', position: { x: 450, y: 175 }, data: { label: 'PC-09', sub: '10.1.56.82', alias: 'L2ATC82' } },
    { id: '15', type: 'pcNode', position: { x: 450, y: 245 }, data: { label: 'PC-08', sub: '10.1.56.79', alias: 'L2ATC79' } },
    { id: '16', type: 'pcNode', position: { x: 450, y: 315 }, data: { label: 'PC-07', sub: '10.1.56.80', alias: 'L2ATC80' } },
    { id: '17', type: 'pcNode', position: { x: 450, y: 385 }, data: { label: 'PC-06', sub: '10.1.56.83', alias: 'L2ATC83' } },
    { id: '18', type: 'pcNode', position: { x: 450, y: 455 }, data: { label: 'PC-05', sub: '10.1.56.84', alias: 'L2ATC84' } },
    { id: '19', type: 'pcNode', position: { x: 450, y: 525 }, data: { label: 'PC-04', sub: '10.1.56.85', alias: 'L2ATC85' } },
    { id: '20', type: 'pcNode', position: { x: 450, y: 595 }, data: { label: 'PC-03', sub: '10.1.56.86', alias: 'L2ATC86' } },
    { id: '21', type: 'pcNode', position: { x: 450, y: 665 }, data: { label: 'PC-02', sub: '10.1.56.92', alias: 'L2ATC92' } },
    { id: '22', type: 'pcNode', position: { x: 450, y: 735 }, data: { label: 'PC-01', sub: '10.1.56.91', alias: 'L2ATC91' } },
  ];

  const initialEdges = [
    { id: 'e-long', source: 'prof', sourceHandle: 'h-t3', target: '1', type: 'animEdge' },
    { id: 'e-mid', source: 'prof', sourceHandle: 'h-t2', target: '3', type: 'animEdge', data: { offset: 60 } },
    { id: 'e-short', source: 'prof', sourceHandle: 'h-t1', target: '13', type: 'animEdge', data: { offset: 30 } },
  ];

  for (let i = 1; i < 2; i++) initialEdges.push({ id: `line-${i}-${i+1}`, source: `${i}`, target: `${i+1}`, style: { stroke: '#93BD22', strokeWidth: 1.5, opacity: showEffects ? 0.4 : 0 }, type: 'straight', zIndex: -1 });
  for (let i = 3; i < 12; i++) initialEdges.push({ id: `line-${i}-${i+1}`, source: `${i}`, target: `${i+1}`, style: { stroke: '#93BD22', strokeWidth: 1.5, opacity: showEffects ? 0.4 : 0 }, type: 'straight', zIndex: -1 });
  for (let i = 13; i < 22; i++) initialEdges.push({ id: `line-${i}-${i+1}`, source: `${i}`, target: `${i+1}`, style: { stroke: '#93BD22', strokeWidth: 1.5, opacity: showEffects ? 0.4 : 0 }, type: 'straight', zIndex: -1 });

  const nodesWithStyle = initialNodes.map(node => ({ ...node, zIndex: 1, data: { ...node.data, showEffects } }));
  const edgesWithStyle = initialEdges.map(edge => ({ ...edge, data: { ...edge.data, showEffects } }));

  return (
    <div id="aula-container-l2" style={{ width: '100%', height: '1000px', background: '#0a0a0a', border: '1px solid #93BD22', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => setShowEffects(!showEffects)} className={!showEffects ? "btn-pulsador-l2 heartbeat-active" : "btn-pulsador-l2 btn-activo"} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #93BD22', background: showEffects ? '#93BD22' : 'transparent', cursor: 'pointer', transition: 'all 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: showEffects ? '#000' : '#93BD22', transition: 'all 0.3s' }} />
        </button>
        <span style={{ color: '#93BD22', fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold' }}>{showEffects ? 'Desactivar' : 'Activar'}</span>
      </div>
      <div style={{ position: 'absolute', bottom: '2px', left: '60px', color: '#93BD22', fontSize: '32px', fontWeight: '300', opacity: 0.6, zIndex: 10, letterSpacing: '2px' }}>L2-D-ATC</div>
      <AccesoIndicador />
      <style>{`
        .react-flow__controls { left: 20px; bottom: 20px; border: 1px solid #93BD22 !important; background: rgba(0,0,0,0.5) !important; }
        .react-flow__controls-button { border-bottom: 1px solid #93BD22 !important; background: transparent !important; }
        .react-flow__controls-button svg { fill: #93BD22 !important; }
        @keyframes heartbeat { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .heartbeat-active { animation: heartbeat 1.5s infinite ease-in-out; }
        .btn-activo { box-shadow: 0 0 15px #93BD22; }
        .btn-pulsador-l2:hover { box-shadow: 0 0 25px #93BD22 !important; transform: scale(1.15) !important; animation: none; }
        .node-pulse-final { animation: pulse 2s infinite ease-out; }
        .node-pulse-red { animation: pulseRed 2s infinite ease-out; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(147, 189, 34, 0.6); } 70% { box-shadow: 0 0 0 10px rgba(147, 189, 34, 0); } 100% { box-shadow: 0 0 0 0 rgba(147, 189, 34, 0); } }
        @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(164, 1, 51, 0.6); } 70% { box-shadow: 0 0 0 10px rgba(164, 1, 51, 0); } 100% { box-shadow: 0 0 0 0 rgba(164, 1, 51, 0); } }
        .pc-inactive-cross::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top right, transparent 46%, #A40133 49%, #A40133 51%, transparent 54%), linear-gradient(to top left, transparent 46%, #A40133 49%, #A40133 51%, transparent 54%); opacity: 0.35; }
        .pc-inactive-cross-static::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top right, transparent 46%, #A40133 49%, #A40133 51%, transparent 54%), linear-gradient(to top left, transparent 46%, #A40133 49%, #A40133 51%, transparent 54%); opacity: 0.2; }
        .pc-text-container { display: flex; flex-direction: column; text-align: center; }
        .pc-label-l2 { font-size: 16px; font-weight: bold; color: white; }
        .pc-sub-l2 { font-size: 11px; font-weight: bold; }
        .react-flow__handle { opacity: 0 !important; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
      <ReactFlow nodes={nodesWithStyle} edges={edgesWithStyle} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView nodesDraggable={false} proOptions={{ hideAttribution: true }}>
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}