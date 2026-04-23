import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Send } from 'lucide-react';

export default function TableReservation() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleWhatsApp = () => {
    const text = `Hi, I've booked a table at Paput Cafe for ${partySize} people on ${date} at ${time}. Name: ${name}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '2rem' }}>Reserve a Table</h2>
      
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}><Calendar size={16}/> Date</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit' }} />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}><Clock size={16}/> Time</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {timeSlots.map(t => (
                    <button type="button" key={t} onClick={() => setTime(t)} style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid var(--text-charcoal)', background: time === t ? 'var(--text-charcoal)' : 'transparent', color: time === t ? '#fff' : 'var(--text-charcoal)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}><Users size={16}/> Party Size (1-10)</label>
                <input type="range" min="1" max="10" value={partySize} onChange={(e) => setPartySize(parseInt(e.target.value))} style={{ width: '100%' }} />
                <div style={{ textAlign: 'center', marginTop: '0.5rem', fontWeight: 600 }}>{partySize} {partySize === 1 ? 'Person' : 'People'}</div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Phone</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit' }} />
                </div>
              </div>

              <button type="submit" disabled={!date || !time || !name || !phone} style={{ marginTop: '1rem', padding: '1rem', background: 'var(--text-charcoal)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', opacity: (!date || !time || !name || !phone) ? 0.5 : 1 }}>
                Confirm Booking
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-sage)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>Booking Confirmed</h3>
              <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
                Thank you, {name}. Your table for {partySize} is reserved on<br/>
                <strong>{date} at {time}</strong>.
              </p>
              
              <button onClick={handleWhatsApp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1rem', background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }}>
                <Send size={18} /> Share via WhatsApp
              </button>
              
              <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#888', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>
                Make another booking
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
