import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Modal from './Modal';
import SmartImage from './SmartImage';

export default function Lightbox({ images, index, onClose, onPrevious, onNext }) {
  const closeRef = useRef(null);
  const open = index !== null && index >= 0 && index < images.length;
  const image = open ? images[index] : null;

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onNext, onPrevious]);

  if (!image) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="lightbox-caption"
      initialFocusRef={closeRef}
      overlayClassName="bg-black/95"
      className="max-w-5xl"
    >
      <div className="animate-modal-in border border-hairline bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-2.5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative bg-black">
          <SmartImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            eager
            fit="contain"
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="h-[52vh] w-full sm:h-[62vh]"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink/20 bg-canvas/80 text-ink transition-colors hover:border-gold hover:text-gold sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink/20 bg-canvas/80 text-ink transition-colors hover:border-gold hover:text-gold sm:right-4"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-1.5 border-t border-hairline px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p
            id="lightbox-caption"
            aria-live="polite"
            className="font-display text-xl font-normal text-ink"
          >
            {image.caption}
          </p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Photo: {image.credit}
          </p>
        </div>
      </div>
    </Modal>
  );
}
