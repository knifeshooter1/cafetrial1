import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const images = [
  '/images/cafe_interior_1776921103535.png',
  '/images/espresso_pour_1776921377016.png',
  '/images/artisan_pastry_1776921599098.png',
  '/images/comforting_room_1776923783362.png'
];

export default function AmbienceGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '3rem', margin: '2rem 0' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 300 }}>Our Story</h2>
        <p style={{ color: '#666', lineHeight: 1.8 }}>
          Rooted in the minimalist aesthetics of Menorca, our café is designed as a sanctuary. 
          We believe in the power of negative space, warm lighting, and meticulously sourced ingredients. 
          Every detail, from our brushed concrete counters to the delicate latte art, is crafted to provide a moment of calm.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {images.map((src, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 0.98, opacity: 0.9 }}
            onClick={() => setSelectedImage(src)}
            style={{ 
              cursor: 'zoom-in', 
              aspectRatio: idx % 3 === 0 ? '1/1.2' : '1/1', // Masonry-like variation
              borderRadius: '8px', 
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Warm overlay tone */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(167, 182, 161, 0.1)', zIndex: 1, pointerEvents: 'none' }} />
            <img src={src} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{ 
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', 
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '2rem'
            }}
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              alt="Expanded" 
              style={{ maxHeight: '90vh', maxWidth: '100%', borderRadius: '4px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
