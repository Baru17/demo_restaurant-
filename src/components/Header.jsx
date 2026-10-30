import { useEffect, useState } from 'react';
import { CalendarDays, Menu } from 'lucide-react';
import restaurant from '../config/restaurant';
import { useActiveSection } from '../hooks/useActiveSection';
import { cn } from '../utils/cn';
import BrandMark from './BrandMark';
import MobileMenu from './MobileMenu';

const SECTION_IDS = restaurant.nav.map((item) => item.href.replace('#', ''));

export default function Header({ onReserve }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 8,
  );
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-hairline transition-colors duration-500',
          scrolled ? 'bg-canvas/95 backdrop-blur-md' : 'bg-canvas/85 backdrop-blur-sm',
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
          <a
            href="#home"
            aria-label={`${restaurant.name} — back to top`}
            className="-my-2 shrink-0 py-2"
          >
            <BrandMark showCity />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {restaurant.nav.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative py-2 text-[10px] uppercase tracking-[0.22em] transition-colors duration-300',
                    isActive ? 'text-gold' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <button type="button" onClick={onReserve} className="btn btn-primary h-11">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Reserve a Table
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center border border-hairline text-ink transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onReserve={onReserve} />
    </>
  );
}
