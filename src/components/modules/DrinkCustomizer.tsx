import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const bases = [
  { name: 'Espresso', price: 150, color: '#2b1b13' },
  { name: 'Latte', price: 200, color: '#8D6E63' },
  { name: 'Cappuccino', price: 220, color: '#A1887F' },
  { name: 'Cold Brew', price: 250, color: '#1a0d06' },
  { name: 'Chai', price: 180, color: '#c49a6c' }
];

const milks = [
  { name: 'None', price: 0, addsFoam: false },
  { name: 'Whole', price: 0, addsFoam: true },
  { name: 'Oat', price: 50, addsFoam: true },
  { name: 'Almond', price: 50, addsFoam: false },
  { name: 'Soy', price: 40, addsFoam: true }
];

const sweetnessLevels = [
  { name: 'None', price: 0, level: 0 },
  { name: 'Light', price: 0, level: 1 },
  { name: 'Medium', price: 0, level: 2 },
  { name: 'Sweet', price: 20, level: 3 }
];

const sizes = [
  { name: 'Small', multiplier: 1, scale: 0.8, volume: 0.5 },
  { name: 'Medium', multiplier: 1.3, scale: 1, volume: 0.7 },
  { name: 'Large', multiplier: 1.6, scale: 1.2, volume: 0.9 }
];

// 3D Visualizer Component
function DrinkVisualizer({ base, milk, sweetness, size }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const jugRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Mesh>(null);
  
  const [isPouring, setIsPouring] = useState(false);
  const prevMilk = useRef(milk.name);

  // Trigger pour animation when milk changes (and not None)
  useEffect(() => {
    if (milk.name !== 'None' && milk.name !== prevMilk.current) {
      setIsPouring(true);
      const timer = setTimeout(() => setIsPouring(false), 2000); // pour duration
      return () => clearTimeout(timer);
    }
    prevMilk.current = milk.name;
  }, [milk.name]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      // Smooth scale
      groupRef.current.scale.lerp(new THREE.Vector3(size.scale, size.scale, size.scale), 0.1);
    }

    if (jugRef.current && streamRef.current) {
      if (isPouring) {
        jugRef.current.position.lerp(new THREE.Vector3(1.5, 2.5, 0), 0.1);
        jugRef.current.rotation.z = THREE.MathUtils.lerp(jugRef.current.rotation.z, Math.PI / 4, 0.1);
        streamRef.current.scale.y = THREE.MathUtils.lerp(streamRef.current.scale.y, 1, 0.2);
        (streamRef.current.material as THREE.Material).opacity = THREE.MathUtils.lerp((streamRef.current.material as THREE.Material).opacity, 1, 0.2);
      } else {
        jugRef.current.position.lerp(new THREE.Vector3(3, 4, 0), 0.05);
        jugRef.current.rotation.z = THREE.MathUtils.lerp(jugRef.current.rotation.z, 0, 0.1);
        streamRef.current.scale.y = THREE.MathUtils.lerp(streamRef.current.scale.y, 0, 0.2);
        (streamRef.current.material as THREE.Material).opacity = THREE.MathUtils.lerp((streamRef.current.material as THREE.Material).opacity, 0, 0.2);
      }
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, -1, 0]}>
        {/* Café Cup */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 0.9, 2.5, 32]} />
          <meshStandardMaterial color="#fff" roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Cup Logo */}
        <Text position={[0, 0, 1.05]} rotation={[0, 0, 0]} fontSize={0.3} color="#2b1b13" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff">
          PAPUT
        </Text>

        {/* Liquid Base */}
        <mesh position={[0, -1.2 + size.volume * 1.25, 0]}>
          <cylinderGeometry args={[0.9 + size.volume * 0.15, 0.85, size.volume * 2.5, 32]} />
          <meshStandardMaterial color={base.color} roughness={0.2} />
        </mesh>

        {/* Foam Layer */}
        {milk.addsFoam && (
          <mesh position={[0, -1.2 + size.volume * 2.5 + 0.1, 0]}>
            <cylinderGeometry args={[1.05, 1.05, 0.2, 32]} />
            <meshStandardMaterial color="#f5eedc" roughness={0.9} />
          </mesh>
        )}

        {/* Handle */}
        <mesh position={[1.1, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <torusGeometry args={[0.6, 0.15, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#fff" roughness={0.1} />
        </mesh>

        {/* Sugar Particles */}
        {sweetness.level > 0 && (
          <SugarParticles level={sweetness.level} />
        )}
      </group>

      {/* Milk Jug */}
      <group ref={jugRef} position={[3, 4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.4, 0.5, 1, 16]} />
          <meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Spout */}
        <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, Math.PI/4]}>
          <coneGeometry args={[0.1, 0.3, 16]} />
          <meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Stream */}
        <mesh ref={streamRef} position={[-0.5, -1.5, 0]} scale={[1, 0, 1]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <meshBasicMaterial color="#fff" transparent opacity={0} />
        </mesh>
      </group>
    </>
  );
}

function SugarParticles({ level }: { level: number }) {
  const count = level * 10;
  const particles = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particles.current) {
      particles.current.children.forEach((child, i) => {
        child.position.y += 0.02 + Math.sin(state.clock.elapsedTime + i) * 0.01;
        child.rotation.x += 0.05;
        child.rotation.y += 0.05;
        if (child.position.y > 3) {
          child.position.y = 1.5;
        }
      });
    }
  });

  return (
    <group ref={particles}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh 
          key={i} 
          position={[(Math.random() - 0.5) * 1.5, 1.5 + Math.random() * 1.5, (Math.random() - 0.5) * 1.5]}
        >
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshPhysicalMaterial color="#fff" roughness={0.1} transmission={0.9} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export default function DrinkCustomizer() {
  const [base, setBase] = useState(bases[0]);
  const [milk, setMilk] = useState(milks[0]);
  const [sweetness, setSweetness] = useState(sweetnessLevels[0]);
  const [size, setSize] = useState(sizes[1]);

  const totalPrice = useMemo(() => {
    return Math.round((base.price + milk.price + sweetness.price) * size.multiplier);
  }, [base, milk, sweetness, size]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '3rem' }}>Craft Your Cup</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* 3D Visualizer */}
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '450px', position: 'relative' }}>
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} castShadow />
            <DrinkVisualizer base={base} milk={milk} sweetness={sweetness} size={size} />
            <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
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
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: base.name === b.name ? 'var(--text-charcoal)' : '#fff', color: base.name === b.name ? '#fff' : '#333', cursor: 'pointer', transition: 'all 0.2s' }}>
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
                <button key={m.name} onClick={() => setMilk(m)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: milk.name === m.name ? 'var(--text-charcoal)' : '#fff', color: milk.name === m.name ? '#fff' : '#333', cursor: 'pointer', transition: 'all 0.2s' }}>
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
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: sweetness.name === s.name ? 'var(--text-charcoal)' : '#fff', color: sweetness.name === s.name ? '#fff' : '#333', cursor: 'pointer', transition: 'all 0.2s' }}>
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
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: size.name === sz.name ? 'var(--text-charcoal)' : '#fff', color: size.name === sz.name ? '#fff' : '#333', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {sz.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total Price:</span>
            <motion.span 
              key={totalPrice}
              initial={{ scale: 1.2, color: 'var(--accent-sage)' }}
              animate={{ scale: 1, color: 'var(--text-charcoal)' }}
              style={{ fontSize: '2rem', fontWeight: 300 }}
            >
              ₹{totalPrice}
            </motion.span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
