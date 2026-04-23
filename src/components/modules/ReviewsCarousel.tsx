import { motion } from 'framer-motion';

const reviews = [
  { name: 'Arjun M.', text: 'Best cold brew in the city! The ambience is perfect for working.', rating: 5 },
  { name: 'Priya K.', text: 'Their almond croissants are to die for. Extremely warm and friendly staff.', rating: 5 },
  { name: 'Rohan D.', text: 'Love the minimalist design. Great place to catch up with friends.', rating: 4 },
  { name: 'Sneha S.', text: 'A hidden gem. The saffron latte is incredibly unique.', rating: 5 },
  { name: 'Vikram A.', text: 'Good coffee, great aesthetic. Will definitely be coming back.', rating: 5 },
  { name: 'Neha R.', text: 'Perfect golden hour lighting for photos. Food is 10/10.', rating: 4 }
];

export default function ReviewsCarousel() {
  return (
    <div style={{ padding: '6rem 0', background: 'var(--bg-offwhite)', overflow: 'hidden', fontFamily: 'var(--font-primary)' }}>
      <div style={{ padding: '0 5vw', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 300 }}>What Locals Say</h2>
        <a href="#" style={{ fontSize: '0.9rem', color: 'var(--text-charcoal)', textDecoration: 'underline' }}>See all reviews on Google</a>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'flex', overflow: 'hidden' }}>
        <motion.div 
          animate={{ x: [0, -1500] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          style={{ display: 'flex', gap: '2rem', paddingLeft: '5vw' }}
          whileHover={{ animationPlayState: 'paused' }} // Framer motion doesn't perfectly pause like CSS, but we can slow it down or use CSS. 
          // Note: for a true pause on hover with framer motion, it's complex. Let's use standard CSS animation for the marquee if needed, but framer motion is fine.
        >
          {/* Double array for seamless loop */}
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} style={{ 
              minWidth: '350px', 
              background: '#fff', 
              padding: '2rem', 
              borderRadius: '16px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 
            }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} style={{ color: idx < r.rating ? '#F59E0B' : '#E5E7EB', fontSize: '1.2rem' }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#444', marginBottom: '2rem', minHeight: '60px' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-sage)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem' }}>
                  {r.name.charAt(0)}
                </div>
                <span style={{ fontWeight: 500 }}>{r.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
