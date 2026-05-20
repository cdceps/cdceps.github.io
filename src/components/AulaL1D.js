import React, { useState, useEffect } from 'react';
import { ReactFlow, Controls, BaseEdge, getSmoothStepPath, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 1. COMPONENTE ACCESO AL AULA (VERDE EPS)
const AccesoIndicador = () => (
  <div style={{
    position: 'absolute', bottom: '60px', right: '25px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    color: '#93BD22', zIndex: 10, pointerEvents: 'none',
    fontFamily: 'monospace'
  }}>
    <div style={{ fontSize: '11px', letterSpacing: '2px', marginBottom: '2px', opacity: 0.9, fontFamily: 'sans-serif', fontWeight: 'bold' }}>ACCESO AL AULA</div>
    <div className="arrow-animated" style={{ display: 'flex', alignItems: 'center', lineHeight: 1, fontSize: '35px', fontWeight: 'bold', letterSpacing: '-6px' }}>&lt;&lt;&lt;&lt;</div>
    <style>{`
      .arrow-animated { animation: arrowPulse 1.5s infinite ease-in-out; text-shadow: 0 0 10px rgba(147, 189, 34, 0.5); }
      @keyframes arrowPulse { 0%, 100% { opacity: 0.3; transform: translateX(0); } 50% { opacity: 1; transform: translateX(-10px); } }
    `}</style>
  </div>
);

// 2. TERMINAL POWERSHELL (VERDE EPS)
const PowerShellConsole = ({ visible }) => {
  const commands = ["Ejecutando Windows Terminal...", "PowerShell 7 activado", "Lanzando comando remoto 🚀"];
  const [text, setText] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

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
      position: 'absolute', top: '-15px', right: '165px', width: '210px',
      background: 'rgba(10, 10, 15, 0.9)', border: '1px solid #93BD22', borderRadius: '4px',
      padding: '10px', fontSize: '11px', fontFamily: 'monospace', color: '#fff',
      boxShadow: '0 0 20px rgba(147, 189, 34, 0.2)', zIndex: 20, textAlign: 'left'
    }}>
      <div style={{ color: '#93BD22', fontSize: '9px', marginBottom: '5px', opacity: 0.7 }}>ADMIN: POWERSHELL</div>
      {text}<span style={{ animation: 'blink 1s infinite', color: '#93BD22' }}>_</span>
    </div>
  );
};

// 3. NODO PROFESOR (GRADIENTE VERDE)
const ProfesorNode = ({ data }) => (
  <div style={{ 
    background: 'linear-gradient(135deg, rgba(147, 189, 34, 0.25) 0%, rgba(10, 10, 10, 0.9) 100%)', 
    border: '2px solid #93BD22', 
    padding: '15px 10px', borderRadius: '6px', width: '150px', textAlign: 'center', color: '#fff', position: 'relative' 
  }}>
    <PowerShellConsole visible={data.showEffects} />
    <div style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '1px' }}>{data.label}</div>
    <Handle type="source" position={Position.Bottom} id="h-izq" style={{ left: '15%', opacity: 0 }} />
    <Handle type="source" position={Position.Bottom} id="h-centro" style={{ left: '45%', opacity: 0 }} />
    <Handle type="source" position={Position.Bottom} id="h-der" style={{ left: '85%', opacity: 0 }} />
  </div>
);

// 4. LÍNEA ANIMADA (VERDE EPS)
const ColumnAnimatedEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const [edgePath] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20 });
  if (!data?.showEffects) return null;
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: '#93BD22', strokeWidth: 2, opacity: 0.3 }} />
      <circle r="6" fill="#fff" style={{ filter: 'drop-shadow(0px 0px 5px #93BD22)' }}>
        <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
};

