import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const bases = [
  { name:'Espresso',  color:'#3E2723', price:150 },
  { name:'Latte',     color:'#D7CCC8', price:200 },
  { name:'Matcha',    color:'#81C784', price:250 },
  { name:'Cold Brew', color:'#4E342E', price:180 },
];
const milks = [
  { name:'Whole',  foam:true,  price:0 },
  { name:'Oat',    foam:true,  price:50 },
  { name:'Almond', foam:false, price:50 },
];
const sizes = [
  { name:'Small',  scale:0.7, price:0 },
  { name:'Medium', scale:0.9, price:40 },
  { name:'Large',  scale:1.1, price:80 },
];

function CustomCup({ baseColor, foam, cupScale }: { baseColor:string, foam:boolean, cupScale:number }) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    if (liquidRef.current) {
      const mat = liquidRef.current.material as THREE.MeshStandardMaterial;
      mat.color.lerp(new THREE.Color(baseColor), 0.08);
    }
  });
  return (
    <group ref={groupRef} scale={cupScale}>
      {/* Cup outer body — solid opaque ceramic */}
      <mesh castShadow>
        <cylinderGeometry args={[1.1, 0.85, 2.2, 48]} />
        <meshPhysicalMaterial color="#e8e4df" roughness={0.12} clearcoat={0.3} />
      </mesh>
      {/* Liquid filling inside */}
      <mesh ref={liquidRef} position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.0, 0.78, 2.0, 48]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>
      {/* Foam layer on top */}
      {foam && (
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[1.02, 0.98, 0.15, 48]} />
          <meshStandardMaterial color="#fff" roughness={0.9} />
        </mesh>
      )}
      {/* Handle */}
      <mesh position={[1.05, 0.0, 0]} rotation={[0, 0, -Math.PI / 10]}>
        <torusGeometry args={[0.45, 0.08, 12, 48, Math.PI]} />
        <meshPhysicalMaterial color="#e8e4df" roughness={0.12} clearcoat={0.3} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -1.18, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.6, 1.4, 0.1, 48]} />
        <meshPhysicalMaterial color="#A7B6A1" roughness={0.25} clearcoat={0.2} />
      </mesh>
    </group>
  );
}

export default function DrinkCustomizer() {
  const [base, setBase] = useState(bases[0]);
  const [milk, setMilk] = useState(milks[0]);
  const [size, setSize] = useState(sizes[1]);
  const totalPrice = base.price + milk.price + size.price;

  const btnStyle = (active:boolean): React.CSSProperties => ({
    padding:'0.8rem 1.5rem', borderRadius:'8px', border:'1px solid #ddd',
    backgroundColor: active ? '#2C2C2C':'#fff', color: active ? '#fff':'#333',
    cursor:'pointer', transition:'all 0.2s',
  });

  return (
    <section style={{ display:'flex', flexWrap:'wrap', backgroundColor:'#F9F9F9', borderRadius:'16px', overflow:'hidden', margin:'2rem 0', border:'1px solid #eaeaea' }}>
      <div style={{ flex:'1 1 400px', height:'500px', position:'relative', backgroundColor:'#e8e4df' }}>
        <Canvas camera={{ position:[0,2,6], fov:40 }}>
          <ambientLight intensity={0.7}/>
          <directionalLight position={[5,10,5]} intensity={1.2} color="#ffebd6"/>
          <directionalLight position={[-3,4,-5]} intensity={0.4} color="#a7b6a1"/>
          <CustomCup baseColor={base.color} foam={milk.foam} cupScale={size.scale}/>
          <Environment preset="city"/>
        </Canvas>
        <div style={{ position:'absolute', top:'20px', right:'20px', backgroundColor:'#fff', padding:'12px 24px', borderRadius:'30px', fontWeight:600, fontSize:'1.6rem', color:'#D4A574', boxShadow:'0 4px 15px rgba(0,0,0,0.08)' }}>
          ₹{totalPrice}
        </div>
      </div>
      <div style={{ flex:'1 1 400px', padding:'3rem', display:'flex', flexDirection:'column', gap:'2rem' }}>
        <h2 style={{ fontSize:'2.2rem', fontWeight:400 }}>Build Your Drink</h2>
        <p style={{ color:'#999', fontSize:'0.95rem' }}>Customize every detail and watch it come to life</p>
        <div>
          <h4 style={{ marginBottom:'1rem', color:'#888', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'0.1em' }}>Base</h4>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {bases.map(b => <button key={b.name} onClick={() => setBase(b)} style={btnStyle(base.name===b.name)}>{b.name}</button>)}
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom:'1rem', color:'#888', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'0.1em' }}>Milk</h4>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {milks.map(m => <button key={m.name} onClick={() => setMilk(m)} style={btnStyle(milk.name===m.name)}>{m.name}</button>)}
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom:'1rem', color:'#888', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'0.1em' }}>Size</h4>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {sizes.map(s => <button key={s.name} onClick={() => setSize(s)} style={btnStyle(size.name===s.name)}>{s.name}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
