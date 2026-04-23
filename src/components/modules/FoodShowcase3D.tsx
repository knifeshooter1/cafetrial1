import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function DetailedCroissant({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.7, 0.1, 0),
    new THREE.Vector3(-0.4, 0.3, 0.05),
    new THREE.Vector3(0, 0.4, 0),
    new THREE.Vector3(0.4, 0.3, -0.05),
    new THREE.Vector3(0.7, 0.1, 0),
  ]), []);
  return (
    <group ref={ref}>
      <mesh><tubeGeometry args={[curve, 32, 0.2, 16, false]}/><meshStandardMaterial color={hovered ? '#ffdead' : '#D4A054'} roughness={0.7}/></mesh>
      <mesh><tubeGeometry args={[curve, 32, 0.22, 8, false]}/><meshStandardMaterial color="#E8B865" roughness={0.8} transparent opacity={0.3}/></mesh>
    </group>
  );
}

function DetailedDonut({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d*0.3; ref.current.rotation.y += hovered ? d*2 : d*0.4; } });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.55,0.28,32,64]}/><meshStandardMaterial color="#D4A054" roughness={0.6}/></mesh>
      <mesh rotation={[Math.PI/2,0,0]} position={[0,0.04,0]}><torusGeometry args={[0.55,0.3,16,64]}/><meshPhysicalMaterial color="#F8BBD0" roughness={0.2} clearcoat={0.5} transparent opacity={0.8}/></mesh>
    </group>
  );
}

function DetailedSandwich({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  return (
    <group ref={ref} rotation={[0,0,-Math.PI/12]}>
      <mesh position={[0,-0.25,0]}><boxGeometry args={[1.2,0.22,0.9]}/><meshStandardMaterial color="#D4A054" roughness={0.8}/></mesh>
      <mesh position={[0,-0.08,0]}><boxGeometry args={[1.25,0.07,0.92]}/><meshStandardMaterial color="#7CB342" roughness={0.6}/></mesh>
      <mesh position={[0,0.0,0]}><boxGeometry args={[1.1,0.05,0.85]}/><meshStandardMaterial color="#FFD54F" roughness={0.5}/></mesh>
      <mesh position={[0,0.08,0]}><boxGeometry args={[1.15,0.1,0.88]}/><meshStandardMaterial color="#8D6E63" roughness={0.7}/></mesh>
      <mesh position={[0,0.22,0]}><boxGeometry args={[1.2,0.22,0.9]}/><meshStandardMaterial color="#C99544" roughness={0.8}/></mesh>
    </group>
  );
}

function DetailedMuffin({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  return (
    <group ref={ref}>
      <mesh position={[0,-0.3,0]}><cylinderGeometry args={[0.5,0.35,0.65,12]}/><meshStandardMaterial color="#E8DDD0" roughness={0.9}/></mesh>
      <mesh position={[0,0.12,0]}><sphereGeometry args={[0.6,16,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#C49A6C" roughness={0.8}/></mesh>
      <mesh position={[-0.2,0.35,0.18]}><sphereGeometry args={[0.07,12,12]}/><meshStandardMaterial color="#2C3E7B"/></mesh>
      <mesh position={[0.18,0.38,-0.12]}><sphereGeometry args={[0.07,12,12]}/><meshStandardMaterial color="#2C3E7B"/></mesh>
    </group>
  );
}

function DetailedSamosa({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  return (
    <group ref={ref}>
      <mesh rotation={[-Math.PI/6,0,0]}><coneGeometry args={[0.7,1.2,3]}/><meshStandardMaterial color="#D4A054" roughness={0.7}/></mesh>
      <mesh rotation={[-Math.PI/6,0,0]} position={[0,0,0.01]}><coneGeometry args={[0.72,1.22,3]}/><meshStandardMaterial color="#C99544" roughness={0.8} transparent opacity={0.3}/></mesh>
    </group>
  );
}

const shelfItems = [
  { id:1, name:'Almond Croissant', price:240, Model:DetailedCroissant },
  { id:2, name:'Glazed Donut',     price:120, Model:DetailedDonut },
  { id:3, name:'Truffle Sandwich', price:350, Model:DetailedSandwich },
  { id:4, name:'Blueberry Muffin', price:160, Model:DetailedMuffin },
  { id:5, name:'Veggie Samosa',    price:80,  Model:DetailedSamosa },
];

export default function FoodShowcase3D() {
  const [cart, setCart] = useState<number>(0);
  return (
    <section style={{ padding:'4rem 2rem', position:'relative' }}>
      <div style={{ position:'absolute', top:'20px', right:'40px', backgroundColor:'#D4A574', color:'#fff', padding:'10px 20px', borderRadius:'30px', fontWeight:'bold', boxShadow:'0 4px 15px rgba(212,165,116,0.3)' }}>
        🛒 {cart} items
      </div>
      <h2 style={{ textAlign:'center', fontSize:'2.8rem', marginBottom:'0.5rem', fontWeight:400 }}>Fresh from the Oven</h2>
      <p style={{ textAlign:'center', color:'#999', marginBottom:'3rem', fontSize:'1rem' }}>Hover to inspect, click to add</p>
      <div style={{ display:'flex', overflowX:'auto', gap:'2rem', padding:'2rem 0', scrollSnapType:'x mandatory' }}>
        {shelfItems.map(item => <ShelfItem key={item.id} item={item} onAdd={() => setCart(c => c+1)} />)}
      </div>
    </section>
  );
}

function ShelfItem({ item, onAdd }: { item: typeof shelfItems[0], onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ minWidth:'280px', height:'400px', backgroundColor:'#fff', borderRadius:'16px',
        boxShadow: hovered ? '0 0 30px rgba(212,165,116,0.3)':'0 4px 10px rgba(0,0,0,0.05)',
        transition:'all 0.3s ease', display:'flex', flexDirection:'column', scrollSnapAlign:'center',
        border: hovered ? '2px solid #D4A574':'2px solid transparent' }}>
      <div style={{ flex:1, position:'relative' }}>
        <Canvas camera={{ position:[0,0.5,3], fov:40 }}>
          <ambientLight intensity={0.6}/><directionalLight position={[5,8,5]} intensity={1.2} color="#ffebd6"/>
          <item.Model hovered={hovered}/><Environment preset="city"/>
        </Canvas>
      </div>
      <div style={{ padding:'1.5rem', textAlign:'center', borderTop:'1px solid #eee' }}>
        <h3 style={{ fontSize:'1.15rem', fontWeight:500, marginBottom:'0.5rem' }}>{item.name}</h3>
        <p style={{ color:'#D4A574', fontWeight:600, fontSize:'1.2rem', marginBottom:'1rem' }}>₹{item.price}</p>
        <button onClick={onAdd}
          style={{ padding:'0.8rem 2rem', backgroundColor:'#2C2C2C', color:'#fff', border:'none', borderRadius:'30px', cursor:'pointer', width:'100%', transition:'background 0.2s' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
