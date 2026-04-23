import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  hovered?: boolean;
  position?: [number, number, number];
  flavor?: 'glazed' | 'chocolate';
}

// 1. Butter Croissant
export function CroissantModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Build a crescent using overlapping scaled spheres */}
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((x, i) => {
        const scale = 1 - Math.abs(x) * 0.8; // Middle is 1, edges are smaller
        const z = Math.sin(x * Math.PI) * 0.2; // Curve it
        return (
          <mesh key={i} position={[x, 0, z]} scale={[scale * 0.4, scale * 0.3, scale * 0.4]} castShadow>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#D4A352" roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// 2. Blueberry Muffin
export function MuffinModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  // Fixed static random positions for blueberries to avoid jitter
  const berries = [
    [0.1, 0.25, 0.1], [-0.15, 0.2, 0.15], [0.05, 0.3, -0.1], 
    [-0.1, 0.25, -0.15], [0.2, 0.15, 0], [-0.2, 0.15, -0.05]
  ];

  return (
    <group ref={ref} position={position}>
      {/* Base Wrapper */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.2, 0.3, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} />
      </mesh>
      {/* Muffin Top */}
      <mesh position={[0, 0.05, 0]} scale={[1, 0.6, 1]} castShadow>
        <sphereGeometry args={[0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.8} />
      </mesh>
      {/* Blueberries */}
      {berries.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1a1c29" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// 3. Club Sandwich
export function SandwichModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={position} scale={0.8}>
      {/* Bottom Bread */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
      </mesh>
      {/* Lettuce */}
      <mesh position={[0, -0.12, 0]} castShadow>
        <boxGeometry args={[0.85, 0.02, 0.85]} />
        <meshStandardMaterial color="#7CB342" roughness={0.9} />
      </mesh>
      {/* Meat/Cheese */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[0.75, 0.1, 0.75]} />
        <meshStandardMaterial color="#A1887F" roughness={0.7} />
      </mesh>
      {/* Top Bread */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
      </mesh>
      {/* Toothpick */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.4]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>
    </group>
  );
}

// 4. Glazed Donut (and Chocolate)
export function DonutModel({ hovered, position = [0,0,0], flavor = 'glazed' }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 6;
      ref.current.rotation.z = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  const glazeColor = flavor === 'chocolate' ? '#3E2723' : '#FCE4EC';

  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh castShadow>
        <torusGeometry args={[0.35, 0.18, 32, 64]} />
        <meshStandardMaterial color="#E6B873" roughness={0.5} />
      </mesh>
      {/* Glaze: Half torus sitting slightly above */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <torusGeometry args={[0.35, 0.19, 16, 64, Math.PI]} />
        <meshStandardMaterial color={glazeColor} roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

// 5. Spiced Samosa
export function SamosaModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh castShadow position={[0, -0.1, 0]} rotation={[0, Math.PI/4, Math.PI/4]}>
        <tetrahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#D4A352" roughness={0.9} bumpScale={0.05} />
      </mesh>
    </group>
  );
}

// 6. House Espresso
export function EspressoModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Cup (Using Physical Material for Glass effect) */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.2, 0.35, 32]} />
        <meshPhysicalMaterial color="#fff" transmission={0.9} opacity={1} transparent roughness={0.1} thickness={0.05} side={THREE.DoubleSide} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.3, -0.1, 0]} rotation={[0, 0, -Math.PI/6]}>
        <torusGeometry args={[0.1, 0.03, 16, 32, Math.PI]} />
        <meshPhysicalMaterial color="#fff" transmission={0.9} transparent roughness={0.1} />
      </mesh>
      {/* Liquid */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.26, 0.2, 0.25, 32]} />
        <meshStandardMaterial color="#1A0D00" roughness={0.2} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.45, 0.35, 0.05, 32]} />
        <meshPhysicalMaterial color="#fff" transmission={0.9} transparent roughness={0.1} />
      </mesh>
    </group>
  );
}

// 7. Mocha Latte
export function MochaModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Tall Glass */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.18, 0.6, 32]} />
        <meshPhysicalMaterial color="#fff" transmission={0.95} opacity={1} transparent roughness={0.05} thickness={0.05} side={THREE.DoubleSide} />
      </mesh>
      {/* Coffee Layer */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.20, 0.17, 0.25, 32]} />
        <meshStandardMaterial color="#2E1A11" />
      </mesh>
      {/* Milk Layer */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.23, 0.20, 0.15, 32]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>
      {/* Foam Top */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.24, 0.23, 0.05, 32]} />
        <meshStandardMaterial color="#EFEBE9" roughness={0.9} />
      </mesh>
    </group>
  );
}

// 8. Almond Croissant
export function AlmondCroissantModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ref} position={position} scale={1.1}>
      {/* Core crescent shape */}
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((x, i) => {
        const scale = 1 - Math.abs(x) * 0.8; 
        const z = Math.sin(x * Math.PI) * 0.2; 
        return (
          <mesh key={i} position={[x, 0, z]} scale={[scale * 0.4, scale * 0.3, scale * 0.4]} castShadow>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#D4A352" roughness={0.6} />
          </mesh>
        );
      })}
      {/* Almond Slivers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 0.8;
        const z = (Math.random() - 0.5) * 0.3;
        return (
          <mesh key={i} position={[x, 0.15, z]} rotation={[Math.random(), Math.random(), 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 8]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
        );
      })}
    </group>
  );
}
