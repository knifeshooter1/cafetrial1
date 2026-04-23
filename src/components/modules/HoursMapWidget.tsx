import { useState, useEffect } from 'react';

export default function HoursMapWidget() {
  const [status, setStatus] = useState({ text: 'Checking...', color: '#666' });

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour >= 8 && hour < 21) {
        // Open
        if (hour === 20) {
          setStatus({ text: `Closes in ${60 - now.getMinutes()} minutes`, color: '#F59E0B' }); // Amber
        } else {
          setStatus({ text: 'Open Now', color: '#10B981' }); // Green
        }
      } else {
        setStatus({ text: 'Closed', color: '#EF4444' }); // Red
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eaeaea', margin: '2rem 0' }}>
      
      {/* Info Side */}
      <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: status.color, boxShadow: `0 0 10px ${status.color}` }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 500, color: status.color }}>{status.text}</span>
          <span style={{ color: '#999', fontSize: '0.9rem', marginLeft: 'auto' }}>8:00 AM - 9:00 PM Daily</span>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>Paput Menorca</h3>
        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
          123 Minimalist Avenue<br/>
          08001 Barcelona, Spain
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="tel:+34123456789" style={{ flex: 1, textAlign: 'center', padding: '0.8rem', backgroundColor: '#2C2C2C', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Call Us</a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', padding: '0.8rem', backgroundColor: '#f0f0f0', color: '#2C2C2C', borderRadius: '8px', textDecoration: 'none' }}>Directions</a>
        </div>
      </div>

      {/* Map Side */}
      <div style={{ flex: '1 1 400px', minHeight: '300px', position: 'relative' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.842232976451!2d2.176913!3d41.385063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f056461fb5%3A0x6b6389279ea1df0!2sPla%C3%A7a%20de%20Catalunya!5e0!3m2!1sen!2sus!4v1689100000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, position: 'absolute', inset: 0 }} 
          allowFullScreen 
          loading="lazy" 
        />
      </div>
    </div>
  );
}
