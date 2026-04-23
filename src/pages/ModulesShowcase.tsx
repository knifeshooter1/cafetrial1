import { Link } from 'react-router-dom';
import Hero3D from '../components/modules/Hero3D';
import SpecialsBanner from '../components/modules/SpecialsBanner';
import MenuCards3D from '../components/modules/MenuCards3D';
import DrinkCustomizer from '../components/modules/DrinkCustomizer';
import FoodShowcase3D from '../components/modules/FoodShowcase3D';
import MenuGrid from '../components/modules/MenuGrid';
import LoyaltyCard from '../components/modules/LoyaltyCard';
import AmbienceGallery from '../components/modules/AmbienceGallery';
import OriginMap from '../components/modules/OriginMap';
import ReservationForm from '../components/modules/ReservationForm';
import ReviewsCarousel from '../components/modules/ReviewsCarousel';
import HoursMapWidget from '../components/modules/HoursMapWidget';

export default function ModulesShowcase() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', color: '#2C2C2C', paddingBottom: '4rem' }}>
      
      {/* Navigation */}
      <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 9999 }}>
        <Link 
          to="/"
          style={{ 
            padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.8)', 
            backdropFilter: 'blur(10px)', color: '#2C2C2C', borderRadius: '30px', 
            textDecoration: 'none', fontWeight: 'bold', border: '1px solid #ccc' 
          }}
        >
          &larr; Back to Home
        </Link>
      </div>

      <h1 style={{ textAlign: 'center', padding: '4rem 2rem 2rem', fontSize: '3rem', fontWeight: 300, backgroundColor: '#F9F9F9' }}>
        12 Upgrade Modules Showcase
      </h1>

      {/* Module 10: 3D Coffee Cup Hero */}
      <div id="module-10"><Hero3D /></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Module 3: Specials Banner */}
        <div id="module-3"><SpecialsBanner /></div>

        {/* Module 1: 3D Menu Cards */}
        <div id="module-1"><MenuCards3D /></div>

        {/* Module 4: Drink Customizer */}
        <div id="module-4"><DrinkCustomizer /></div>

        {/* Module 11: 3D Food Showcase Shelf */}
        <div id="module-11"><FoodShowcase3D /></div>

        {/* Module 2: Menu Grid */}
        <div id="module-2"><MenuGrid /></div>

        {/* Module 6: Loyalty Card */}
        <div id="module-6"><LoyaltyCard /></div>

        {/* Module 5: Ambience Gallery */}
        <div id="module-5"><AmbienceGallery /></div>

        {/* Module 12: Animated Ingredient Map */}
        <div id="module-12"><OriginMap /></div>

        {/* Module 7: Reservation Form */}
        <div id="module-7"><ReservationForm /></div>

        {/* Module 9: Reviews Carousel */}
        <div id="module-9"><ReviewsCarousel /></div>

        {/* Module 8: Live Hours & Map Widget */}
        <div id="module-8"><HoursMapWidget /></div>
      </div>
    </div>
  );
}
