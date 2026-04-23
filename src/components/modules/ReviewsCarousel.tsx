import { useState } from 'react';
import { motion } from 'framer-motion';

const reviews = [
  { name: 'Elena R.', text: 'Best pour over I\'ve ever had. The minimalist space is incredibly calming.', rating: 5 },
  { name: 'Marcus T.', text: 'Perfect spot for a quiet morning reading. Their almond croissant is divine.', rating: 5 },
  { name: 'Sarah J.', text: 'Great coffee, lovely staff. Only wish they stayed open a bit later!', rating: 4 },
  { name: 'David L.', text: 'The matcha latte is perfectly balanced. Highly recommend the truffle sandwich.', rating: 5 },
  { name: 'Priya M.', text: 'Aesthetic heaven. Every corner is photogenic and the espresso hits the spot.', rating: 5 },
  { name: 'Tom H.', text: 'Solid cold brew. Great ambiance but can get busy on weekends.', rating: 4 },
];

export default function ReviewsCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section style={{ padding: '4rem 0', overflow: 'hidden', backgroundColor: '#F9F9F9' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', fontWeight: 300 }}>What Locals Say</h2>
      
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ display: 'flex', position: 'relative', width: '100%' }}
      >
        <motion.div
          animate={{ x: isPaused ? undefined : ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          style={{ display: 'flex', gap: '2rem', padding: '0 2rem' }}
        >
          {/* Double the reviews array for seamless looping */}
          {[...reviews, ...reviews].map((review, idx) => (
            <div key={idx} style={{ 
              minWidth: '300px', 
              backgroundColor: '#fff', 
              padding: '2rem', 
              borderRadius: '12px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#A7B6A1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 500 }}>{review.name}</div>
                  <div style={{ color: '#FFD700', fontSize: '0.9rem' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                </div>
              </div>
              <p style={{ color: '#666', lineHeight: 1.6, fontStyle: 'italic' }}>"{review.text}"</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="#" style={{ color: '#2C2C2C', textDecoration: 'underline', fontWeight: 500 }}>See all reviews on Google</a>
      </div>
    </section>
  );
}
