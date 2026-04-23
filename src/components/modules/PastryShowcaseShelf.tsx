import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useCart } from '../CartContext';

function CroissantModel() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]} scale={1.2}>
      {/* Main body arc */}
      <mesh>
        <torusGeometry args={[0.3, 0.2, 16, 32, Math.PI * 0.8]} />
        <meshStandardMaterial color="#E6B873" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.05]} scale={0.9}>
        <torusGeometry args={[0.3, 0.2, 16, 32, Math.PI * 0.8]} />
        <meshStandardMaterial color="#D9A05B" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.05]} scale={0.9}>
        <torusGeometry args={[0.3, 0.2, 16, 32, Math.PI * 0.8]} />
        <meshStandardMaterial color="#D9A05B" roughness={0.6} />
      </mesh>
    </group>
  );
}

function MuffinModel() {
  return (
    <group scale={1.2}>
      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.25, 0.18, 0.3, 32]} />
        <meshStandardMaterial color="#5C3A21" roughness={0.9} />
      </mesh>
      {/* Dome */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.28, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8C5A35" roughness={0.8} />
      </mesh>
      {/* Blueberries */}
      <mesh position={[0.1, 0.2, 0.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2B3A42" />
      </mesh>
      <mesh position={[-0.1, 0.15, 0.15]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2B3A42" />
      </mesh>
      <mesh position={[0.05, 0.18, -0.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2B3A42" />
      </mesh>
    </group>
  );
}

function SandwichModel() {
  return (
    <group scale={1.5} rotation={[0.2, 0.5, 0]}>
      {/* Bread bottom */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.9} />
      </mesh>
      {/* Lettuce */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.52, 0.02, 0.52]} />
        <meshStandardMaterial color="#7CB342" roughness={0.8} />
      </mesh>
      {/* Meat/Filling */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.48, 0.08, 0.48]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {/* Bread middle */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.5]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.9} />
      </mesh>
      {/* Tomato */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.45, 0.04, 0.45]} />
        <meshStandardMaterial color="#E53935" roughness={0.6} />
      </mesh>
      {/* Bread top */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.9} />
      </mesh>
    </group>
  );
}

function DonutModel() {
  return (
    <group scale={1.2} rotation={[Math.PI / 4, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.25, 0.12, 32, 64]} />
        <meshStandardMaterial color="#F3A65A" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[0.25, 0.13, 16, 64]} />
        <meshStandardMaterial color="#FFC0CB" roughness={0.3} />
      </mesh>
    </group>
  );
}

function SamosaModel() {
  return (
    <group scale={1.5} position={[0, -0.1, 0]}>
      <mesh>
        <coneGeometry args={[0.3, 0.4, 3]} />
        <meshStandardMaterial color="#D48A45" roughness={0.8} />
      </mesh>
    </group>
  );
}

const items = [
  { id: 101, name: 'Butter Croissant', price: 180, Model: CroissantModel },
  { id: 102, name: 'Blueberry Muffin', price: 160, Model: MuffinModel },
  { id: 103, name: 'Club Sandwich', price: 215, Model: SandwichModel },
  { id: 104, name: 'Glazed Donut', price: 120, Model: DonutModel },
  { id: 105, name: 'Spiced Samosa', price: 80, Model: SamosaModel }
];

function ItemWrapper({ item, isHovered, position }: { item: typeof items[0], isHovered: boolean, position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isHovered) {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1] + 0.2, 0.1);
      } else {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1], 0.1);
      }
    }
  });

  return (
    <group ref={ref} position={position}>
      <item.Model />
      {/* Add soft glow on hover */}
      {isHovered && (
        <pointLight distance={2} intensity={0.5} color="#d4b483" />
      )}
    </group>
  );
}

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
                onClick={(e) => { 
                  e.stopPropagation(); 
                  addToCart({ id: item.id, name: item.name, price: item.price });
                }}
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
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        
        {/* Shelf */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[20, 0.1, 3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        <group position={[0, 0, 0]}>
          {items.map((item, idx) => {
            const xPos = (idx - 2) * 2.5; 
            return (
              <ItemWrapper key={item.id} item={item} position={[xPos, -0.3, 0]} isHovered={hoveredIdx === idx} />
            );
          })}
        </group>

        <ContactShadows position={[0, -0.9, 0]} opacity={0.8} scale={20} blur={2} far={2} />
        <Environment preset="city" />
      </Canvas>

    </div>
  );
}
