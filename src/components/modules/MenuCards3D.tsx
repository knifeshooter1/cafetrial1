import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Mock abstract 3D objects for menu items
function CupModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += hovered ? delta * 2 : delta * 0.5;
  });
  return (
    <group ref={ref}>
      <mesh position={[0,-0.5,0]}>
        <cylinderGeometry args={[0.8, 0.6, 1.5, 32]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>
      <mesh position={[0.9, 0, 0]} rotation={[0,0,Math.PI/2]}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>
    </group>
  );
}

function DonutModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += hovered ? delta * 3 : delta;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI/2, 0, 0]}>
      <torusGeometry args={[0.8, 0.4, 32, 64]} />
      <meshStandardMaterial color="#ffb6c1" roughness={0.4} />
    </mesh>
  );
}

function CroissantModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? delta * 2 : delta * 0.5;
      ref.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      {/* Abstract croissant shape using a knot or bent tube */}
      <torusKnotGeometry args={[0.6, 0.25, 64, 8, 2, 3]} />
      <meshStandardMaterial color="#deb887" roughness={0.7} />
    </mesh>
  );
}

const menuItems = [
  { id: 1, name: 'House Latte', price: '₹220', ing: 'Espresso, Steamed Milk', Model: CupModel },
  { id: 2, name: 'Strawberry Donut', price: '₹150', ing: 'Brioche dough, Strawberry Glaze', Model: DonutModel },
  { id: 3, name: 'Butter Croissant', price: '₹180', ing: 'French Butter, Flour, Yeast', Model: CroissantModel },
];

export default function MenuCards3D() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#F9F9F9' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 300 }}>Interactive Menu</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {menuItems.map((item) => {
          const isClicked = activeId === item.id;
          return (
            <MenuCard 
              key={item.id} 
              item={item} 
              isClicked={isClicked} 
              onClick={() => setActiveId(isClicked ? null : item.id)} 
            />
          );
        })}
      </div>
    </section>
  );
}

function MenuCard({ item, isClicked, onClick }: { item: any, isClicked: boolean, onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        height: '400px', 
        backgroundColor: '#fff', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        cursor: 'pointer',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease',
        position: 'relative'
      }}
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <item.Model hovered={hovered} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <AnimatePresence>
        {isClicked && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              backgroundColor: 'rgba(44, 44, 44, 0.95)', 
              color: '#fff', 
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>{item.name}</h3>
            <p style={{ fontSize: '1.2rem', color: '#A7B6A1', marginBottom: '1rem' }}>{item.price}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Ingredients: {item.ing}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
