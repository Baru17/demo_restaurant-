import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import restaurant from '../config/restaurant';
import { cn } from '../utils/cn';
import { formatPrice } from '../utils/formatters';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

const LAYOUTS = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-24',
  'lg:col-span-5',
  'lg:col-span-7 lg:mt-20',
];

const RATIOS = ['aspect-[4/3]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[4/3]'];

export default function SignatureDishes() {
  const config = restaurant.signatureDishes;
  const dishes = (config.dishIds ?? [])
    .map((id) => MENU_ITEMS.find((item) => item.id === id))
    .filter(Boolean);

  if (dishes.length === 0) return null;

  return (
    <section
      id="signatures"
      aria-labelledby="signatures-heading"
      className="section-y border-y border-hairline bg-surface"
    >
      <div className="shell">
        <div className="flex flex-col gap-7 border-b border-hairline pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            id="signatures-heading"
            eyebrow={config.eyebrow}
            tamil={config.tamil}
            title={
              <>
                {config.heading}{' '}
                <span className="italic text-gold">{config.headingAccent}</span>
              </>
            }
            className="max-w-2xl"
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted lg:pb-1 lg:text-right">
            {config.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
          {dishes.slice(0, 4).map((dish, index) => {
            const category = MENU_CATEGORIES.find((entry) => entry.id === dish.category);
            return (
              <article
                key={dish.id}
                className={cn('group', LAYOUTS[index % LAYOUTS.length])}
              >
                <SmartImage
                  src={dish.image?.src}
                  alt={dish.image?.alt ?? dish.name}
                  position={dish.image?.position}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className={cn('w-full', RATIOS[index % RATIOS.length])}
                  imageClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                />

                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-muted">
                      <span className="text-gold">{String(index + 1).padStart(2, '0')}</span>
                      <span aria-hidden="true" className="h-px w-4 bg-hairline" />
                      {category?.label ?? dish.category}
                    </p>
                    <h3 className="mt-2.5 font-display text-2xl font-normal leading-tight text-ink sm:text-[1.7rem]">
                      {dish.name}
                    </h3>
                    {dish.nameTamil && (
                      <p lang="ta" className="mt-1 font-tamil text-sm text-gold/85">
                        {dish.nameTamil}
                      </p>
                    )}
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                      {dish.description}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-xl text-gold">
                    {formatPrice(dish.price, restaurant.currency, restaurant.locale)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
