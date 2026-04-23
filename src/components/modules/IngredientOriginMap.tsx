import { motion } from 'framer-motion';
import { useState } from 'react';

const origins = [
  { id: 'chikmagalur', name: 'Chikmagalur', x: 30, y: 70, ingredient: 'Arabica Beans', story: 'High-altitude, shade-grown beans with subtle notes of caramel.' },
  { id: 'coorg', name: 'Coorg', x: 32, y: 75, ingredient: 'Robusta Beans', story: 'Bold and intense, giving our espresso its rich crema.' },
  { id: 'kerala', name: 'Kerala', x: 35, y: 85, ingredient: 'Vanilla & Spices', story: 'Hand-pollinated vanilla pods and aromatic cinnamon.' },
  { id: 'kashmir', name: 'Kashmir', x: 25, y: 15, ingredient: 'Saffron', story: 'Rare strands used exclusively in our signature Saffron Latte.' }
];

export default function IngredientOriginMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  // A very simplified SVG path vaguely resembling India for illustrative purposes
  const indiaPath = "M 30,10 L 40,20 L 60,35 L 75,40 L 70,55 L 60,70 L 45,90 L 35,95 L 30,80 L 20,60 L 15,40 Z";

  return (
    <div style={{ padding: '6rem 2rem', background: '#2C2C2C', color: '#fff', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '1rem' }}>Sourced With Care</h2>
      <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '4rem' }}>Hover over the map to discover the origins of our ingredients.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Map Container */}
        <div style={{ width: '400px', height: '500px', position: 'relative' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Outline */}
            <path d={indiaPath} fill="none" stroke="#555" strokeWidth="0.5" strokeDasharray="1 1" />
            
            {/* Origin Points and Rings */}
            {origins.map((origin) => (
              <g key={origin.id} 
                onMouseEnter={() => setHovered(origin.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Dotted Line to center (simulated hub) */}
                <motion.line 
                  x1={origin.x} y1={origin.y} x2={40} y2={50} 
                  stroke="var(--accent-sage)" 
                  strokeWidth="0.3" 
                  strokeDasharray="1 1"
                  animate={{ strokeDashoffset: [0, -10] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  opacity={hovered === origin.id ? 1 : 0.3}
                />

                {/* Pulsing Ring */}
                <motion.circle 
                  cx={origin.x} cy={origin.y} r={1.5} 
                  fill="none" stroke="var(--accent-sage)" strokeWidth="0.2"
                  animate={{ r: [1.5, 4], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                
                {/* Core Dot */}
                <circle cx={origin.x} cy={origin.y} r={1} fill={hovered === origin.id ? '#fff' : 'var(--accent-sage)'} />
              </g>
            ))}
          </svg>
        </div>

        {/* Info Panel */}
        <div style={{ flex: '1 1 300px', minHeight: '200px' }}>
          {hovered ? (
            <motion.div 
              key={hovered}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-sage)', marginBottom: '0.5rem', fontWeight: 500 }}>
                {origins.find(o => o.id === hovered)?.name}
              </h3>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 400 }}>
                {origins.find(o => o.id === hovered)?.ingredient}
              </h4>
              <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                {origins.find(o => o.id === hovered)?.story}
              </p>
            </motion.div>
          ) : (
            <div style={{ padding: '2rem', color: '#666', border: '1px dashed #444', borderRadius: '12px', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              Select a region on the map to view details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
