import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const cupPts: THREE.Vector2[] = [];
cupPts.push(new THREE.Vector2(0.0, 0.0));
cupPts.push(new THREE.Vector2(0.85, 0.0));
for (let i = 0; i <= 12; i++) { const t=i/12; cupPts.push(new THREE.Vector2(0.85+t*0.4+Math.sin(t*Math.PI)*0.05, t*2.2)); }
cupPts.push(new THREE.Vector2(1.30,2.2)); cupPts.push(new THREE.Vector2(1.32,2.25)); cupPts.push(new THREE.Vector2(1.30,2.30)); cupPts.push(new THREE.Vector2(1.18,2.25));
for (let i = 12; i >= 1; i--) { const t=i/12; cupPts.push(new THREE.Vector2(0.80+t*0.35+Math.sin(t*Math.PI)*0.04, t*2.2)); }
cupPts.push(new THREE.Vector2(0.80, 0.15)); cupPts.push(new THREE.Vector2(0.0, 0.15));

function HeroCup() {
  const cupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);
  const particleCount = 60;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel: {x:number,y:number}[] = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i*3] = (Math.random()-0.5)*0.8;
      pos[i*3+1] = 1.8 + Math.random()*2;
      pos[i*3+2] = (Math.random()-0.5)*0.8;
      vel.push({ y:0.008+Math.random()*0.015, x:(Math.random()-0.5)*0.005 });
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      cupRef.current.rotation.x = Math.sin(window.scrollY * 0.002) * 0.15;
    }
    if (steamRef.current) {
      const arr = steamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i*3+1] += velocities[i].y;
        arr[i*3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        if (arr[i*3+1] > 4.5) { arr[i*3+1] = 1.8; arr[i*3] = (Math.random()-0.5)*0.6; }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0,-1,0]}>
      <Float rotationIntensity={0.15} floatIntensity={0.8} speed={1.5}>
        <group ref={cupRef}>
          <mesh castShadow receiveShadow><latheGeometry args={[cupPts,64]}/><meshPhysicalMaterial color="#1A1A1A" roughness={0.15} metalness={0.6} clearcoat={0.4} side={THREE.DoubleSide}/></mesh>
          <mesh position={[0,2.1,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.12,64]}/><meshStandardMaterial color="#1a0f0a" roughness={0.9}/></mesh>
          <mesh position={[0,2.11,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[0.1,0.35,32]}/><meshStandardMaterial color="#C8A882" transparent opacity={0.5}/></mesh>
          <mesh position={[1.15,1.2,0]} rotation={[0,0,-Math.PI/12]}><torusGeometry args={[0.55,0.1,16,64,Math.PI]}/><meshPhysicalMaterial color="#1A1A1A" roughness={0.15} metalness={0.6} clearcoat={0.4}/></mesh>
        </group>
      </Float>
      <points ref={steamRef}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]}/></bufferGeometry>
        <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.25} depthWrite={false}/>
      </points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <section style={{ height:'100vh', width:'100%', position:'relative', backgroundColor:'#0F0F0F', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, zIndex:1 }}>
        <Canvas shadows camera={{ position:[0,2,8], fov:45 }}>
          <ambientLight intensity={0.15}/>
          <spotLight position={[10,12,10]} angle={0.2} penumbra={1} intensity={2.5} castShadow color="#ffebd6"/>
          <spotLight position={[-8,5,-8]} angle={0.3} penumbra={1} intensity={0.8} color="#a7b6a1"/>
          <PresentationControls global rotation={[0,0,0]} polar={[-0.2,0.2]} azimuth={[-0.5,0.5]}>
            <HeroCup/>
          </PresentationControls>
          <Environment preset="night"/>
        </Canvas>
      </div>
      <div style={{ position:'absolute', top:'50%', left:'8%', transform:'translateY(-50%)', zIndex:10, pointerEvents:'none', color:'#fff' }}>
        <motion.h1 initial={{ opacity:0, x:-50 }} animate={{ opacity:1, x:0 }} transition={{ duration:1.2 }}
          style={{ fontSize:'clamp(3rem, 7vw, 6rem)', fontWeight:400, margin:0, letterSpacing:'0.03em', lineHeight:1.1 }}>
          Paput<br/>Menorca
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1, delay:0.6 }}
          style={{ fontSize:'1.1rem', color:'#D4A574', marginTop:'1.5rem', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:300 }}>
          Awaken your senses.
        </motion.p>
      </div>
    </section>
  );
}
