import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useCart } from '../CartContext';

const bases = [
  { name: 'Espresso', price: 150, color: '#2A1610' },
  { name: 'Latte', price: 200, color: '#8D6E63' },
  { name: 'Cappuccino', price: 220, color: '#A1887F' },
  { name: 'Cold Brew', price: 250, color: '#1A0B08' },
  { name: 'Chai', price: 180, color: '#D4B483' }
];

const milks = [
  { name: 'None', price: 0, addsFoam: false },
  { name: 'Whole', price: 0, addsFoam: true },
  { name: 'Oat', price: 50, addsFoam: true },
  { name: 'Almond', price: 50, addsFoam: false },
  { name: 'Soy', price: 40, addsFoam: true }
];

const sweetnessLevels = [
  { name: 'None', price: 0, crystals: 0 },
  { name: 'Light', price: 0, crystals: 10 },
  { name: 'Medium', price: 0, crystals: 20 },
  { name: 'Sweet', price: 20, crystals: 40 }
];

const sizes = [
  { name: 'Small', multiplier: 1, scale: 0.8 },
  { name: 'Medium', multiplier: 1.3, scale: 1 },
  { name: 'Large', multiplier: 1.6, scale: 1.2 }
];

function Cup3D({ baseColor, foamAmount, scale, crystals }: { baseColor: string, foamAmount: number, scale: number, crystals: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const foamRef = useRef<THREE.Mesh>(null);

  // Animate foam rising
  useFrame((state, delta) => {
    if (foamRef.current) {
      foamRef.current.position.y = THREE.MathUtils.lerp(foamRef.current.position.y, 0.4 + foamAmount, 0.05);
      foamRef.current.scale.y = THREE.MathUtils.lerp(foamRef.current.scale.y, foamAmount > 0 ? 1 : 0, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, -1, 0]}>
      {/* Tapered Cup */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.9, 0.6, 1.2, 32]} />
        <meshStandardMaterial color="#F9F9F9" roughness={0.1} transparent opacity={0.6} />
      </mesh>
      
      {/* Liquid */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.85, 0.55, 1.1, 32]} />
        <meshStandardMaterial color={baseColor} roughness={0.3} />
      </mesh>

      {/* Foam */}
      <mesh ref={foamRef} position={[0, 0.4, 0]} scale={[1, 0, 1]}>
        <cylinderGeometry args={[0.85, 0.85, 0.2, 32]} />
        <meshStandardMaterial color="#FFF" roughness={0.9} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.9, 0.6, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#F9F9F9" roughness={0.1} />
      </mesh>

      {/* Sugar Crystals */}
      {Array.from({ length: crystals }).map((_, i) => (
        <SugarCrystal key={i} index={i} total={crystals} />
      ))}
    </group>
  );
}

function SugarCrystal({ index, total }: { index: number, total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [offset] = useState(() => Math.random() * 100);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime + offset;
      ref.current.position.y = 1.2 + (t % 2); // Rising motion
      ref.current.rotation.x = t;
      ref.current.rotation.y = t * 1.5;
      ref.current.position.x = Math.sin(t * 2 + index) * 0.5;
      ref.current.position.z = Math.cos(t * 2 + index) * 0.5;
      ref.current.material.opacity = 1 - ((t % 2) / 2);
    }
  });

  return (
    <mesh ref={ref} position={[0, 1.2, 0]}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial color="#FFF" transparent opacity={0.8} />
    </mesh>
  );
}

function MilkJug({ isPouring }: { isPouring: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const targetRotZ = isPouring ? Math.PI / 4 : 0;
      const targetPosY = isPouring ? 1.5 : 2;
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRotZ, 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPosY, 0.1);
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, isPouring ? -1 : -2, 0.1);
    }
  });

  return (
    <group ref={ref} position={[-2, 2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.3, 0.6, 16]} />
        <meshStandardMaterial color="#CCC" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Stream */}
      {isPouring && (
        <mesh position={[0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#FFF" />
        </mesh>
      )}
    </group>
  );
}

export default function DrinkCustomizer() {
  const [base, setBase] = useState(bases[0]);
  const [milk, setMilk] = useState(milks[0]);
  const [sweetness, setSweetness] = useState(sweetnessLevels[0]);
  const [size, setSize] = useState(sizes[1]);
  const [isPouring, setIsPouring] = useState(false);
  const { addToCart } = useCart();

  const handleMilkChange = (m: typeof milks[0]) => {
    setMilk(m);
    if (m.name !== 'None') {
      setIsPouring(true);
      setTimeout(() => setIsPouring(false), 2000); // Pour for 2 seconds
    }
  };

  const totalPrice = useMemo(() => {
    return Math.round((base.price + milk.price + sweetness.price) * size.multiplier);
  }, [base, milk, sweetness, size]);

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(), // Generate unique ID for custom drinks
      name: `Custom ${size.name} ${base.name}`,
      price: totalPrice
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '3rem' }}>Craft Your Cup</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* 3D Viewport */}
        <div style={{ flex: '1 1 300px', height: '500px', position: 'relative' }}>
          <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} castShadow />
            <Cup3D 
              baseColor={base.color} 
              foamAmount={milk.addsFoam ? 0.2 : 0} 
              scale={size.scale}
              crystals={sweetness.crystals}
            />
            <MilkJug isPouring={isPouring} />
            <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Controls */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Base */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Base</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {bases.map(b => (
                <button key={b.name} onClick={() => setBase(b)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: base.name === b.name ? 'var(--text-charcoal)' : '#fff', color: base.name === b.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Milk */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Milk</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {milks.map(m => (
                <button key={m.name} onClick={() => handleMilkChange(m)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: milk.name === m.name ? 'var(--text-charcoal)' : '#fff', color: milk.name === m.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Sweetness</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sweetnessLevels.map(s => (
                <button key={s.name} onClick={() => setSweetness(s)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: sweetness.name === s.name ? 'var(--text-charcoal)' : '#fff', color: sweetness.name === s.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Size</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sizes.map(sz => (
                <button key={sz.name} onClick={() => setSize(sz)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: size.name === sz.name ? 'var(--text-charcoal)' : '#fff', color: size.name === sz.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {sz.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Total</span>
              <motion.span 
                key={totalPrice}
                initial={{ scale: 1.2, color: 'var(--accent-sage)' }}
                animate={{ scale: 1, color: 'var(--text-charcoal)' }}
                style={{ fontSize: '2rem', fontWeight: 300 }}
              >
                ₹{totalPrice}
              </motion.span>
            </div>
            <button 
              onClick={handleAddToCart}
              style={{ background: 'var(--text-charcoal)', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
