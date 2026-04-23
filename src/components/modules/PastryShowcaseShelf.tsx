import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext.tsx';
import { CroissantModel, MuffinModel, SandwichModel, DonutModel, SamosaModel } from './FoodModels.tsx';

const items = [
  { id: 'croissant', name: 'Butter Croissant', price: 180, Model: CroissantModel },
  { id: 'muffin', name: 'Blueberry Muffin', price: 160, Model: MuffinModel },
  { id: 'sandwich', name: 'Club Sandwich', price: 215, Model: SandwichModel },
  { id: 'donut', name: 'Glazed Donut', price: 120, Model: DonutModel, flavor: 'glazed' as 'glazed' | 'chocolate' },
  { id: 'samosa', name: 'Spiced Samosa', price: 80, Model: SamosaModel }
];

export default function PastryShowcaseShelf() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { addToCart } = useCart();

  return (
    <div style={{ height: '80vh', background: 'var(--text-charcoal)', position: 'relative', overflow: 'hidden', fontFamily: 'var(--font-primary)' }}>
      
      {/* Header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', zIndex: 10, color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, margin: 0 }}>Fresh from the Oven</h2>
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
                onClick={(e) => { e.stopPropagation(); addToCart({ id: item.id, name: item.name, price: item.price }); }}
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
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
        
        {/* Shelf */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[20, 0.1, 3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        <group position={[0, 0, 0]}>
          {items.map((item, idx) => {
            const xPos = (idx - 2) * 2.5; 
            const isHovered = hoveredIdx === idx;
            // The models themselves handle rotation logic, we just pass position and hover state
            return (
              <item.Model key={item.id} position={[xPos, isHovered ? -0.2 : -0.5, 0]} hovered={isHovered} flavor={item.flavor} />
            );
          })}
        </group>

        <ContactShadows position={[0, -0.9, 0]} opacity={0.8} scale={20} blur={2} far={2} />
        <Environment preset="city" />
      </Canvas>

    </div>
  );
}
