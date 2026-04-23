import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const items = [
  { id: 1, name: 'Butter Croissant', price: 180, color: '#d4b483' },
  { id: 2, name: 'Blueberry Muffin', price: 160, color: '#8b5a2b' },
  { id: 3, name: 'Club Sandwich', price: 250, color: '#f5deb3' },
  { id: 4, name: 'Glazed Donut', price: 120, color: '#fca311' },
  { id: 5, name: 'Spiced Samosa', price: 80, color: '#cd853f' }
];

function ItemModel({ color, isHovered, position }: { color: string, isHovered: boolean, position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isHovered) {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1] + 0.2, 0.1);
        ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1.2, 0.1));
      } else {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1], 0.1);
        ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
      }
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      {/* Abstract gem/dodecahedron to represent food beautifully */}
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.1}
        emissive={color}
        emissiveIntensity={isHovered ? 0.4 : 0} 
      />
    </mesh>
  );
}

export default function PastryShowcaseShelf() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  return (
    <div style={{ height: '80vh', background: 'var(--text-charcoal)', position: 'relative', overflow: 'hidden', fontFamily: 'var(--font-primary)' }}>
      
      {/* Header & Cart */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', zIndex: 10, color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, margin: 0 }}>Fresh from the Oven</h2>
        <div style={{ background: 'var(--accent-sage)', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem' }}>
          Cart ({cartCount})
        </div>
      </div>

      {/* HTML Overlay for interactions */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', overflowX: 'auto', padding: '0 5vw', gap: '4rem' }}>
        {items.map((item, idx) => (
          <div 
            key={item.id}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{ width: '200px', height: '400px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '4rem', cursor: 'pointer' }}
          >
            <motion.div 
              animate={{ opacity: hoveredIdx === idx ? 1 : 0.5, y: hoveredIdx === idx ? 0 : 10 }}
              style={{ textAlign: 'center', color: '#fff' }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 500, margin: '0 0 0.5rem 0' }}>{item.name}</h3>
              <div style={{ color: 'var(--accent-sage)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>₹{item.price}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); setCartCount(c => c + 1); }}
                style={{ opacity: hoveredIdx === idx ? 1 : 0, background: 'rgba(255,255,255,0.1)', border: '1px solid #fff', color: '#fff', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Add to Cart
              </button>
            </motion.div>
          </div>
        ))}
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* Shelf */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[20, 0.1, 3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        <group position={[0, 0, 0]}>
          {items.map((item, idx) => {
            // Calculate position to match HTML overlay layout roughly
            // Center is 0. 5 items -> -2, -1, 0, 1, 2
            const xPos = (idx - 2) * 2.5; 
            return (
              <ItemModel key={item.id} position={[xPos, -0.5, 0]} color={item.color} isHovered={hoveredIdx === idx} />
            );
          })}
        </group>

        <ContactShadows position={[0, -0.9, 0]} opacity={0.8} scale={20} blur={2} far={2} />
        <Environment preset="city" />
      </Canvas>

    </div>
  );
}
