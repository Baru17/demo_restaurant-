import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import restaurant from '../config/restaurant';
import { DIETARY_LABELS, MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { cn } from '../utils/cn';
import { formatPrice } from '../utils/formatters';
import SectionHeading from './SectionHeading';

const INITIAL_CATEGORY = MENU_CATEGORIES[0]?.id ?? '';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(INITIAL_CATEGORY);
  const category =
    MENU_CATEGORIES.find((entry) => entry.id === activeCategory) ?? MENU_CATEGORIES[0];
  const items = MENU_ITEMS.filter((item) => item.category === category?.id);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="section-y border-y border-hairline bg-surface"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="menu-heading"
              eyebrow={restaurant.menu.eyebrow}
              tamil={restaurant.menu.tamil}
              title={
                <>
                  {restaurant.menu.heading}{' '}
                  <span className="italic text-gold">{restaurant.menu.headingAccent}</span>
                </>
              }
              description={restaurant.menu.description}
            />

            <div className="mt-8 space-y-3 border-t border-hairline pt-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                {restaurant.hoursSummary}
              </p>
              <p className="max-w-sm text-[12px] leading-relaxed text-muted">
                {restaurant.menu.note}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div
            role="group"
            aria-label="Filter the menu by category"
            className="no-scrollbar -mx-5 flex overflow-x-auto border-b border-hairline px-5 sm:mx-0 sm:px-0"
          >
            {MENU_CATEGORIES.map((entry) => {
              const count = MENU_ITEMS.filter((item) => item.category === entry.id).length;
              const isActive = entry.id === category?.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setActiveCategory(entry.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'relative min-h-11 shrink-0 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 first:pl-0 last:pr-0 sm:px-5',
                    isActive ? 'text-gold' : 'text-muted hover:text-ink',
                  )}
                >
                  {entry.label}
                  <span className="ml-2 text-[9px] tracking-normal text-muted/70">
                    {String(count).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-px h-px origin-left bg-gold transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div
            key={category?.id}
            role="region"
            aria-label={`${category?.label ?? 'Menu'} selection`}
            className="animate-fade-in mt-6"
          >
            <div className="flex items-center justify-between gap-4 border-b border-hairline pb-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                {category?.description}
              </p>
              <p role="status" className="text-[10px] uppercase tracking-[0.18em] text-muted">
                {items.length} {items.length === 1 ? 'dish' : 'dishes'}
              </p>
            </div>

            {items.length === 0 ? (
              <div className="mt-6 flex flex-col items-center justify-center gap-3 border border-dashed border-hairline px-6 py-16 text-center">
                <UtensilsCrossed className="h-6 w-6 text-gold" aria-hidden="true" />
                <p className="font-display text-2xl text-ink">No dishes here yet.</p>
                <p className="max-w-sm text-sm leading-relaxed text-muted">
                  This part of the menu is being prepared. Try another category.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-hairline">
                {items.map((item) => (
                  <li key={item.id} className="py-6">
                    <div className="flex items-baseline gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-2xl font-normal leading-tight text-ink sm:text-[1.7rem]">
                          {item.name}
                        </h3>
                        {item.nameTamil && (
                          <p lang="ta" className="mt-1 font-tamil text-sm text-gold/85">
                            {item.nameTamil}
                          </p>
                        )}
                      </div>
                      <span
                        aria-hidden="true"
                        className="mb-1 hidden flex-1 border-t border-dotted border-hairline sm:block"
                      />
                      <span className="ml-auto shrink-0 font-display text-xl text-gold sm:ml-0">
                        {formatPrice(item.price, restaurant.currency, restaurant.locale)}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-start gap-x-3 gap-y-2">
                      <p className="max-w-xl text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                      {item.dietary?.length > 0 && (
                        <ul
                          aria-label={`Dietary information for ${item.name}`}
                          className="flex flex-wrap gap-1.5 pt-0.5"
                        >
                          {item.dietary.map((key) => {
                            const info = DIETARY_LABELS[key];
                            if (!info) return null;
                            return (
                              <li key={key}>
                                <span className="tag" title={info.label}>
                                  <span aria-hidden="true">{info.short}</span>
                                  <span className="sr-only">{info.label}</span>
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-6 border-t border-hairline pt-5 text-[11px] leading-relaxed text-muted">
            {restaurant.menu.priceNote}
          </p>
        </div>
      </div>
    </section>
  );
}
