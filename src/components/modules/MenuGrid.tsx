import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuData = {
  'Hot Drinks': [
    { name: 'Espresso', desc: 'Single origin short pull', allergens: [], price: 150 },
    { name: 'Macchiato', desc: 'Espresso marked with milk foam', allergens: ['Dairy'], price: 180 },
    { name: 'Cappuccino', desc: 'Equal parts espresso, milk, foam', allergens: ['Dairy'], price: 220 },
    { name: 'Pour Over', desc: 'Hand-brewed filter coffee', allergens: [], price: 250 },
    { name: 'Matcha Latte', desc: 'Ceremonial grade matcha with milk', allergens: ['Dairy'], price: 280 },
  ],
  'Cold Drinks': [
    { name: 'Cold Brew', desc: 'Steeped for 18 hours', allergens: [], price: 200 },
    { name: 'Iced Latte', desc: 'Espresso over ice and milk', allergens: ['Dairy'], price: 240 },
    { name: 'Nitro Cold Brew', desc: 'Nitrogen-infused smooth cold brew', allergens: [], price: 260 },
    { name: 'Iced Americano', desc: 'Espresso over ice and water', allergens: [], price: 160 },
    { name: 'Yuzu Tonic', desc: 'Espresso with yuzu and tonic water', allergens: [], price: 290 },
  ],
  'Bakery': [
    { name: 'Butter Croissant', desc: 'Flaky, authentic French recipe', allergens: ['Dairy', 'Gluten'], price: 180 },
    { name: 'Almond Croissant', desc: 'Filled with almond frangipane', allergens: ['Dairy', 'Gluten', 'Nuts'], price: 240 },
    { name: 'Pain au Chocolat', desc: 'Dark chocolate batons', allergens: ['Dairy', 'Gluten'], price: 210 },
    { name: 'Blueberry Muffin', desc: 'Fresh blueberries, crumb topping', allergens: ['Dairy', 'Gluten'], price: 160 },
    { name: 'Vegan Banana Bread', desc: 'Made with walnuts and oat milk', allergens: ['Nuts', 'Gluten'], price: 190 },
  ],
  'Meals': [
    { name: 'Avocado Toast', desc: 'Sourdough, smashed avocado, chilli flakes', allergens: ['Gluten'], price: 350 },
    { name: 'Truffle Mushroom Sandwich', desc: 'Wild mushrooms, truffle oil, cheese', allergens: ['Dairy', 'Gluten'], price: 420 },
    { name: 'Granola Bowl', desc: 'House granola, greek yogurt, fresh berries', allergens: ['Dairy', 'Nuts'], price: 320 },
    { name: 'Smoked Salmon Bagel', desc: 'Cream cheese, capers, dill', allergens: ['Dairy', 'Gluten', 'Fish'], price: 480 },
    { name: 'Quinoa Salad', desc: 'Roasted veggies, tahini dressing', allergens: ['Sesame'], price: 380 },
  ]
};

export default function MenuGrid() {
  const [activeTab, setActiveTab] = useState('Hot Drinks');

  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#fff', color: '#2C2C2C', borderRadius: '12px', margin: '2rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', fontWeight: 300 }}>Our Menu</h2>
      
      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {Object.keys(menuData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.8rem 1.5rem',
              border: 'none',
              backgroundColor: activeTab === tab ? '#2C2C2C' : '#f0f0f0',
              color: activeTab === tab ? '#fff' : '#2C2C2C',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {menuData[activeTab as keyof typeof menuData].map((item, idx) => (
              <div key={idx} style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>{item.name}</h3>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#A7B6A1', transition: 'color 0.3s ease' }}>₹{item.price}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666', opacity: 0.8 }}>{item.desc}</p>
                {item.allergens.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {item.allergens.map(a => (
                      <span key={a} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px' }}>
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
