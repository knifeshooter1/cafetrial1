import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor.tsx';
import Hero from './components/Hero.tsx';
import Lookbook from './components/Lookbook.tsx';
import HoverMenu from './components/HoverMenu.tsx';
import CraftSection from './components/CraftSection.tsx';
import Footer from './components/Footer.tsx'; // Trigger TS update

function App() {
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
      <Hero setCursorVariant={setCursorVariant} setCursorText={setCursorText} />
      <Lookbook setCursorVariant={setCursorVariant} setCursorText={setCursorText} />
      <HoverMenu setCursorVariant={setCursorVariant} />
      <CraftSection />
      <Footer setCursorVariant={setCursorVariant} setCursorText={setCursorText} />
    </>
  );
}

export default App;
