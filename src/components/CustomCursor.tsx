import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  text: string;
  variant: string;
}

const CustomCursor = ({ text, variant }: CustomCursorProps) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(212, 165, 116, 0.9)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'normal' as const,
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(212, 165, 116, 0.95)',
      border: '2px solid rgba(255, 255, 255, 0.6)',
      color: '#fff',
      mixBlendMode: 'normal' as const,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
    },
    hidden: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      opacity: 0,
    }
  };

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={variant}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        willChange: 'transform',
        boxShadow: '0 0 15px rgba(212, 165, 116, 0.4)'
      }}
    >
      {variant === 'view' && <span>{text}</span>}
    </motion.div>
  );
};

export default CustomCursor;
