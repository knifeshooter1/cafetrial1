import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuData = {
  Hot: [
    { name: 'Espresso', desc: 'Single shot of our signature blend', price: 150, allergens: [] },
    { name: 'Cappuccino', desc: 'Espresso with steamed milk and thick foam', price: 220, allergens: ['Dairy'] },
    { name: 'Latte', desc: 'Espresso with lots of steamed milk and a light foam layer', price: 240, allergens: ['Dairy'] },
    { name: 'Mocha', desc: 'Espresso, steamed milk, and rich chocolate syrup', price: 280, allergens: ['Dairy'] },
    { name: 'Chai Latte', desc: 'Spiced black tea with steamed milk', price: 200, allergens: ['Dairy'] }
  ],
  Cold: [
    { name: 'Cold Brew', desc: 'Slow-steeped over 24 hours for a smooth finish', price: 260, allergens: [] },
    { name: 'Iced Latte', desc: 'Chilled espresso and milk over ice', price: 260, allergens: ['Dairy'] },
    { name: 'Frappuccino', desc: 'Blended coffee beverage with whipped cream', price: 320, allergens: ['Dairy'] },
    { name: 'Iced Americano', desc: 'Espresso over water and ice', price: 180, allergens: [] },
    { name: 'Matcha Iced Latte', desc: 'Premium matcha green tea blended with milk and ice', price: 300, allergens: ['Dairy'] }
  ],
  Bakery: [
    { name: 'Butter Croissant', desc: 'Flaky, buttery, freshly baked daily', price: 180, allergens: ['Gluten', 'Dairy'] },
    { name: 'Almond Croissant', desc: 'Topped with toasted almonds and powdered sugar', price: 220, allergens: ['Gluten', 'Dairy', 'Nuts'] },
    { name: 'Blueberry Muffin', desc: 'Bursting with fresh blueberries', price: 160, allergens: ['Gluten', 'Dairy', 'Egg'] },
    { name: 'Chocolate Chip Cookie', desc: 'Large, chewy, and loaded with chocolate chips', price: 120, allergens: ['Gluten', 'Dairy', 'Egg'] },
    { name: 'Banana Bread Slice', desc: 'Moist and delicious banana bread', price: 140, allergens: ['Gluten', 'Egg'] }
  ],
  Meals: [
    { name: 'Avocado Toast', desc: 'Smashed avocado on sourdough toast with chili flakes', price: 350, allergens: ['Gluten'] },
    { name: 'Grilled Cheese Sandwich', desc: 'Melted cheddar and mozzarella on sourdough', price: 320, allergens: ['Gluten', 'Dairy'] },
    { name: 'Chicken Caesar Salad', desc: 'Crisp romaine, parmesan, croutons, and grilled chicken', price: 380, allergens: ['Gluten', 'Dairy'] },
    { name: 'Veggie Wrap', desc: 'Roasted vegetables, hummus, and greens in a whole wheat wrap', price: 290, allergens: ['Gluten'] },
    { name: 'Acai Bowl', desc: 'Blended acai topped with granola, fresh fruit, and honey', price: 420, allergens: ['Gluten', 'Nuts'] }
  ]
};

export default function MenuPricingGrid() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>('Hot');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-primary)' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '2rem' }}>Full Menu</h2>
      
      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {(Object.keys(menuData) as Array<keyof typeof menuData>).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              border: '1px solid var(--text-charcoal)',
              background: activeTab === tab ? 'var(--text-charcoal)' : 'transparent',
              color: activeTab === tab ? 'var(--bg-offwhite)' : 'var(--text-charcoal)',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout style={{ minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {menuData[activeTab].map((item, idx) => (
              <div key={idx} style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>{item.name}</h3>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-sage)' }}>₹{item.price}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.4, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.allergens.map(a => (
                    <span key={a} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#f0f0f0', borderRadius: '4px', color: '#555' }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
