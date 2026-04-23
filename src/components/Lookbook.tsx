import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LookbookProps {
  setCursorVariant: (variant: string) => void;
  setCursorText: (text: string) => void;
}

const Lookbook = ({ setCursorVariant, setCursorText }: LookbookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleMouseEnter = () => {
    setCursorText('VIEW');
    setCursorVariant('view');
  };

  const handleMouseLeave = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  return (
    <section 
      ref={containerRef}
      style={{ 
        padding: '15vh 5vw', 
        backgroundColor: 'var(--bg-offwhite)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '20px', 
          width: '100%', 
          maxWidth: '1400px' 
        }}
      >
        {/* Item 1 */}
        <motion.div 
          style={{ gridColumn: '2 / 6', y: y1 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src="/images/espresso_pour_1776921377016.png" 
            alt="Espresso Pour" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
          />
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-charcoal)', opacity: 0.7 }}>01 — The Extraction</p>
        </motion.div>

        {/* Item 2 */}
        <motion.div 
          style={{ gridColumn: '8 / 12', marginTop: '20vh', y: y2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src="/images/cafe_interior_1776921103535.png" 
            alt="Cafe Interior" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
          />
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-charcoal)', opacity: 0.7 }}>02 — The Space</p>
        </motion.div>

        {/* Item 3 */}
        <motion.div 
          style={{ gridColumn: '3 / 9', marginTop: '10vh', y: y3 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src="/images/artisan_pastry_1776921599098.png" 
            alt="Artisan Pastry" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
          />
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-charcoal)', opacity: 0.7 }}>03 — The Craft</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Lookbook;
