import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  { id: 1, url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', span: 'col-span-2 row-span-2' },
  { id: 2, url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 3, url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 4, url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-2' },
  { id: 5, url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 6, url: 'https://images.unsplash.com/photo-1501339817309-1d61f10b28fd?auto=format&fit=crop&w=800&q=80', span: 'col-span-2 row-span-1' }
];

export default function AmbienceGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div style={{ padding: '6rem 5vw', background: 'var(--bg-offwhite)', fontFamily: 'var(--font-primary)' }}>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
        
        {/* Story */}
        <div style={{ flex: '1 1 300px', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.1 }}>The<br/>Paput<br/>Atmosphere</h2>
          <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem' }}>
            Our space is designed to be a sanctuary. We blend soft industrial brushed concrete with warm, inviting wood textures. 
            The golden hour light spills through our large windows, illuminating the delicate latte art and freshly baked pastries. 
            It's not just about the coffee; it's about the moment you take for yourself.
          </p>
        </div>

        {/* Masonry Grid */}
        <div style={{ flex: '2 1 600px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', gridAutoRows: '200px' }}>
          {images.map(img => (
            <motion.div 
              key={img.id}
              whileHover={{ scale: 0.98, opacity: 0.9 }}
              onClick={() => setSelectedImg(img.url)}
              style={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                // A simple approach to CSS grid masonry styling inline
                gridColumnEnd: img.span.includes('col-span-2') ? 'span 2' : 'span 1',
                gridRowEnd: img.span.includes('row-span-2') ? 'span 2' : 'span 1'
              }}
            >
              <img src={img.url} alt="Ambience" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <button onClick={() => setSelectedImg(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              alt="Expanded" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
