import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  text?: string;
  variant?: string;
}

const CustomCursor = ({ text, variant }: CustomCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add global style to hide default cursor
    document.body.style.cursor = 'none';
    
    // Add listeners for clickable elements to trigger hover state globally if we want
    // But since `variant` is passed down, we'll rely on the parent or just use a global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const isView = variant === 'view';
  const isActive = isHovering || isView;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isActive ? 0 : 1,
          opacity: isView ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: '12px', height: '12px',
          backgroundColor: '#d4b483', border: '2px solid #b39462', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 10000, mixBlendMode: 'difference' // Added difference blend mode for contrast against any background
        }}
      />
      
      {/* Outer Trailing Ring */}
      <motion.div
        animate={{
          x: isActive ? (isView ? mousePosition.x - 40 : mousePosition.x - 24) : mousePosition.x - 14,
          y: isActive ? (isView ? mousePosition.y - 40 : mousePosition.y - 24) : mousePosition.y - 14,
          width: isActive ? (isView ? '80px' : '48px') : '28px',
          height: isActive ? (isView ? '80px' : '48px') : '28px',
          backgroundColor: isView ? 'rgba(212, 180, 131, 0.9)' : 'transparent',
          border: isView ? 'none' : '2px solid #d4b483',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          mixBlendMode: 'difference'
        }}
      >
        {isView && <span style={{ color: '#000', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}>{text}</span>}
      </motion.div>
    </>
  );
};

export default CustomCursor;
