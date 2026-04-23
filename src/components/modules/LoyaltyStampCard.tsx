import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export default function LoyaltyStampCard() {
  const [stamps, setStamps] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('cafe_loyalty_stamps');
    if (saved) setStamps(parseInt(saved, 10));
  }, []);

  const addStamp = () => {
    const newStamps = stamps >= 10 ? 1 : stamps + 1;
    setStamps(newStamps);
    localStorage.setItem('cafe_loyalty_stamps', newStamps.toString());
  };

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '3rem 2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', fontFamily: 'var(--font-primary)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>Your Loyalty Card</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          {stamps >= 10 ? "You've earned a free drink!" : `${10 - stamps} more visits until your next free drink.`}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ 
            aspectRatio: '1', 
            borderRadius: '50%', 
            border: '2px dashed #ddd', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            background: i < stamps ? 'var(--bg-offwhite)' : 'transparent'
          }}>
            {i < stamps && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Coffee size={32} color={i === 9 ? 'var(--accent-sage)' : 'var(--text-charcoal)'} />
              </motion.div>
            )}
            {i === 9 && stamps < 10 && (
              <span style={{ position: 'absolute', fontSize: '0.7rem', color: '#aaa', fontWeight: 600 }}>FREE</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(stamps / 10) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ height: '100%', background: 'var(--accent-sage)' }}
        />
      </div>

      <button 
        onClick={addStamp}
        style={{
          width: '100%',
          padding: '1rem',
          background: 'var(--text-charcoal)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        {stamps >= 10 ? 'Redeem & Reset' : 'Add a Visit'}
      </button>
    </div>
  );
}