// 5. CONTENIDO PC (VERDE EPS)
const PCNodeContent = ({ id, data }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isCornerNode = id === '1';

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'crosshair' }}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', textAlign: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#fff' }}>{data.label}</span>
        <span style={{ fontSize: '9px', color: '#93BD22', marginTop: '1px', fontWeight: 'bold' }}>{data.alias ? data.alias : data.sub}</span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      {isHovered && (
        <div style={{
          position: 'absolute', bottom: '40px', 
          left: isCornerNode ? '-15%' : '50%', 
          transform: isCornerNode ? 'translateX(0)' : 'translateX(-50%)',
          width: '145px', padding: '10px', background: 'rgba(5, 5, 15, 0.95)',
          border: '1px solid #93BD22', borderRadius: '4px', color: '#fff',
          fontSize: '11px', zIndex: 1000, boxShadow: '0 0 15px rgba(147, 189, 34, 0.4)', textAlign: 'left'
        }}>
          <div><strong>IP:</strong> {data.sub}</div>
          <div style={{ color: '#00ff00', fontSize: '10px', fontWeight: 'bold', borderTop: '1px solid rgba(147, 189, 34, 0.3)', marginTop: '4px', paddingTop: '4px' }}>● SISTEMA ACTIVO</div>
          <div style={{ 
            position: 'absolute', bottom: '-6px', 
            left: isCornerNode ? '40%' : '50%', 
            transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #93BD22' 
          }} />
        </div>
      )}
    </div>
  );
};

const nodeTypes = { profNode: ProfesorNode };
const edgeTypes = { animColumna: ColumnAnimatedEdge };

