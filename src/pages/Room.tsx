import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';

const Room = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-offwhite)', position: 'relative' }}>
      <CustomCursor text={cursorText} variant={cursorVariant} />
      
      <div style={{ position: 'fixed', top: '40px', left: '5vw', zIndex: 100 }}>
        <Link 
          to="/"
          onMouseEnter={() => { setCursorText('BACK'); setCursorVariant('view'); }}
          onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
          style={{ 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            padding: '10px 20px',
            border: '1px solid var(--text-charcoal)',
            borderRadius: '2px',
            color: 'var(--text-charcoal)'
          }}
        >
          Return
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20vh 5vw 10vh' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '2rem', textAlign: 'center' }}
        >
          A Comforting Corner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ maxWidth: '600px', textAlign: 'center', lineHeight: 1.8, marginBottom: '4rem', opacity: 0.8 }}
        >
          Our cafe extends beyond the cup. We've curated a space designed for quiet reflection, reading, and deep conversations. 
          Settle into our plush seating, bathed in warm golden hour lighting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          style={{ width: '100%', maxWidth: '1000px', overflow: 'hidden', borderRadius: '4px' }}
          onMouseEnter={() => { setCursorText('RELAX'); setCursorVariant('view'); }}
          onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
        >
          <img 
            src="/images/comforting_room_1776923783362.png" 
            alt="Comforting Cafe Room" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Room;
