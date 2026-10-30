import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import restaurant from '../config/restaurant';
import SmartImage from './SmartImage';

const DETAIL_ICONS = [MapPin, Clock];

export default function Hero() {
  const { hero } = restaurant;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-end overflow-hidden bg-canvas lg:min-h-[calc(100svh-6rem)]"
    >
      <SmartImage
        eager
        src={hero.image.src}
        alt={hero.image.alt}
        position={hero.image.position}
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
        imageClassName="scale-[1.01]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,15,0.97)_0%,rgba(16,16,15,0.82)_38%,rgba(16,16,15,0.28)_72%,rgba(16,16,15,0.5)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,16,15,0.94)_0%,rgba(16,16,15,0.18)_46%,rgba(16,16,15,0.5)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-canvas/35 sm:bg-canvas/15 lg:bg-transparent" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 hidden border border-ink/10 sm:block lg:inset-6"
      />

      <div className="shell relative z-10 flex w-full flex-col pb-10 pt-24 sm:pb-12 sm:pt-32 lg:pb-14 lg:pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise" style={{ animationDelay: '80ms' }}>
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-[clamp(2.25rem,7.2vw,5.5rem)] font-light leading-[0.98] tracking-[-0.015em] text-ink"
          >
            <span className="animate-rise block" style={{ animationDelay: '160ms' }}>
              {hero.headline}
            </span>
            <span
              className="animate-rise block italic text-gold"
              style={{ animationDelay: '250ms' }}
            >
              {hero.headlineAccent}
            </span>
          </h1>

          {hero.tamilTagline && (
            <p
              lang="ta"
              className="animate-rise mt-4 font-tamil text-[clamp(1.05rem,2.6vw,1.55rem)] leading-relaxed text-gold/90"
              style={{ animationDelay: '320ms' }}
            >
              {hero.tamilTagline}
            </p>
          )}

          <p
            className="animate-rise mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base"
            style={{ animationDelay: '400ms' }}
          >
            {hero.description}
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '490ms' }}
          >
            <a href={hero.primaryCta.href} className="btn btn-primary w-full sm:w-auto">
              {hero.primaryCta.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-outline w-full sm:w-auto">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div
          className="animate-rise mt-12 flex flex-col gap-5 border-t border-ink/15 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
          style={{ animationDelay: '580ms' }}
        >
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {hero.details.map((detail, index) => {
              const Icon = DETAIL_ICONS[index % DETAIL_ICONS.length];
              return (
                <div key={detail.label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-muted">
                      {detail.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-ink">{detail.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>

          {hero.note && (
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{hero.note}</p>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex xl:right-10"
      >
        <span className="h-16 w-px bg-gold/60" />
        <span className="text-[9px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
          {restaurant.brandDescriptor} · {restaurant.location.city}
        </span>
      </div>
    </section>
  );
}
