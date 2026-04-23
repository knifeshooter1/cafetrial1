import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bases = [
  { name: 'Espresso', price: 150, color: '#3E2723' },
  { name: 'Latte', price: 200, color: '#8D6E63' },
  { name: 'Cappuccino', price: 220, color: '#A1887F' },
  { name: 'Cold Brew', price: 250, color: '#1b0f0b' },
  { name: 'Chai', price: 180, color: '#d4b483' }
];

const milks = [
  { name: 'Whole', price: 0, addsFoam: true },
  { name: 'Oat', price: 50, addsFoam: true },
  { name: 'Almond', price: 50, addsFoam: false },
  { name: 'Soy', price: 40, addsFoam: true },
  { name: 'None', price: 0, addsFoam: false }
];

const sweetnessLevels = [
  { name: 'None', price: 0 },
  { name: 'Light', price: 0 },
  { name: 'Medium', price: 0 },
  { name: 'Sweet', price: 20 }
];

const sizes = [
  { name: 'Small', multiplier: 1, volume: 60 },
  { name: 'Medium', multiplier: 1.3, volume: 80 },
  { name: 'Large', multiplier: 1.6, volume: 100 }
];

export default function DrinkCustomizer() {
  const [base, setBase] = useState(bases[0]);
  const [milk, setMilk] = useState(milks[0]);
  const [sweetness, setSweetness] = useState(sweetnessLevels[1]);
  const [size, setSize] = useState(sizes[1]);

  const totalPrice = useMemo(() => {
    return Math.round((base.price + milk.price + sweetness.price) * size.multiplier);
  }, [base, milk, sweetness, size]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '3rem' }}>Craft Your Cup</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Animated Cup Visual */}
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div style={{ 
            width: '180px', 
            height: '260px', 
            border: '4px solid var(--text-charcoal)', 
            borderRadius: '10px 10px 40px 40px',
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.5)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
          }}>
            {/* Liquid */}
            <motion.div 
              animate={{ 
                height: `${size.volume}%`, 
                backgroundColor: base.color 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                opacity: 0.9
              }}
            />
            {/* Foam */}
            <AnimatePresence>
              {milk.addsFoam && base.name !== 'Cold Brew' && base.name !== 'Espresso' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '20%' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    position: 'absolute',
                    bottom: `${size.volume}%`,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    borderTop: '2px dashed rgba(0,0,0,0.1)'
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Base */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Base</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {bases.map(b => (
                <button key={b.name} onClick={() => setBase(b)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: base.name === b.name ? 'var(--text-charcoal)' : '#fff', color: base.name === b.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Milk */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Milk</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {milks.map(m => (
                <button key={m.name} onClick={() => setMilk(m)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: milk.name === m.name ? 'var(--text-charcoal)' : '#fff', color: milk.name === m.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Sweetness</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sweetnessLevels.map(s => (
                <button key={s.name} onClick={() => setSweetness(s)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: sweetness.name === s.name ? 'var(--text-charcoal)' : '#fff', color: sweetness.name === s.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Size</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sizes.map(sz => (
                <button key={sz.name} onClick={() => setSize(sz)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: size.name === sz.name ? 'var(--text-charcoal)' : '#fff', color: size.name === sz.name ? '#fff' : '#333', cursor: 'pointer' }}>
                  {sz.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total Price:</span>
            <motion.span 
              key={totalPrice}
              initial={{ scale: 1.2, color: 'var(--accent-sage)' }}
              animate={{ scale: 1, color: 'var(--text-charcoal)' }}
              style={{ fontSize: '2rem', fontWeight: 300 }}
            >
              ₹{totalPrice}
            </motion.span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
