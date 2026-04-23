import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import * as THREE from 'three';

// Data
const bases = [
  { name: 'Espresso', color: '#3E2723', price: 150 },
  { name: 'Latte', color: '#D7CCC8', price: 200 },
  { name: 'Matcha', color: '#81C784', price: 250 },
  { name: 'Cold Brew', color: '#4E342E', price: 180 }
];
const milks = [
  { name: 'Whole', foam: true, price: 0 },
  { name: 'Oat', foam: false, price: 50 },
  { name: 'Almond', foam: false, price: 50 }
];
const sizes = [
  { name: 'Small', scale: 0.8, price: 0 },
  { name: 'Medium', scale: 1.0, price: 40 },
  { name: 'Large', scale: 1.2, price: 80 }
];

function CustomCup({ baseColor, foam, cupScale }: { baseColor: string, foam: boolean, cupScale: number }) {
  const liquidRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    // Smoothly animate liquid color using lerp
    if (liquidRef.current) {
      const material = liquidRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(new THREE.Color(baseColor), 0.1);
    }
  });

  return (
    <group scale={cupScale}>
      {/* Glass cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 0.9, 2.5, 32]} />
        <meshPhysicalMaterial transmission={1} roughness={0.1} thickness={0.2} color="#ffffff" transparent opacity={0.3} />
      </mesh>
      
      {/* Liquid */}
      <mesh ref={liquidRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.1, 0.85, 2.0, 32]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>

      {/* Foam */}
      {foam && (
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[1.15, 1.1, 0.3, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      )}
    </group>
  );
}

export default function DrinkCustomizer() {
  const [base, setBase] = useState(bases[0]);
  const [milk, setMilk] = useState(milks[0]);
  const [size, setSize] = useState(sizes[1]);

  const totalPrice = base.price + milk.price + size.price;

  return (
    <section style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#F9F9F9', borderRadius: '16px', overflow: 'hidden', margin: '2rem 0' }}>
      
      {/* 3D Visual */}
      <div style={{ flex: '1 1 400px', height: '500px', position: 'relative', backgroundColor: '#e5e5e5' }}>
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <CustomCup baseColor={base.color} foam={milk.foam} cupScale={size.scale} />
        </Canvas>
        <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#fff', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.5rem', color: '#A7B6A1', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          ₹{totalPrice}
        </div>
      </div>

      {/* Controls */}
      <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 300 }}>Build Your Drink</h2>
        
        <div>
          <h4 style={{ marginBottom: '1rem', color: '#666' }}>Base</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {bases.map(b => (
              <button key={b.name} onClick={() => setBase(b)} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: base.name === b.name ? '#2C2C2C' : '#fff', color: base.name === b.name ? '#fff' : '#333', cursor: 'pointer' }}>
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', color: '#666' }}>Milk</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {milks.map(m => (
              <button key={m.name} onClick={() => setMilk(m)} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: milk.name === m.name ? '#2C2C2C' : '#fff', color: milk.name === m.name ? '#fff' : '#333', cursor: 'pointer' }}>
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', color: '#666' }}>Size</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {sizes.map(s => (
              <button key={s.name} onClick={() => setSize(s)} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: size.name === s.name ? '#2C2C2C' : '#fff', color: size.name === s.name ? '#fff' : '#333', cursor: 'pointer' }}>
                {s.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
