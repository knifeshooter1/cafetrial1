import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';

function MinimalistCup() {
  const cupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (cupRef.current) {
      // Scroll-based rotation
      const scrollY = window.scrollY;
      cupRef.current.rotation.y = scrollY * 0.003;
      cupRef.current.rotation.x = scrollY * 0.001 - 0.1;
    }
  });

  return (
    <group ref={cupRef} position={[0, -0.3, 0]}>
      {/* Cup outer body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 0.75, 1.8, 48]} />
        <meshPhysicalMaterial color="#F5F0EB" roughness={0.15} clearcoat={0.4} clearcoatRoughness={0.2} />
      </mesh>
      {/* Coffee inside — shorter than cup so there's a visible rim */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.92, 0.7, 1.5, 48]} />
        <meshStandardMaterial color="#4A2C17" roughness={0.8} />
      </mesh>
      {/* Latte art ring */}
      <mesh position={[0, 0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.4, 32]} />
        <meshStandardMaterial color="#C8A882" transparent opacity={0.5} />
      </mesh>
      {/* Handle — FULL torus ring, positioned so back half hides inside cup wall */}
      <mesh position={[1.15, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.08, 16, 48]} />
        <meshPhysicalMaterial color="#F5F0EB" roughness={0.15} clearcoat={0.4} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -1.0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.6, 1.4, 0.1, 48]} />
        <meshPhysicalMaterial color="#A7B6A1" roughness={0.25} clearcoat={0.2} />
      </mesh>
    </group>
  );
}

interface HeroProps {
  setCursorVariant: (variant: string) => void;
}

const Hero = ({ setCursorVariant }: HeroProps) => {
  return (
    <section style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-offwhite)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas shadows camera={{ position: [0, 2.5, 7], fov: 40 }}>
          <color attach="background" args={['#F9F9F9']} />
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 12, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow color="#ffebd6" />
          <spotLight position={[-8, 6, -5]} angle={0.3} penumbra={1} intensity={0.5} color="#a7b6a1" />
          <Float rotationIntensity={0.2} floatIntensity={1} speed={1.5}>
            <MinimalistCup />
          </Float>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.35} scale={15} blur={2.5} far={4} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-charcoal)' }}>
          Paput
        </motion.h1>
      </div>

      <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
          onMouseEnter={() => setCursorVariant('hidden')} onMouseLeave={() => setCursorVariant('default')}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 400, color: 'var(--text-charcoal)', opacity: 0.6 }}>
            Scroll to Discover
          </span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: '1px', height: '40px', backgroundColor: 'var(--accent-sage)' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
