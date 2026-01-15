import React from "react";
import PropTypes from "prop-types";
import useEmblaCarousel from "embla-carousel-react";

const WorkCard = ({ tag, title, images }) => {
  const safeImages = Array.isArray(images) ? images : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const hasImages = safeImages.length > 0;
  const canNavigate = safeImages.length > 1;

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const deriveFormats = (path) => {
    if (!path) return { avif: null, webp: null, original: path };
    const base = path.replace(/\.(jpg|jpeg|png)$/i, "");
    return {
      avif: `${base}.avif`,
      webp: `${base}.webp`,
      original: path,
    };
  };

  return (
    <div className="rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-[#0a0f1e] p-5 flex flex-col gap-3 hover:shadow-xl transition-all duration-300">
      <span className="inline-flex w-fit px-2 py-0.5 rounded-full bg-blue-500/15 dark:bg-blue-500/20 text-[10px] uppercase tracking-wide text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30">
        {tag}
      </span>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canNavigate}
            aria-label="Previous photo"
            className={`h-8 w-8 rounded-full border border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/20 text-slate-900 dark:text-white text-sm transition-all flex items-center justify-center ${
              canNavigate ? "hover:bg-blue-500/20 hover:border-blue-400" : "opacity-40 cursor-not-allowed"
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNavigate}
            aria-label="Next photo"
            className={`h-8 w-8 rounded-full border border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/20 text-slate-900 dark:text-white text-sm transition-all flex items-center justify-center ${
              canNavigate ? "hover:bg-blue-500/20 hover:border-blue-400" : "opacity-40 cursor-not-allowed"
            }`}
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-900/10 dark:bg-blue-900/20">
        {hasImages ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {safeImages.map((img, index) => {
                const f = deriveFormats(img.src);
                return (
                  <div className="flex-[0_0_100%] min-w-0 relative h-56" key={index}>
                    <picture className="absolute inset-0 h-full w-full">
                      {f.avif && <source srcSet={f.avif} type="image/avif" />}
                      {f.webp && <source srcSet={f.webp} type="image/webp" />}
                      <img
                        src={f.original}
                        alt={img.alt}
                        className="h-full w-full object-cover select-none"
                        loading="lazy"
                        draggable={false}
                      />
                    </picture>
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-blue-500/15 dark:from-[#0a0f1e]/40 dark:to-blue-500/20" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-56 w-full flex items-center justify-center text-xs text-slate-500 dark:text-gray-400">
            No photos yet
          </div>
        )}

        {canNavigate && (
          <div className="absolute bottom-2 right-2 z-10 rounded-full bg-white/80 dark:bg-[#0a0f1e]/70 border border-blue-200/70 dark:border-blue-900/50 px-2 py-0.5 text-[10px] text-slate-700 dark:text-gray-200">
            {selectedIndex + 1} / {safeImages.length}
          </div>
        )}
      </div>
    </div>
  );
};

WorkCard.propTypes = {
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WorkCard;