import { motion } from 'framer-motion';
import { useState } from 'react';

// Simplified SVG Map of India (conceptual placeholder path)
// We will use a stylized bounding box and some pulsing dots at key locations
const locations = [
  { id: 'chikmagalur', x: 35, y: 70, name: 'Chikmagalur', info: 'Our Arabica beans are shade-grown here at 4,500ft.' },
  { id: 'kerala', x: 40, y: 85, name: 'Wayanad, Kerala', info: 'Sourcing organic spices for our signature Chai.' },
  { id: 'assam', x: 85, y: 40, name: 'Assam', info: 'The robust base for our strong cold brews.' }
];

export default function OriginMap() {
  const [hoveredLocation, setHoveredLocation] = useState<typeof locations[0] | null>(null);

  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#2C2C2C', color: '#fff', borderRadius: '16px', margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 300 }}>Our Roots in India</h2>
      <p style={{ color: '#aaa', marginBottom: '3rem', maxWidth: '600px', textAlign: 'center' }}>
        Trace the journey of our ingredients from the finest estates across the subcontinent straight to your cup.
      </p>

      <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '4/5', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Placeholder SVG map outline */}
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
          <path d="M50 10 L80 40 L90 60 L60 90 L40 90 L30 70 L20 40 Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        </svg>

        {locations.map((loc) => (
          <div
            key={loc.id}
            onMouseEnter={() => setHoveredLocation(loc)}
            onMouseLeave={() => setHoveredLocation(null)}
            style={{
              position: 'absolute',
              left: `${loc.x}%`,
              top: `${loc.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer'
            }}
          >
            {/* Pulse animation */}
            <motion.div
              animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: -10, backgroundColor: '#A7B6A1', borderRadius: '50%' }}
            />
            {/* Core dot */}
            <div style={{ width: '12px', height: '12px', backgroundColor: '#A7B6A1', borderRadius: '50%', position: 'relative', zIndex: 2 }} />
          </div>
        ))}

        {/* Info Card */}
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#fff',
              color: '#2C2C2C',
              padding: '1rem',
              borderRadius: '8px',
              width: '80%',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>{hoveredLocation.name}</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{hoveredLocation.info}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
