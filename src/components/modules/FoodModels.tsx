import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  hovered?: boolean;
  position?: [number, number, number];
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
      {/* Core crescent shape */}
      <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.25, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#E6B873" roughness={0.6} />
      </mesh>
      {/* Inner rings to suggest layers */}
      <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.05]} scale={[0.9, 0.9, 1.2]} castShadow>
        <torusGeometry args={[0.45, 0.2, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#D4A352" roughness={0.7} />
      </mesh>
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

  // Generate random blueberry positions
  const berries = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const r = Math.random() * 0.3;
    return [Math.cos(angle) * r, 0.45 + Math.random() * 0.15, Math.sin(angle) * r] as [number, number, number];
  });

  return (
    <group ref={ref} position={position}>
      {/* Base/Wrapper */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.2, 0.5, 32]} />
        <meshStandardMaterial color="#4A3424" roughness={0.9} />
      </mesh>
      {/* Muffin Top */}
      <mesh position={[0, 0.1, 0]} scale={[1, 0.7, 1]} castShadow>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.8} />
      </mesh>
      {/* Blueberries */}
      {berries.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#2E3B55" roughness={0.5} />
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
    <group ref={ref} position={position}>
      {/* Bottom Bread */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
      </mesh>
      {/* Lettuce */}
      <mesh position={[0, -0.1, 0]} scale={[1.1, 1, 1.1]} castShadow>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#7CB342" roughness={0.9} />
      </mesh>
      {/* Filling (Meat/Cheese) */}
      <mesh position={[0, 0, 0]} scale={[0.9, 1, 0.9]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#A1887F" roughness={0.7} />
      </mesh>
      {/* Top Bread */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
      </mesh>
      {/* Toothpick */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>
    </group>
  );
}

// 4. Glazed Donut (and Chocolate)
export function DonutModel({ hovered, position = [0,0,0], flavor = 'glazed' }: ModelProps & { flavor?: 'glazed' | 'chocolate' }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 4;
      ref.current.rotation.z = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  const glazeColor = flavor === 'chocolate' ? '#3E2723' : '#FCE4EC';

  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh castShadow>
        <torusGeometry args={[0.4, 0.2, 32, 64]} />
        <meshStandardMaterial color="#E6B873" roughness={0.5} />
      </mesh>
      {/* Glaze */}
      <mesh position={[0, 0, 0.05]} scale={[1, 1, 0.8]} castShadow>
        <torusGeometry args={[0.41, 0.21, 16, 64]} />
        <meshStandardMaterial color={glazeColor} roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

// 5. Spiced Samosa
export function SamosaModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <tetrahedronGeometry args={[0.5]} />
      <meshStandardMaterial color="#CD853F" roughness={0.9} bumpScale={0.02} />
    </mesh>
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
      {/* Cup */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.25, 0.4, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI/2]}>
        <torusGeometry args={[0.15, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#fff" roughness={0.1} />
      </mesh>
      {/* Liquid */}
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.33, 32]} />
        <meshStandardMaterial color="#1A0D00" roughness={0.2} />
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
      {/* Glass */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.2, 0.8, 32]} />
        <meshPhysicalMaterial color="#fff" transmission={0.9} opacity={1} transparent roughness={0} thickness={0.1} />
      </mesh>
      {/* Coffee Layer */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.24, 0.19, 0.35, 32]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      {/* Milk Layer */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.24, 0.25, 32]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>
      {/* Latte Art */}
      <mesh position={[0, 0.23, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color="#A1887F">
          {/* Simple texture trick or color variation for art could go here, keeping it flat color for geometry simplicity */}
        </meshStandardMaterial>
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
      <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.25, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      {/* Almond Slivers */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI;
        return (
          <mesh key={i} position={[Math.cos(angle)*0.5, 0.2, Math.sin(angle)*0.5]} rotation={[Math.random(), Math.random(), 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 8]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
        );
      })}
    </group>
  );
}
