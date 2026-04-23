import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';

// An abstract minimalist coffee cup representation
function MinimalistCup() {
  const cupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      cupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={cupRef} position={[0, -1, 0]}>
      {/* Cup Body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[1.2, 0.9, 2.5, 32]} />
        <meshStandardMaterial color="#F9F9F9" roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* Liquid inside */}
      <mesh position={[0, 2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.8} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[1.3, 1.5, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <torusGeometry args={[0.6, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#F9F9F9" roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* Saucer */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.2, 1.8, 0.2, 32]} />
        <meshStandardMaterial color="#A7B6A1" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

interface HeroProps {
  setCursorVariant: (variant: string) => void;
  setCursorText: (text: string) => void;
}

const Hero = ({ setCursorVariant }: HeroProps) => {
  return (
    <section 
      style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: 'var(--bg-offwhite)'
      }}
    >
      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <color attach="background" args={['#F9F9F9']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            snap={true}
          >
            <Float rotationIntensity={0.5} floatIntensity={2} speed={2}>
              <MinimalistCup />
            </Float>
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Floating Logo Overlay */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '40px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 10,
          mixBlendMode: 'difference'
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 300, 
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#fff'
          }}
        >
          Paput
        </motion.h1>
      </div>

      {/* Discover CTA Overlay */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 10 
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '10px' 
          }}
          onMouseEnter={() => setCursorVariant('hidden')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Scroll to Discover
          </span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: '1px', height: '40px', backgroundColor: 'var(--text-charcoal)' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
