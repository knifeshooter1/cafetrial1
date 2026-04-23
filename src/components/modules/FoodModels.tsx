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
    <group ref={ref} position={position} scale={[1.5, 1, 1.2]}>
      {/* Central body */}
      <mesh position={[0, 0, 0]} scale={[1, 0.5, 0.6]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} bumpScale={0.02} />
      </mesh>
      {/* Inner segments */}
      <mesh position={[0.2, 0, 0.05]} rotation={[0, -0.2, 0]} scale={[0.8, 0.45, 0.5]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      <mesh position={[-0.2, 0, 0.05]} rotation={[0, 0.2, 0]} scale={[0.8, 0.45, 0.5]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      {/* Outer tips */}
      <mesh position={[0.4, 0, 0.15]} rotation={[0, -0.5, 0]} scale={[0.6, 0.35, 0.4]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      <mesh position={[-0.4, 0, 0.15]} rotation={[0, 0.5, 0]} scale={[0.6, 0.35, 0.4]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
    </group>
  );
}

// 2. Blueberry Muffin - Properly seated dome
export function MuffinModel({ hovered, position = [0,0,0] }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = hovered ? state.clock.elapsedTime : state.clock.elapsedTime * 0.2;
    }
  });

  const berries = [
    [0.1, 0.35, 0.1], [-0.15, 0.3, 0.15], [0.05, 0.4, -0.1], 
    [-0.1, 0.35, -0.15], [0.2, 0.25, 0], [-0.2, 0.25, -0.05]
  ];

  return (
    <group ref={ref} position={position}>
      {/* Base Wrapper */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.2, 0.3, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} />
      </mesh>
      {/* Muffin Top Dome */}
      <mesh position={[0, 0.05, 0]} scale={[1, 0.8, 1]} castShadow>
        <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.8} />
      </mesh>
      {/* Blueberries */}
      {berries.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1a1c29" roughness={0.3} />
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
      <mesh position={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.07, 0]} castShadow>
        <boxGeometry args={[0.85, 0.02, 0.85]} />
        <meshStandardMaterial color="#7CB342" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.75, 0.1, 0.75]} />
        <meshStandardMaterial color="#A1887F" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.25, 0]} castShadow>
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
        <torusGeometry args={[0.3, 0.15, 32, 64]} />
        <meshStandardMaterial color="#E6B873" roughness={0.5} />
      </mesh>
      {/* Glaze: Shifted slightly up so it covers the top half */}
      <mesh position={[0, 0, 0.03]} castShadow>
        <torusGeometry args={[0.3, 0.14, 32, 64]} />
        <meshStandardMaterial color={glazeColor} roughness={0.1} metalness={0.1} />
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
      <mesh castShadow position={[0, -0.15, 0]} rotation={[0, Math.PI/4, Math.PI/4]}>
        <tetrahedronGeometry args={[0.35]} />
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
      {/* Cup */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.2, 0.35, 32, 1, true]} />
        <meshStandardMaterial color="#fff" roughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Base of cup */}
      <mesh position={[0, -0.27, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.25, -0.1, 0]}>
        <torusGeometry args={[0.12, 0.04, 16, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.1} />
      </mesh>
      {/* Liquid inside */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.2, 32]} />
        <meshStandardMaterial color="#1A0D00" roughness={0.1} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.45, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.1} />
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
      {/* Transparent Glass */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.18, 0.6, 32]} />
        <meshPhysicalMaterial color="#fff" transparent opacity={0.3} roughness={0} />
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
    <group ref={ref} position={position} scale={[1.6, 1, 1.2]}>
      {/* Central body */}
      <mesh position={[0, 0, 0]} scale={[1, 0.5, 0.6]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} bumpScale={0.02} />
      </mesh>
      {/* Inner segments */}
      <mesh position={[0.2, 0, 0.05]} rotation={[0, -0.2, 0]} scale={[0.8, 0.45, 0.5]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      <mesh position={[-0.2, 0, 0.05]} rotation={[0, 0.2, 0]} scale={[0.8, 0.45, 0.5]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      {/* Outer tips */}
      <mesh position={[0.4, 0, 0.15]} rotation={[0, -0.5, 0]} scale={[0.6, 0.35, 0.4]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>
      <mesh position={[-0.4, 0, 0.15]} rotation={[0, 0.5, 0]} scale={[0.6, 0.35, 0.4]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#E6B873" roughness={0.7} />
      </mesh>

      {/* Almond Slivers */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 0.6;
        const z = (Math.random() - 0.5) * 0.2;
        return (
          <mesh key={i} position={[x, 0.18, z]} rotation={[Math.random(), Math.random(), 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.01, 8]} />
            <meshStandardMaterial color="#FFF8DC" />
          </mesh>
        );
      })}
    </group>
  );
}
