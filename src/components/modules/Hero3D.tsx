import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Cup geometry points
const cupPoints: THREE.Vector2[] = [];
for (let i = 0; i <= 10; i++) cupPoints.push(new THREE.Vector2(0.9 + i * 0.03, i * 0.2));
cupPoints.push(new THREE.Vector2(1.22, 2.0));
cupPoints.push(new THREE.Vector2(1.18, 2.0));
for (let i = 10; i >= 1; i--) cupPoints.push(new THREE.Vector2(0.85 + i * 0.03, i * 0.2));
cupPoints.push(new THREE.Vector2(0.0, 0.2));
cupPoints.push(new THREE.Vector2(0.0, 0.0));

function CoffeeCupWithSteam() {
  const cupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);

  // Steam particles
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  const velocities: {x: number, y: number}[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.8; // x
    positions[i * 3 + 1] = 1.8 + Math.random() * 2; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8; // z
    velocities.push({
      y: 0.01 + Math.random() * 0.02,
      x: (Math.random() - 0.5) * 0.01
    });
  }

  useFrame((state) => {
    // Parallax tilt based on scroll (using mouse as proxy if scroll not directly accessible here, or just gentle auto-rotation)
    if (cupRef.current) {
      cupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      const scrollY = window.scrollY;
      cupRef.current.rotation.x = scrollY * 0.001; // Parallax tilt
    }

    // Animate steam
    if (steamRef.current) {
      const positions = steamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3] += velocities[i].x;
        
        // Reset particle if it goes too high
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = 1.8;
          positions[i * 3] = (Math.random() - 0.5) * 0.8;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <Float rotationIntensity={0.2} floatIntensity={1} speed={2}>
        <group ref={cupRef}>
          {/* Cup */}
          <mesh castShadow receiveShadow>
            <latheGeometry args={[cupPoints, 64]} />
            <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.5} side={THREE.DoubleSide} />
          </mesh>
          {/* Coffee */}
          <mesh position={[0, 1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.05, 64]} />
            <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
          </mesh>
          {/* Handle */}
          <mesh position={[1.0, 1.0, 0]} rotation={[0, 0, -Math.PI / 10]}>
            <torusGeometry args={[0.5, 0.12, 16, 64]} />
            <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.5} />
          </mesh>
        </group>
      </Float>

      {/* Steam */}
      <points ref={steamRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.3} depthWrite={false} />
      </points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <section style={{ height: '100vh', width: '100%', position: 'relative', backgroundColor: '#1A1A1A', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow color="#ffebd6" />
          <spotLight position={[-10, 5, -10]} angle={0.3} penumbra={1} intensity={1} color="#a7b6a1" />
          
          <PresentationControls global rotation={[0, 0, 0]} polar={[-0.2, 0.2]} azimuth={[-0.5, 0.5]}>
            <CoffeeCupWithSteam />
          </PresentationControls>
          
          <Environment preset="night" />
        </Canvas>
      </div>

      <div style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none', color: '#fff' }}>
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: '5rem', fontWeight: 300, margin: 0, letterSpacing: '0.05em' }}
        >
          Paput<br/>Menorca
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ fontSize: '1.2rem', color: '#A7B6A1', marginTop: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Awaken your senses.
        </motion.p>
      </div>

    </section>
  );
}
