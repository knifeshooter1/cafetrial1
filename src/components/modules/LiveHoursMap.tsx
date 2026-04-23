import { useState, useEffect } from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';

export default function LiveHoursMap() {
  const [status, setStatus] = useState({ text: 'Checking...', color: '#888', isOpen: false });

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // Open 8am to 10pm (22:00)
      if (hours >= 8 && hours < 21) {
        setStatus({ text: 'Open Now', color: '#10B981', isOpen: true }); // Green
      } else if (hours === 21) {
        const minsLeft = 60 - now.getMinutes();
        setStatus({ text: `Closes in ${minsLeft} mins`, color: '#F59E0B', isOpen: true }); // Amber
      } else {
        setStatus({ text: 'Closed', color: '#EF4444', isOpen: false }); // Red
      }
    };
    
    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', fontFamily: 'var(--font-primary)', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
      {/* Map Header */}
      <div style={{ height: '200px', width: '100%', position: 'relative' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.842232976451!2d2.176913!3d41.385063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f056461fb5%3A0x6b6389279ea1df0!2sPla%C3%A7a%20de%20Catalunya!5e0!3m2!1sen!2sus!4v1689100000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
        />
      </div>

      <div style={{ padding: '2rem' }}>
        {/* Status Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${status.color}15`, color: status.color, padding: '0.4rem 1rem', borderRadius: '30px', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: status.color, boxShadow: `0 0 8px ${status.color}` }} />
          {status.text}
        </div>

        {/* Address */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: '#444' }}>
          <MapPin size={20} style={{ color: 'var(--accent-sage)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>Paput Menorca Cafe</p>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', lineHeight: 1.5, color: '#666' }}>123 Minimal St, Floor 1<br/>08001 Barcelona, ES</p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <a href="tel:+34900123456" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', color: 'var(--text-charcoal)', textDecoration: 'none', fontWeight: 500, transition: 'background 0.2s' }}>
            <Phone size={18} /> Call Us
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.8rem', background: 'var(--text-charcoal)', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 500, transition: 'opacity 0.2s' }}>
            Get Directions <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
