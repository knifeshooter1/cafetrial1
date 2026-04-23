import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 3D Models (Simplified abstract representations)
function CoffeeCup({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current && hovered) {
      ref.current.rotation.y += 0.05;
    } else if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });
  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 1.2, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}

function Croissant({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current && hovered) {
      ref.current.rotation.x += 0.05;
      ref.current.rotation.y += 0.05;
    } else if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={ref} castShadow receiveShadow rotation={[Math.PI/2, 0, 0]}>
      <torusGeometry args={[0.5, 0.25, 16, 32, Math.PI]} />
      <meshStandardMaterial color="#d4b483" roughness={0.6} />
    </mesh>
  );
}

function Donut({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current && hovered) {
      ref.current.rotation.x += 0.05;
      ref.current.rotation.z += 0.05;
    } else if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={ref} castShadow receiveShadow rotation={[Math.PI/4, 0, 0]}>
      <torusGeometry args={[0.5, 0.25, 32, 64]} />
      <meshStandardMaterial color="#fca311" roughness={0.4} />
    </mesh>
  );
}

const menuItems = [
  { id: 1, name: 'House Espresso', price: 150, ingredients: '100% Arabica, Notes of Caramel', Model: CoffeeCup },
  { id: 2, name: 'Butter Croissant', price: 180, ingredients: 'French Butter, Flour, Yeast', Model: Croissant },
  { id: 3, name: 'Glazed Donut', price: 120, ingredients: 'Flour, Sugar, Vanilla Glaze', Model: Donut },
  { id: 4, name: 'Mocha Latte', price: 240, ingredients: 'Espresso, Cocoa, Steamed Milk', Model: CoffeeCup }, // Reusing model for demo
  { id: 5, name: 'Almond Croissant', price: 220, ingredients: 'Croissant, Frangipane, Almonds', Model: Croissant },
  { id: 6, name: 'Chocolate Donut', price: 140, ingredients: 'Flour, Cocoa Glaze, Sprinkles', Model: Donut },
];

export default function InteractiveMenuCards() {
  return (
    <div style={{ padding: '6rem 2rem', background: 'var(--bg-offwhite)', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '4rem' }}>Interactive Menu</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {menuItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function MenuCard({ item }: { item: typeof menuItems[0] }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div 
      style={{ 
        height: '350px', 
        background: '#fff', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      whileHover={{ y: -5 }}
    >
      {/* 3D Viewport */}
      <div style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }}>
        <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} castShadow />
          <item.Model hovered={hovered} />
        </Canvas>
      </div>

      {/* Info Overlay */}
      <AnimatePresence>
        {clicked ? (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'absolute', inset: 0, background: 'rgba(44, 44, 44, 0.95)', color: '#fff',
              padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>{item.name}</h3>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-sage)', marginBottom: '1rem', fontWeight: 600 }}>₹{item.price}</div>
            <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: 1.5 }}>{item.ingredients}</p>
            <div style={{ marginTop: 'auto', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>Click to close</div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
          >
            <span style={{ fontWeight: 500, letterSpacing: '0.05em' }}>{item.name}</span>
            <span style={{ fontSize: '0.8rem', background: 'var(--accent-sage)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 600 }}>₹{item.price}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
