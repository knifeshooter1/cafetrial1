import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CraftSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section 
      ref={ref}
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        position: 'relative',
        backgroundColor: 'var(--bg-offwhite)',
        overflow: 'hidden'
      }}
    >
      {/* Background Video (Simulated with image/gradient for placeholder if no network) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
        >
          {/* Fallback open source video link for demo */}
          <source src="https://cdn.pixabay.com/video/2020/05/26/40149-425265697_large.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ display: 'flex', width: '100%', zIndex: 10, padding: '10vh 5vw' }}>
        {/* Left Side - Empty / Spacer */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ color: '#fff', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Origin: Ethiopia Yirgacheffe
          </motion.div>
        </div>

        {/* Right Side - Glassmorphism Card */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '4rem 3rem',
              borderRadius: '2px',
              maxWidth: '500px',
              color: '#fff'
            }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem' }}>The Process</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, fontWeight: 300 }}>
              We source our beans from high-altitude farms, prioritizing sustainable practices and fair trade. 
              Each batch is roasted locally in small quantities to ensure the delicate tasting notes of jasmine 
              and bergamot are perfectly preserved. Our commitment is to the craft, from soil to cup.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
