import { useCallback, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import restaurant from '../config/restaurant';
import { GALLERY_IMAGES } from '../data/gallery';
import { cn } from '../utils/cn';
import Lightbox from './Lightbox';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

const LAYOUTS = [
  'col-span-2 sm:col-span-2 h-[280px] sm:h-[400px] lg:h-[500px]',
  'col-span-1 h-[280px] sm:h-[400px] lg:h-[500px]',
  'col-span-1 h-[220px] sm:h-[300px] lg:h-[340px]',
  'col-span-1 h-[220px] sm:h-[300px] lg:h-[340px]',
  'col-span-1 h-[220px] sm:h-[300px] lg:h-[340px]',
  'col-span-2 sm:col-span-3 h-[220px] sm:h-[300px] lg:h-[360px]',
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      const total = GALLERY_IMAGES.length;
      return (current - 1 + total) % total;
    });
  }, []);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % GALLERY_IMAGES.length;
    });
  }, []);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="section-y bg-canvas"
    >
      <div className="shell">
        <div className="flex flex-col gap-7 border-b border-hairline pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            id="gallery-heading"
            eyebrow={restaurant.gallery.eyebrow}
            tamil={restaurant.gallery.tamil}
            title={
              <>
                {restaurant.gallery.heading}{' '}
                <span className="italic text-gold">{restaurant.gallery.headingAccent}</span>
              </>
            }
            className="max-w-2xl"
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted lg:pb-1 lg:text-right">
            {restaurant.gallery.description}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {GALLERY_IMAGES.map((image, index) => (
            <li key={image.id} className={cn('group relative', LAYOUTS[index % LAYOUTS.length])}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Enlarge image: ${image.caption}`}
                className="relative block h-full w-full overflow-hidden text-left"
              >
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full"
                  imageClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.06)_45%,rgba(0,0,0,0.08)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
                  <span className="text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink/90">
                    {image.caption}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden h-8 w-8 shrink-0 items-center justify-center border border-ink/25 bg-black/30 text-ink transition-colors duration-300 group-hover:border-gold group-hover:text-gold sm:flex"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[11px] text-muted">{restaurant.gallery.note}</p>
      </div>

      <Lightbox
        images={GALLERY_IMAGES}
        index={activeIndex}
        onClose={close}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </section>
  );
}
