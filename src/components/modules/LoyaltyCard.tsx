import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoyaltyCard() {
  const [stamps, setStamps] = useState(0);
  const totalStamps = 10;

  useEffect(() => {
    const saved = localStorage.getItem('cafe_loyalty_stamps');
    if (saved) {
      setStamps(parseInt(saved, 10));
    }
  }, []);

  const addStamp = () => {
    if (stamps < totalStamps) {
      const newStamps = stamps + 1;
      setStamps(newStamps);
      localStorage.setItem('cafe_loyalty_stamps', newStamps.toString());
    }
  };

  const resetStamps = () => {
    setStamps(0);
    localStorage.removeItem('cafe_loyalty_stamps');
  };

  return (
    <div style={{ backgroundColor: '#F9F9F9', padding: '3rem', borderRadius: '16px', border: '1px solid #eaeaea', margin: '2rem 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem', fontWeight: 300 }}>Your Loyalty Card</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        {stamps >= totalStamps ? "You've earned a free drink!" : `${totalStamps - stamps} visits until your next reward.`}
      </p>

      {/* Stamp grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[...Array(totalStamps)].map((_, i) => (
          <div 
            key={i} 
            style={{ 
              aspectRatio: '1/1', 
              borderRadius: '50%', 
              border: '2px dashed #ccc', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: i < stamps ? '#A7B6A1' : 'transparent',
              transition: 'background-color 0.3s ease'
            }}
          >
            {i < stamps && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{ fontSize: '1.5rem' }}
              >
                ☕
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(stamps / totalStamps) * 100}%` }}
          style={{ height: '100%', backgroundColor: '#2C2C2C' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {stamps < totalStamps ? (
          <button 
            onClick={addStamp}
            style={{ padding: '0.8rem 2rem', backgroundColor: '#2C2C2C', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem' }}
          >
            Add a Visit
          </button>
        ) : (
          <button 
            onClick={resetStamps}
            style={{ padding: '0.8rem 2rem', backgroundColor: '#A7B6A1', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem' }}
          >
            Claim Free Drink & Reset
          </button>
        )}
      </div>
    </div>
  );
}
