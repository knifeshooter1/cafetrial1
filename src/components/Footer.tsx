import { useEffect, useState } from 'react';

interface FooterProps {
  setCursorVariant: (variant: string) => void;
  setCursorText: (text: string) => void;
}

const Footer = ({ setCursorVariant, setCursorText }: FooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simple logic: Open between 7 AM and 6 PM (18:00)
    const checkStatus = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= 7 && hour < 18);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--bg-offwhite)', 
        color: 'var(--text-charcoal)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50vh', flexWrap: 'wrap' }}>
        
        {/* Info Section */}
        <div style={{ flex: '1 1 50%', padding: '5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem', letterSpacing: '0.05em' }}>Paput Menorca</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: isOpen ? '#A7B6A1' : '#E57373',
              boxShadow: isOpen ? '0 0 10px #A7B6A1' : '0 0 10px #E57373'
            }} />
            <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {isOpen ? 'We are open' : 'We are closed'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>Location</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>123 Minimal St.<br/>08001 Barcelona, ES</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>Hours</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>Mon-Sun<br/>07:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div 
          style={{ flex: '1 1 50%', position: 'relative' }}
          onMouseEnter={() => { setCursorText('MAP'); setCursorVariant('view'); }}
          onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1m2!1s0x12a49816718e30e5%3A0x44b0fb3d4f47660a!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2vw 5vw', borderTop: '1px solid rgba(44,44,44,0.1)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <span>© {new Date().getFullYear()} Paput Menorca. All rights reserved.</span>
        <span>Aesthetic Concept</span>
      </div>
    </footer>
  );
};

export default Footer;
