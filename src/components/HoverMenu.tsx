import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Cortado', image: '/images/cortado_drink_1776921500332.png' },
  { name: 'Matcha Latte', image: '/images/matcha_latte_1776921628555.png' },
  { name: 'Pour Over', image: '/images/espresso_pour_1776921377016.png' }, // Reusing image
  { name: 'Almond Croissant', image: '/images/artisan_pastry_1776921599098.png' } // Reusing image
];

interface HoverMenuProps {
  setCursorVariant: (variant: string) => void;
}

const HoverMenu = ({ setCursorVariant }: HoverMenuProps) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      style={{ 
        padding: '15vh 5vw', 
        backgroundColor: 'var(--text-charcoal)', 
        color: 'var(--bg-offwhite)',
        minHeight: '80vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      onMouseMove={handleMouseMove}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4rem', opacity: 0.5 }}>
          Menu Selects
        </h2>
        
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {menuItems.map((item, index) => (
            <motion.li 
              key={index}
              style={{ 
                fontSize: 'clamp(3rem, 6vw, 6rem)', 
                fontWeight: 300, 
                borderBottom: '1px solid rgba(249, 249, 249, 0.1)',
                paddingBottom: '1rem',
                position: 'relative',
                display: 'inline-block',
                width: 'fit-content'
              }}
              onMouseEnter={() => {
                setHoveredImage(item.image);
                setCursorVariant('hidden');
              }}
              onMouseLeave={() => {
                setHoveredImage(null);
                setCursorVariant('default');
              }}
              whileHover={{ x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {item.name}
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: mousePos.x + 50, y: mousePos.y - 150 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 50,
              width: '300px',
              height: '400px',
            }}
          >
            <img 
              src={hoveredImage} 
              alt="Menu item" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HoverMenu;
