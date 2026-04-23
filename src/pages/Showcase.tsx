import { Link } from 'react-router-dom';
import InteractiveMenuCards from '../components/modules/InteractiveMenuCards.tsx';
import MenuPricingGrid from '../components/modules/MenuPricingGrid.tsx';
import SpecialsBanner from '../components/modules/SpecialsBanner.tsx';
import DrinkCustomizer from '../components/modules/DrinkCustomizer.tsx';
import AmbienceGallery from '../components/modules/AmbienceGallery.tsx';
import LoyaltyStampCard from '../components/modules/LoyaltyStampCard.tsx';
import TableReservation from '../components/modules/TableReservation.tsx';
import LiveHoursMap from '../components/modules/LiveHoursMap.tsx';
import ReviewsCarousel from '../components/modules/ReviewsCarousel.tsx';
import Hero3DCup from '../components/modules/Hero3DCup.tsx';
import PastryShowcaseShelf from '../components/modules/PastryShowcaseShelf.tsx';
import IngredientOriginMap from '../components/modules/IngredientOriginMap.tsx';
import CustomCursor from '../components/CustomCursor.tsx';
import { CartProvider, useCart } from '../context/CartContext.tsx';
import { ShoppingBag } from 'lucide-react';

function CartButton() {
  const { totalItems, setIsCartOpen } = useCart();
  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, padding: '0.8rem 1.5rem', background: 'var(--text-charcoal)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
    >
      <ShoppingBag size={18} /> Cart ({totalItems})
    </button>
  );
}

export default function Showcase() {
  return (
    <CartProvider>
      <div style={{ background: 'var(--bg-offwhite)', minHeight: '100vh', fontFamily: 'var(--font-primary)' }}>
        <CustomCursor text="" variant="default" />
        
        {/* Navigation */}
        <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}>
          <Link to="/" style={{ padding: '0.8rem 1.5rem', background: '#fff', color: 'var(--text-charcoal)', textDecoration: 'none', borderRadius: '30px', fontWeight: 600, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            Back to Home
          </Link>
        </div>
        
        <CartButton />

        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--text-charcoal)', color: '#fff' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1rem' }}>Artisan Offerings</h1>
          <p style={{ opacity: 0.8 }}>Explore our finely crafted menu and atmospheric modules.</p>
        </div>

        {/* Module 10: 3D Hero */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <Hero3DCup />
        </div>

        {/* Module 3: Specials Banner */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <SpecialsBanner />
        </div>

        {/* Module 1: Interactive Cards */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <InteractiveMenuCards />
        </div>

        {/* Module 2: Pricing Grid */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <MenuPricingGrid />
        </div>

        {/* Module 4: Customizer */}
        <div style={{ borderBottom: '1px solid #ddd', background: '#fff' }}>
          <DrinkCustomizer />
        </div>

        {/* Module 11: Pastry Shelf */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <PastryShowcaseShelf />
        </div>

        {/* Module 5: Ambience */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <AmbienceGallery />
        </div>

        {/* Module 12: Origin Map */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <IngredientOriginMap />
        </div>

        {/* Module 9: Reviews */}
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <ReviewsCarousel />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', background: '#f5f5f5' }}>
          {/* Module 6: Loyalty */}
          <div style={{ flex: '1 1 500px', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
            <LoyaltyStampCard />
          </div>
          
          {/* Module 7: Reservation */}
          <div style={{ flex: '1 1 500px', borderBottom: '1px solid #ddd' }}>
            <TableReservation />
          </div>
        </div>

        {/* Module 8: Live Hours Map */}
        <div style={{ background: '#eee', padding: '2rem 0' }}>
          <LiveHoursMap />
        </div>

      </div>
    </CartProvider>
  );
}
