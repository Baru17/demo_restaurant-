import { useEffect, useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationModal from './components/ReservationModal';
import SignatureDishes from './components/SignatureDishes';
import StorySection from './components/StorySection';
import VisitSection from './components/VisitSection';
import restaurant from './config/restaurant';

const THEME_VARS = {
  '--brand-bg': restaurant.theme.background,
  '--brand-surface': restaurant.theme.surface,
  '--brand-elevated': restaurant.theme.elevated,
  '--brand-ink': restaurant.theme.text,
  '--brand-muted': restaurant.theme.muted,
  '--brand-gold': restaurant.theme.accent,
  '--brand-border': restaurant.theme.border,
};

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false);

  // Apply brand tokens to the root so body/overscroll areas match the theme too.
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(THEME_VARS).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    return () => {
      Object.keys(THEME_VARS).forEach((property) => root.style.removeProperty(property));
    };
  }, []);

  return (
    <div style={THEME_VARS} className="min-h-screen bg-canvas font-sans text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AnnouncementBar />
      <Header onReserve={() => setReservationOpen(true)} />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <StorySection content={restaurant.philosophy} imageSide="right" />
        <SignatureDishes />
        <StorySection content={restaurant.story} imageSide="left" />
        <MenuSection />
        <GallerySection />
        <VisitSection onReserve={() => setReservationOpen(true)} />
      </main>

      <Footer onReserve={() => setReservationOpen(true)} />

      {reservationOpen && (
        <ReservationModal onClose={() => setReservationOpen(false)} />
      )}

      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
