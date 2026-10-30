import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  Info,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import restaurant from '../config/restaurant';
import { cn } from '../utils/cn';
import { getTodayHours } from '../utils/formatters';
import LocationMap from './LocationMap';
import SectionHeading from './SectionHeading';

export default function VisitSection({ onReserve }) {
  const { location, contact, hours, visit, reservation } = restaurant;
  const today = getTodayHours(hours);
  const directionsEnabled = Boolean(location.mapsUrl) && !location.isPlaceholder;

  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="section-y border-y border-hairline bg-surface"
    >
      <div className="shell">
        <SectionHeading
          id="visit-heading"
          eyebrow={visit.eyebrow}
          tamil={visit.tamil}
          title={
            <>
              {visit.heading}{' '}
              <span className="italic text-gold">{visit.headingAccent}</span>
            </>
          }
          description={visit.description}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Address
                </h3>
                <address className="mt-3 text-sm not-italic leading-relaxed text-ink">
                  {location.addressLine1}
                  <br />
                  {location.addressLine2}
                </address>
                {location.isPlaceholder && (
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">
                    Sample location. Street address to be confirmed.
                  </p>
                )}
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Contact
                </h3>
                <div className="mt-3 space-y-1.5 text-sm text-ink">
                  {contact.phone.isPlaceholder ? (
                    <p>{contact.phone.display}</p>
                  ) : (
                    <a
                      href={contact.phone.href}
                      className="transition-colors hover:text-gold"
                    >
                      {contact.phone.display}
                    </a>
                  )}
                  {contact.email.isPlaceholder ? (
                    <p className="break-all">{contact.email.display}</p>
                  ) : (
                    <a
                      href={contact.email.href}
                      className="break-all transition-colors hover:text-gold"
                    >
                      {contact.email.display}
                    </a>
                  )}
                </div>
                {(contact.phone.isPlaceholder || contact.email.isPlaceholder) && (
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">
                    Sample contact details.
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  Opening hours
                </h3>
                <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                  {hours.map((entry) => {
                    const isToday = entry.day === today?.day;
                    return (
                      <li
                        key={entry.day}
                        aria-current={isToday ? 'date' : undefined}
                        className={cn(
                          'flex items-center justify-between gap-4 py-2.5 text-sm',
                          isToday ? 'text-ink' : 'text-muted',
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {entry.day}
                          {isToday && (
                            <span className="text-[9px] uppercase tracking-[0.18em] text-gold">
                              Today
                            </span>
                          )}
                        </span>
                        <span className={cn(entry.closed && 'text-muted/70')}>
                          {entry.hours}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {reservation.enabled && (
                <button type="button" onClick={onReserve} className="btn btn-primary">
                  {visit.reservationLabel}
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}

              {directionsEnabled ? (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  {visit.directionsLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-describedby="directions-note"
                  className="btn btn-outline"
                >
                  {visit.directionsLabel}
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {!directionsEnabled && (
              <p id="directions-note" className="mt-3 text-[11px] leading-relaxed text-muted">
                Directions are disabled while the street address is unconfirmed.
              </p>
            )}
          </div>

          <div className="lg:col-span-6">
            <LocationMap />
            <div className="mt-4 flex items-start justify-between gap-6 border-t border-hairline pt-4">
              <div>
                <p className="font-display text-xl text-ink">
                  {location.neighborhood}, {location.city}
                </p>
                <p className="mt-1 text-[11px] text-muted">{visit.mapCaption}</p>
              </div>
              <span className="tag mt-1 shrink-0">Demo</span>
            </div>

            <div className="mt-6 flex items-start gap-3 border-l border-gold/60 pl-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-[12px] leading-relaxed text-muted">{visit.placeholderNote}</p>
            </div>

            <ul className="mt-6 space-y-2 text-[12px] leading-relaxed text-muted">
              <li>· {restaurant.hero.note}</li>
              <li>· {reservation.largePartyNote}</li>
            </ul>

            {!contact.email.isPlaceholder && (
              <a
                href={contact.email.href}
                className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-soft"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Email the restaurant
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
