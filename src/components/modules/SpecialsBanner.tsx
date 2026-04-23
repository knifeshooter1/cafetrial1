import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const specials = [
  { id: 1, name: 'Saffron Pistachio Latte', price: 350 },
  { id: 2, name: 'Truffle Mushroom Toast', price: 450 },
  { id: 3, name: 'Rose Water Croissant', price: 280 }
];

export default function SpecialsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % specials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      style={{ 
        width: '100%', 
        background: 'var(--accent-sage)', 
        color: 'var(--bg-offwhite)',
        padding: '0.75rem 0',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'var(--font-primary)'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ position: 'absolute', left: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        Limited Today
      </div>
      
      <div style={{ position: 'relative', width: '300px', height: '24px', display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: 'absolute', fontWeight: 500, letterSpacing: '0.05em', display: 'flex', gap: '1rem' }}
          >
            <span>{specials[currentIndex].name}</span>
            <span style={{ opacity: 0.8 }}>₹{specials[currentIndex].price}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
