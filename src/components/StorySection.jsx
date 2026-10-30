import { cn } from '../utils/cn';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

/**
 * Shared editorial image + text section.
 * Used for both the philosophy introduction and the longer "Our Story" block.
 */
export default function StorySection({ content, imageSide = 'right', className }) {
  const paragraphs = Array.isArray(content.body) ? content.body : [content.body].filter(Boolean);
  const imageFirst = imageSide === 'left';

  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-heading`}
      className={cn('section-y', className)}
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <figure
          className={cn(
            'relative lg:col-span-5',
            imageFirst ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 hidden h-full w-full border border-hairline sm:block"
          />
          <SmartImage
            src={content.image.src}
            alt={content.image.alt}
            position={content.image.position}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="relative aspect-[4/5] w-full"
          />
          {content.image.caption && (
            <figcaption className="relative mt-3 text-[11px] tracking-[0.02em] text-muted">
              {content.image.caption}
            </figcaption>
          )}
        </figure>

        <div
          className={cn(
            'lg:col-span-7',
            imageFirst ? 'lg:order-2 lg:pl-4 xl:pl-8' : 'lg:order-1 lg:pr-4 xl:pr-8',
          )}
        >
          <SectionHeading
            id={`${content.id}-heading`}
            eyebrow={content.eyebrow}
            tamil={content.tamil}
            title={
              <>
                {content.heading}{' '}
                <span className="italic text-gold">{content.headingAccent}</span>
              </>
            }
          />

          <div className="mt-6 space-y-5 text-[15px] leading-[1.85] text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {content.quote && (
            <figure className="mt-9 border-l border-gold/60 pl-5 sm:pl-6">
              {content.tamilQuote && (
                <p lang="ta" className="font-tamil text-xl leading-relaxed text-gold sm:text-2xl">
                  {content.tamilQuote}
                </p>
              )}
              <blockquote className="mt-2 font-display text-[1.45rem] font-light italic leading-snug text-ink sm:text-2xl">
                &ldquo;{content.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[10px] uppercase tracking-[0.24em] text-muted">
                — {content.attribution}
              </figcaption>
            </figure>
          )}

          {content.points?.length > 0 && (
            <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
              {content.points.map((point, index) => (
                <li
                  key={point.title}
                  className="grid gap-1 py-5 sm:grid-cols-[2.75rem_1fr] sm:gap-4"
                >
                  <span aria-hidden="true" className="text-[10px] tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-normal text-ink">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
