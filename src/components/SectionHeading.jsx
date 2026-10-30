import { cn } from '../utils/cn';

/** Shared editorial section heading with a gold rule and optional description. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  tamil,
  description,
  align = 'left',
  className,
  titleClassName,
  as: Tag = 'h2',
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow', align === 'center' && 'justify-center')}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={cn(
          'mt-5 max-w-3xl font-display text-[clamp(2.15rem,4.6vw,3.75rem)] font-light leading-[1.04] tracking-[-0.01em] text-ink',
          align === 'center' && 'mx-auto',
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {tamil && (
        <p
          lang="ta"
          className={cn(
            'mt-3 font-tamil text-[15px] leading-relaxed text-gold/85 sm:text-base',
            align === 'center' && 'mx-auto',
          )}
        >
          {tamil}
        </p>
      )}
      {description && (
        <p
          className={cn(
            'mt-5 max-w-xl text-[15px] leading-relaxed text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
