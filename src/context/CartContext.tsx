import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, qty: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string | number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string | number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, totalItems, totalPrice }}>
      {children}
      
      {/* Sliding Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ 
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', 
                background: '#fff', zIndex: 100000, display: 'flex', flexDirection: 'column',
                fontFamily: 'var(--font-primary)'
              }}
            >
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShoppingBag /> Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {items.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>Your cart is empty.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 500 }}>{item.name}</h4>
                        <div style={{ color: 'var(--accent-sage)', fontWeight: 600 }}>₹{item.price}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f5f5f5', borderRadius: '30px', padding: '0.2rem' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}><Minus size={14}/></button>
                        <span style={{ fontWeight: 500, minWidth: '1rem', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}><Plus size={14}/></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', background: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button 
                  disabled={items.length === 0}
                  style={{ 
                    width: '100%', padding: '1rem', background: 'var(--text-charcoal)', color: '#fff', 
                    border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 500, 
                    cursor: items.length === 0 ? 'not-allowed' : 'pointer', opacity: items.length === 0 ? 0.5 : 1
                  }}
                >
                  Place Order
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
};
