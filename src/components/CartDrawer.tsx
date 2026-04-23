import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '100vw', background: 'var(--bg-offwhite)', zIndex: 9999, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}
          >
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag /> Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-charcoal)' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>Your cart is empty.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                      <div style={{ color: 'var(--accent-sage)', fontWeight: 600 }}>₹{item.price}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.2rem', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}><Minus size={16} /></button>
                      <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.2rem', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}><Plus size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: '2rem', borderTop: '1px solid #ddd', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <button disabled={cart.length === 0} style={{ width: '100%', padding: '1rem', background: 'var(--text-charcoal)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 500, cursor: cart.length === 0 ? 'not-allowed' : 'pointer', opacity: cart.length === 0 ? 0.5 : 1 }}>
                Place Order
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
