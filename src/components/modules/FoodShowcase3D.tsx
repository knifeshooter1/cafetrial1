import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';


function SimpleCroissant({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current && hovered) ref.current.rotation.y += delta; });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.5, 0.2, 64, 8, 2, 3]} />
      <meshStandardMaterial color={hovered ? '#ffdead' : '#deb887'} roughness={0.6} />
    </mesh>
  );
}

function SimpleDonut({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current && hovered) ref.current.rotation.x += delta; });
  return (
    <mesh ref={ref} rotation={[Math.PI/2, 0, 0]}>
      <torusGeometry args={[0.6, 0.3, 32, 64]} />
      <meshStandardMaterial color={hovered ? '#ffc0cb' : '#ff69b4'} roughness={0.4} />
    </mesh>
  );
}

function SimpleSandwich({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current && hovered) ref.current.rotation.y += delta; });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.2, 0.8, 1.2]} />
      <meshStandardMaterial color={hovered ? '#f5deb3' : '#d2b48c'} roughness={0.8} />
    </mesh>
  );
}

const shelfItems = [
  { id: 1, name: 'Almond Croissant', price: 240, Model: SimpleCroissant },
  { id: 2, name: 'Glazed Donut', price: 120, Model: SimpleDonut },
  { id: 3, name: 'Truffle Sandwich', price: 350, Model: SimpleSandwich }
];

export default function FoodShowcase3D() {
  const [cart, setCart] = useState<number>(0);

  return (
    <section style={{ padding: '4rem 2rem', position: 'relative' }}>
      
      {/* Cart Counter */}
      <div style={{ position: 'absolute', top: '20px', right: '40px', backgroundColor: '#A7B6A1', color: '#fff', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold' }}>
        Cart: {cart} items
      </div>

      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 300 }}>Fresh from the Oven</h2>

      <div style={{ display: 'flex', overflowX: 'auto', gap: '2rem', padding: '2rem 0', scrollSnapType: 'x mandatory' }}>
        {shelfItems.map(item => (
          <ShelfItem key={item.id} item={item} onAdd={() => setCart(c => c + 1)} />
        ))}
      </div>
    </section>
  );
}

function ShelfItem({ item, onAdd }: { item: any, onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        minWidth: '300px', 
        height: '400px', 
        backgroundColor: '#fff', 
        borderRadius: '16px', 
        boxShadow: hovered ? '0 0 30px rgba(167, 182, 161, 0.4)' : '0 4px 10px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        scrollSnapAlign: 'center',
        border: hovered ? '2px solid #A7B6A1' : '2px solid transparent'
      }}
    >
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <item.Model hovered={hovered} />
        </Canvas>
      </div>
      
      <div style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid #eee' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.5rem' }}>{item.name}</h3>
        <p style={{ color: '#A7B6A1', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem' }}>₹{item.price}</p>
        <button 
          onClick={onAdd}
          style={{ padding: '0.8rem 2rem', backgroundColor: '#2C2C2C', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '100%' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
