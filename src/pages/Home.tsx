import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Hero from '../components/Hero';
import Lookbook from '../components/Lookbook';
import HoverMenu from '../components/HoverMenu';
import CraftSection from '../components/CraftSection';
import Footer from '../components/Footer';

const Home = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor text={cursorText} variant={cursorVariant} />
      
      {/* Floating Link to Room */}
      <div style={{ position: 'fixed', top: '40px', right: '5vw', zIndex: 100 }}>
        <Link 
          to="/room"
          onMouseEnter={() => { setCursorText('VISIT'); setCursorVariant('view'); }}
          onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
          style={{ 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            padding: '10px 20px',
            border: '1px solid var(--text-charcoal)',
            borderRadius: '2px',
            background: 'transparent',
            mixBlendMode: 'difference',
            color: '#fff',
            borderColor: '#fff'
          }}
        >
          Our Room
        </Link>
      </div>

      <Hero setCursorVariant={setCursorVariant} />
      <Lookbook setCursorVariant={setCursorVariant} setCursorText={setCursorText} />
      <HoverMenu setCursorVariant={setCursorVariant} />
      <CraftSection />
      <Footer setCursorVariant={setCursorVariant} setCursorText={setCursorText} />
    </>
  );
};

export default Home;
