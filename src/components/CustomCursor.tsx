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
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: 'rgba(44, 44, 44, 1)',
      mixBlendMode: 'normal' as any,
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(249, 249, 249, 0.9)',
      color: '#2C2C2C',
      mixBlendMode: 'normal' as any,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 500,
    },
    hidden: {
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
        willChange: 'transform'
      }}
    >
      {variant === 'view' && <span>{text}</span>}
    </motion.div>
  );
};

export default CustomCursor;
