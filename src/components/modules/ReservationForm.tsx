import { useState } from 'react';
import { motion } from 'framer-motion';

const timeslots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: '', time: '', size: 2, name: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div style={{ padding: '3rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', maxWidth: '500px', margin: '2rem auto' }}>
      {step === 1 ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center' }}>Reserve a Table</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#666' }}>Date</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#666' }}>Time</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {timeslots.map(t => (
                <button 
                  key={t} type="button" 
                  onClick={() => setFormData({...formData, time: t})}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    border: '1px solid #ccc',
                    backgroundColor: formData.time === t ? '#2C2C2C' : 'transparent',
                    color: formData.time === t ? '#fff' : '#2C2C2C',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#666' }}>Party Size: {formData.size}</label>
            <input type="range" min="1" max="10" value={formData.size} onChange={e => setFormData({...formData, size: parseInt(e.target.value)})} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ flex: 1, padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="tel" placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ flex: 1, padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <button type="submit" style={{ padding: '1rem', backgroundColor: '#A7B6A1', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}>
            Request Booking
          </button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '3rem' }}>✅</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 300 }}>Reservation Confirmed</h2>
          <p style={{ color: '#666' }}>Thank you, {formData.name}! We'll see you on {formData.date} at {formData.time} for a party of {formData.size}.</p>
          <a 
            href={`https://wa.me/?text=I've booked a table at Paput Menorca for ${formData.size} on ${formData.date} at ${formData.time}!`}
            target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', padding: '0.8rem 1.5rem', backgroundColor: '#25D366', color: '#fff', borderRadius: '30px', textDecoration: 'none', marginTop: '1rem' }}
          >
            Share on WhatsApp
          </a>
          <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', marginTop: '1rem', textDecoration: 'underline' }}>Make another booking</button>
        </motion.div>
      )}
    </div>
  );
}
