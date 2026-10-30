import { ArrowUp, ArrowUpRight } from 'lucide-react';
import restaurant from '../config/restaurant';
import { scrollToTarget } from '../utils/formatters';
import BrandMark from './BrandMark';

export default function Footer({ onReserve }) {
  const { footer, nav, contact, location, hours } = restaurant;
  const year = new Date().getFullYear();
  const closedDays = hours.filter((entry) => entry.closed).map((entry) => entry.day);
  const socialLinks = restaurant.social ?? [];

  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <a
              href="#home"
              aria-label={`${restaurant.name} — back to top`}
              className="inline-block"
            >
              <BrandMark size="lg" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{footer.blurb}</p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3" aria-label="Social links">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${restaurant.name} on ${link.label} (opens in a new tab)`}
                      className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-gold">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-gold">
              Hours
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink">{restaurant.hoursSummary}</p>
            {closedDays.length > 0 && (
              <p className="mt-1.5 text-sm text-muted">{closedDays.join(' · ')} closed</p>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-gold">
              Contact
            </h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted">
              {location.addressLine1}
              <br />
              {location.addressLine2}
            </address>
            <div className="mt-3 space-y-1.5 text-sm text-muted">
              <p>{contact.phone.display}</p>
              <p className="break-words">{contact.email.display}</p>
            </div>

            {restaurant.reservation.enabled && (
              <button
                type="button"
                onClick={onReserve}
                className="group mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-soft"
              >
                Reserve a table
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-hairline pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-muted">
              © {year} {restaurant.name}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {footer.photoCredit && (
                <a
                  href={footer.photoCredit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold"
                >
                  {footer.photoCredit.label}
                </a>
              )}
              <button
                type="button"
                onClick={() => scrollToTarget(null)}
                className="group inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold"
              >
                Back to top
                <ArrowUp
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {restaurant.demo.enabled && (
            <div className="mt-5 flex flex-col gap-3 border-t border-hairline pt-5 sm:flex-row sm:items-start sm:justify-between">
              <p className="max-w-3xl text-[10px] leading-relaxed text-muted/70">
                {restaurant.demo.disclaimer}
              </p>
              <span className="tag shrink-0">{restaurant.demo.label}</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