// 6. COMPONENTE PRINCIPAL
export default function AulaL1D() {
  const [showEffects, setShowEffects] = useState(false);

  const initialNodes = [
    { id: 'prof', type: 'profNode', data: { label: 'PROFESOR' }, position: { x: 450, y: 0 } },
    { id: '1', data: { label: 'PC-10', sub: '10.1.56.61', alias: 'L1ATC61' }, position: { x: 80, y: 80 } },
    { id: '2', data: { label: 'PC-09', sub: '10.1.56.57', alias: 'L1ATC57' }, position: { x: 80, y: 135 } },
    { id: '3', data: { label: 'PC-08', sub: '10.1.56.68', alias: 'L1ATC68' }, position: { x: 80, y: 190 } },
    { id: '4', data: { label: 'PC-07', sub: '10.1.56.56', alias: 'L1ATC56' }, position: { x: 80, y: 245 } },
    { id: '5', data: { label: 'PC-06', sub: '10.1.56.58', alias: 'L1ATC58' }, position: { x: 80, y: 300 } },
    { id: '6', data: { label: 'PC-05', sub: '10.1.56.62', alias: 'L1ATC62' }, position: { x: 80, y: 355 } },
    { id: '7', data: { label: 'PC-04', sub: '10.1.56.64', alias: 'L1ATC64' }, position: { x: 80, y: 410 } },
    { id: '8', data: { label: 'PC-03', sub: '10.1.56.69', alias: 'L1ATC69' }, position: { x: 80, y: 465 } },
    { id: '9', data: { label: 'PC-02', sub: '10.1.56.55', alias: 'L1ATC55' }, position: { x: 80, y: 520 } },
    { id: '10', data: { label: 'PC-01', sub: '10.1.56.67', alias: 'L1ATC67' }, position: { x: 80, y: 575 } },
    { id: '11', data: { label: 'PC-14', sub: '10.1.56.71', alias: 'L1ATC71' }, position: { x: 330, y: 300 } },
    { id: '12', data: { label: 'PC-13', sub: '10.1.56.73', alias: 'L1ATC73' }, position: { x: 330, y: 355 } },
    { id: '13', data: { label: 'PC-12', sub: '10.1.56.72', alias: 'L1ATC72' }, position: { x: 330, y: 410 } },
    { id: '14', data: { label: 'PC-11', sub: '10.1.56.70', alias: 'L1ATC70' }, position: { x: 330, y: 465 } },
    { id: '15', data: { label: 'PC-20', sub: '10.1.56.54', alias: 'L1ATC54' }, position: { x: 580, y: 150 } },
    { id: '16', data: { label: 'PC-19', sub: '10.1.56.59', alias: 'L1ATC59' }, position: { x: 580, y: 205 } },
    { id: '17', data: { label: 'PC-18', sub: '10.1.56.66', alias: 'L1ATC66' }, position: { x: 580, y: 260 } },
    { id: '18', data: { label: 'PC-17', sub: '10.1.56.63', alias: 'L1ATC63' }, position: { x: 580, y: 315 } },
    { id: '19', data: { label: 'PC-16', sub: '10.1.56.65', alias: 'L1ATC65' }, position: { x: 580, y: 370 } },
    { id: '20', data: { label: 'PC-15', sub: '10.1.56.60', alias: 'L1ATC60' }, position: { x: 580, y: 425 } },
  ];

  const initialEdges = [
    { id: 'e-izq', source: 'prof', sourceHandle: 'h-izq', target: '1', type: 'animColumna', data: { showEffects } },
    { id: 'e-centro', source: 'prof', sourceHandle: 'h-centro', target: '11', type: 'animColumna', data: { showEffects } },
    { id: 'e-der', source: 'prof', sourceHandle: 'h-der', target: '15', type: 'animColumna', data: { showEffects } },
  ];

  const addLines = (start, end, prefix) => {
    for (let i = start; i < end; i++) {
      initialEdges.push({
        id: `line-${prefix}-${i}`, source: `${i}`, target: `${i+1}`,
        style: { stroke: '#93BD22', strokeWidth: 1.5, opacity: showEffects ? 0.3 : 0 },
        type: 'straight', zIndex: -1 
      });
    }
  };
  addLines(1, 10, 'izq');
  addLines(11, 14, 'centro');
  addLines(15, 20, 'der');

  const nodesWithStyle = initialNodes.map(node => ({
    ...node,
    data: { 
      ...node.data, 
      label: node.type === 'profNode' ? node.data.label : <PCNodeContent id={node.id} data={node.data} />, 
      showEffects 
    },
    zIndex: 1, 
    style: node.type === 'profNode' ? {} : {
      background: 'linear-gradient(135deg, rgba(147, 189, 34, 0.1) 0%, rgba(5, 5, 5, 0.95) 100%)', 
      border: '1px solid #93BD22', borderRadius: '6px', 
      width: 100, height: 45, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: showEffects ? 'pulse 2s infinite ease-out' : 'none'
    }
  }));

  return (
    <div style={{ width: '100%', height: '820px', background: '#0a0a0a', border: '1px solid #93BD22', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
      
      {/* ACTIVADOR DINÁMICO IZQUIERDO */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={() => setShowEffects(!showEffects)}
          className={!showEffects ? "btn-pulsador-l2 heartbeat-active" : "btn-pulsador-l2 btn-activo"}
          style={{
            width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #93BD22',
            background: showEffects ? '#93BD22' : 'transparent',
            cursor: 'pointer', transition: 'all 0.4s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: showEffects ? '#000' : '#93BD22', transition: '0.3s' }} />
        </button>
        <span style={{ color: '#93BD22', fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold' }}>
          {showEffects ? 'Desactivar' : 'Activar'}
        </span>
      </div>

      <div style={{ position: 'absolute', bottom: '10px', right: '25px', color: '#93BD22', fontSize: '32px', fontWeight: '300', opacity: 0.5 }}>L1-D-ATC</div>
      <AccesoIndicador />

      <style>{`
        @keyframes heartbeat { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .heartbeat-active { animation: heartbeat 1.5s infinite ease-in-out; }
        .btn-activo { box-shadow: 0 0 15px #93BD22; }
        .btn-pulsador-l2:hover { box-shadow: 0 0 25px #93BD22 !important; transform: scale(1.15) !important; animation: none; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(147, 189, 34, 0.6); } 70% { box-shadow: 0 0 0 10px rgba(147, 189, 34, 0); } 100% { box-shadow: 0 0 0 0 rgba(147, 189, 34, 0); } }
        .react-flow__handle { opacity: 0 !important; }
        .react-flow__controls { left: 20px; bottom: 20px; border: 1px solid #93BD22 !important; background: rgba(0,0,0,0.5) !important; }
        .react-flow__controls-button { border-bottom: 1px solid #93BD22 !important; background: transparent !important; }
        .react-flow__controls-button svg { fill: #93BD22 !important; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      <ReactFlow 
        nodes={nodesWithStyle} 
        edges={initialEdges} 
        nodeTypes={nodeTypes} 
        edgeTypes={edgeTypes} 
        fitView 
        nodesDraggable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}