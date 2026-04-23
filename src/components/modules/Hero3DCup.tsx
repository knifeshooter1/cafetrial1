import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Points for a hollow cup
const cupPoints: THREE.Vector2[] = [];
// Outer wall
for (let i = 0; i <= 10; i++) {
  cupPoints.push(new THREE.Vector2(0.9 + i * 0.03, i * 0.2));
}
// Rim
cupPoints.push(new THREE.Vector2(1.22, 2.0));
cupPoints.push(new THREE.Vector2(1.18, 2.0));
// Inner wall
for (let i = 10; i >= 1; i--) {
  cupPoints.push(new THREE.Vector2(0.85 + i * 0.03, i * 0.2));
}
// Inside bottom
cupPoints.push(new THREE.Vector2(0.0, 0.2));
// Outside bottom
cupPoints.push(new THREE.Vector2(0.0, 0.0));

function GiantCup() {
  const cupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (cupRef.current) {
      // Gentle constant rotation
      cupRef.current.rotation.y += 0.005;
      
      // Parallax effect based on scroll
      const scrollY = window.scrollY;
      cupRef.current.rotation.x = THREE.MathUtils.lerp(cupRef.current.rotation.x, scrollY * 0.002, 0.1);
      cupRef.current.position.y = THREE.MathUtils.lerp(cupRef.current.position.y, -1 + scrollY * -0.005, 0.1);
    }
  });

  return (
    <group ref={cupRef} position={[0, -1, 0]} scale={1.5}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[cupPoints, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Liquid */}
      <mesh position={[0, 1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 64]} />
        <meshStandardMaterial color="#3E2723" roughness={0.4} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[1.0, 1.0, 0]} rotation={[0, 0, -Math.PI / 10]}>
        <torusGeometry args={[0.5, 0.12, 16, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Steam Particles */}
      <Sparkles count={50} scale={2} size={4} speed={0.4} opacity={0.2} position={[0, 3, 0]} color="#ffffff" />
    </group>
  );
}

export default function Hero3DCup() {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', background: '#0a0a0a', overflow: 'hidden' }}>
      
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
          <color attach="background" args={['#0a0a0a']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#d4b483" />
          <spotLight position={[-10, 5, -10]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
          
          <Float rotationIntensity={0.2} floatIntensity={1} speed={1.5}>
            <GiantCup />
          </Float>

          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000" />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Text Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
        <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 300, color: '#fff', mixBlendMode: 'overlay', margin: 0, letterSpacing: '0.05em' }}>
          PAPUT
        </h1>
        <p style={{ color: '#d4b483', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '1rem', fontWeight: 500 }}>
          The Art of Extraction
        </p>
      </div>

    </div>
  );
}
