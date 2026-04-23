import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

function CupModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*2 : d*0.3; });
  return (
    <group ref={ref}>
      <mesh position={[0,-0.3,0]} castShadow><cylinderGeometry args={[0.75,0.55,1.4,32]}/><meshPhysicalMaterial color="#F5F0EB" roughness={0.15} clearcoat={0.3}/></mesh>
      <mesh position={[0,0.1,0]}><cylinderGeometry args={[0.68,0.5,1.0,32]}/><meshStandardMaterial color="#4A2C17" roughness={0.7}/></mesh>
      <mesh position={[0,0.36,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[0.08,0.25,32]}/><meshStandardMaterial color="#C8A882" transparent opacity={0.6}/></mesh>
      <mesh position={[0.85,-0.15,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.3,0.07,16,32]}/><meshPhysicalMaterial color="#F5F0EB" roughness={0.15} clearcoat={0.3}/></mesh>
      <mesh position={[0,-1.05,0]} castShadow><cylinderGeometry args={[1.2,1.0,0.08,32]}/><meshPhysicalMaterial color="#A7B6A1" roughness={0.25}/></mesh>
    </group>
  );
}

function CroissantModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.8, 0.1, 0),
    new THREE.Vector3(-0.5, 0.35, 0.05),
    new THREE.Vector3(0, 0.45, 0),
    new THREE.Vector3(0.5, 0.35, -0.05),
    new THREE.Vector3(0.8, 0.1, 0),
  ]), []);
  return (
    <group ref={ref}>
      <mesh><tubeGeometry args={[curve, 32, 0.22, 16, false]}/><meshStandardMaterial color="#D4A054" roughness={0.7}/></mesh>
      <mesh><tubeGeometry args={[curve, 32, 0.24, 8, false]}/><meshStandardMaterial color="#E8B865" roughness={0.8} transparent opacity={0.3}/></mesh>
      <mesh position={[-0.8, 0.1, 0]}><coneGeometry args={[0.18, 0.3, 8]}/><meshStandardMaterial color="#C99544" roughness={0.7}/></mesh>
      <mesh position={[0.8, 0.1, 0]}><coneGeometry args={[0.18, 0.3, 8]}/><meshStandardMaterial color="#C99544" roughness={0.7}/></mesh>
    </group>
  );
}

function CakeModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  return (
    <group ref={ref}>
      <mesh position={[0,-0.4,0]}><cylinderGeometry args={[0.8,0.8,0.5,6]}/><meshStandardMaterial color="#E8D5B7" roughness={0.8}/></mesh>
      <mesh position={[0,-0.1,0]}><cylinderGeometry args={[0.82,0.82,0.1,6]}/><meshStandardMaterial color="#F5E6D3" roughness={0.5}/></mesh>
      <mesh position={[0,0.2,0]}><cylinderGeometry args={[0.78,0.78,0.4,6]}/><meshStandardMaterial color="#D4A574" roughness={0.6}/></mesh>
      <mesh position={[0,0.5,0]}><sphereGeometry args={[0.15,16,16]}/><meshStandardMaterial color="#8B2252" roughness={0.4}/></mesh>
    </group>
  );
}

function MuffinModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  return (
    <group ref={ref}>
      <mesh position={[0,-0.3,0]}><cylinderGeometry args={[0.55,0.4,0.7,12]}/><meshStandardMaterial color="#E8DDD0" roughness={0.9}/></mesh>
      <mesh position={[0,0.15,0]}><sphereGeometry args={[0.65,16,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#C49A6C" roughness={0.8}/></mesh>
      <mesh position={[-0.25,0.35,0.2]}><sphereGeometry args={[0.08,12,12]}/><meshStandardMaterial color="#2C3E7B"/></mesh>
      <mesh position={[0.2,0.4,-0.15]}><sphereGeometry args={[0.08,12,12]}/><meshStandardMaterial color="#2C3E7B"/></mesh>
    </group>
  );
}

function SandwichModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += hovered ? d*1.5 : d*0.3; });
  return (
    <group ref={ref} rotation={[0,0,-Math.PI/12]}>
      <mesh position={[0,-0.3,0]}><boxGeometry args={[1.3,0.25,1.0]}/><meshStandardMaterial color="#D4A054" roughness={0.8}/></mesh>
      <mesh position={[0,-0.12,0]}><boxGeometry args={[1.35,0.08,1.05]}/><meshStandardMaterial color="#7CB342" roughness={0.6}/></mesh>
      <mesh position={[0,-0.02,0]}><boxGeometry args={[1.2,0.06,0.95]}/><meshStandardMaterial color="#FFD54F" roughness={0.5}/></mesh>
      <mesh position={[0,0.08,0]}><boxGeometry args={[1.25,0.12,0.98]}/><meshStandardMaterial color="#8D6E63" roughness={0.7}/></mesh>
      <mesh position={[0,0.25,0]}><boxGeometry args={[1.3,0.25,1.0]}/><meshStandardMaterial color="#C99544" roughness={0.8}/></mesh>
    </group>
  );
}

function DonutModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d*0.3; ref.current.rotation.y += hovered ? d*2 : d*0.5; } });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.6,0.3,32,64]}/><meshStandardMaterial color="#D4A054" roughness={0.6}/></mesh>
      <mesh rotation={[Math.PI/2,0,0]} position={[0,0.05,0]}><torusGeometry args={[0.6,0.32,16,64]}/><meshPhysicalMaterial color="#F8BBD0" roughness={0.2} clearcoat={0.5} transparent opacity={0.8}/></mesh>
    </group>
  );
}

const menuItems = [
  { id:1, name:'House Latte',       price:'₹220', ing:'Espresso, Steamed Milk, Latte Art',     Model:CupModel },
  { id:2, name:'Butter Croissant',  price:'₹180', ing:'French Butter, Flour, Yeast',           Model:CroissantModel },
  { id:3, name:'Berry Cake Slice',  price:'₹260', ing:'Sponge, Vanilla Cream, Berry',          Model:CakeModel },
  { id:4, name:'Blueberry Muffin',  price:'₹160', ing:'Flour, Blueberries, Brown Sugar',       Model:MuffinModel },
  { id:5, name:'Truffle Sandwich',  price:'₹350', ing:'Sourdough, Mushroom, Truffle Oil',      Model:SandwichModel },
  { id:6, name:'Strawberry Donut',  price:'₹150', ing:'Brioche, Strawberry Glaze, Sprinkles',  Model:DonutModel },
];

export default function MenuCards3D() {
  const [activeId, setActiveId] = useState<number|null>(null);
  return (
    <section style={{ padding:'4rem 2rem', backgroundColor:'#F9F9F9' }}>
      <h2 style={{ textAlign:'center', fontSize:'2.8rem', marginBottom:'0.5rem', fontWeight:400 }}>Interactive Menu</h2>
      <p style={{ textAlign:'center', color:'#999', marginBottom:'3rem', fontSize:'1rem', letterSpacing:'0.05em' }}>Click any item to reveal details</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'2rem', maxWidth:'1200px', margin:'0 auto' }}>
        {menuItems.map(item => {
          const isClicked = activeId === item.id;
          return <MenuCard key={item.id} item={item} isClicked={isClicked} onClick={() => setActiveId(isClicked ? null : item.id)} />;
        })}
      </div>
    </section>
  );
}

function MenuCard({ item, isClicked, onClick }: { item: typeof menuItems[0], isClicked: boolean, onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} whileHover={{ y:-5 }}
      style={{ height:'400px', backgroundColor:'#fff', borderRadius:'16px', overflow:'hidden', cursor:'pointer', boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.12)':'0 4px 15px rgba(0,0,0,0.04)', transition:'box-shadow 0.3s ease', position:'relative' }}>
      <div style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
        <Canvas camera={{ position:[0,0.5,4], fov:40 }}>
          <ambientLight intensity={0.6}/><directionalLight position={[5,8,5]} intensity={1.2} color="#ffebd6"/><directionalLight position={[-3,4,-5]} intensity={0.4} color="#a7b6a1"/>
          <item.Model hovered={hovered}/><Environment preset="city"/>
        </Canvas>
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.2rem 1.5rem', background:'linear-gradient(transparent, rgba(255,255,255,0.95))', pointerEvents:'none' }}>
        <h3 style={{ fontSize:'1.1rem', fontWeight:500 }}>{item.name}</h3>
      </div>
      <AnimatePresence>
        {isClicked && (
          <motion.div initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:50 }}
            style={{ position:'absolute', bottom:0, left:0, right:0, backgroundColor:'rgba(44,44,44,0.95)', color:'#fff', padding:'2rem', backdropFilter:'blur(10px)' }}>
            <h3 style={{ fontSize:'1.4rem', marginBottom:'0.5rem', fontWeight:500 }}>{item.name}</h3>
            <p style={{ fontSize:'1.3rem', color:'#D4A574', marginBottom:'1rem', fontWeight:600 }}>{item.price}</p>
            <p style={{ fontSize:'0.85rem', opacity:0.7 }}>{item.ing}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
