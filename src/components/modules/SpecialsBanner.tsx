import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const specials = [
  { title: 'Ethiopian Yirgacheffe Pour Over', price: '₹280', label: 'Single Origin Focus' },
  { title: 'Pistachio Rose Croissant', price: '₹260', label: 'Limited Today' },
  { title: 'Cascara Fizz', price: '₹220', label: 'Summer Refresh' }
];

export default function SpecialsBanner() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % specials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        backgroundColor: '#A7B6A1',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        margin: '2rem 0'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', width: '100%' }}
        >
          <span style={{ backgroundColor: '#2C2C2C', color: '#fff', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {specials[index].label}
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{specials[index].title}</span>
          <span style={{ fontWeight: 600, transition: 'all 0.3s' }}>{specials[index].price}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
