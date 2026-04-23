import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  text?: string;
  variant?: string;
}

const CustomCursor = ({ variant }: CustomCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Smooth lag variables
  const lagPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      }

      // Check if hovering clickable
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, [role="button"], canvas, img');
      setIsHovering(!!clickable || variant === 'view');
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, [variant]);

  useEffect(() => {
    const animateRing = () => {
      // Lerp for the lag ring
      lagPos.current.x += (mousePosition.x - lagPos.current.x) * 0.15;
      lagPos.current.y += (mousePosition.y - lagPos.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${lagPos.current.x - 14}px, ${lagPos.current.y - 14}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animateRing);
    };
    
    requestRef.current = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePosition]);

  return (
    <>
      {/* The solid dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '12px', height: '12px',
          background: '#b0e0e6', // Warm amber/cream
          border: '2px solid #8baeb3',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform'
        }}
      />

      {/* The trailing ring */}
      <motion.div
        ref={ringRef}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.4 : 1,
          borderColor: isHovering ? '#fca311' : '#b0e0e6'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: '28px', height: '28px',
          border: '2px solid #b0e0e6',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform, scale, opacity',
          boxSizing: 'border-box'
        }}
      />
    </>
  );
};

export default CustomCursor;
