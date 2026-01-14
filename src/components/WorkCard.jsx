import React from "react";
import PropTypes from "prop-types";

const WorkCard = ({ tag, title, images }) => {
  const safeImages = Array.isArray(images) ? images : [];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const touchStart = React.useRef(null);
  const [anim, setAnim] = React.useState(null); // { from, to, dir: 'next' | 'prev', phase: 'start' | 'run' }
  const timers = React.useRef({ phaseTimer: null, endTimer: null });
  const imageRegionId = React.useMemo(() => `carousel-${title.replace(/\s+/g, "-").toLowerCase()}`,[title]);
  const [drag, setDrag] = React.useState(null); // { dir: 'next' | 'prev', to: number, dx: number }

  const hasImages = safeImages.length > 0;
  const canNavigate = safeImages.length > 1;
  const current = hasImages ? safeImages[Math.min(activeIndex, safeImages.length - 1)] : null;

  const startNav = (dir) => {
    if (!canNavigate) return;
    if (anim) return;
    const to =
      dir === "next"
        ? (activeIndex + 1) % safeImages.length
        : (activeIndex - 1 + safeImages.length) % safeImages.length;
    setAnim({ from: activeIndex, to, dir, phase: "start" });

    // kick animation into run phase after a tick
    if (timers.current.phaseTimer) window.clearTimeout(timers.current.phaseTimer);
    timers.current.phaseTimer = window.setTimeout(() => {
      setAnim((a) => (a ? { ...a, phase: "run" } : a));
    }, 16);

    // finalize animation: commit index and clear anim state
    if (timers.current.endTimer) window.clearTimeout(timers.current.endTimer);
    timers.current.endTimer = window.setTimeout(() => {
      setActiveIndex(to);
      setAnim(null);
    }, 600);
  };

  const goPrev = () => startNav("prev");
  const goNext = () => startNav("next");

  React.useEffect(() => {
    // cleanup timers on unmount
    return () => {
      if (timers.current.phaseTimer) window.clearTimeout(timers.current.phaseTimer);
      if (timers.current.endTimer) window.clearTimeout(timers.current.endTimer);
    };
  }, []);

  const handleTouchStart = (e) => {
    const t = e.touches?.[0];
    if (t) touchStart.current = { x: t.clientX, y: t.clientY };
    setDrag(null);
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current || !canNavigate) return;
    const t = e.touches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    // only consider horizontal drags
    if (Math.abs(dx) < 5 || Math.abs(dx) <= Math.abs(dy)) {
      setDrag(null);
      return;
    }
    const dir = dx < 0 ? "next" : "prev";
    const to = dir === "next" ? (activeIndex + 1) % safeImages.length : (activeIndex - 1 + safeImages.length) % safeImages.length;
    const max = 24; // px, matches translate-x-6 (1.5rem)
    const clampedDx = Math.max(Math.min(dx, max), -max);
    setDrag({ dir, to, dx: clampedDx });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (!canNavigate) return;
    // if user was dragging, decide by drag distance
    if (drag) {
      const threshold = 14; // px
      const dir = drag.dir;
      setDrag(null);
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        if (dir === "next") goNext(); else goPrev();
      }
      return;
    }
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handleKeyDown = (e) => {
    if (!canNavigate) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  const deriveFormats = (path) => {
    // create .avif and .webp paths beside original
    if (!path) return { avif: null, webp: null, original: path };
    const base = path.replace(/\.(jpg|jpeg|png)$/i, "");
    return {
      avif: `${base}.avif`,
      webp: `${base}.webp`,
      original: path,
    };
  };

  const animatedFrom = anim ? safeImages[anim.from] : current;
  const animatedTo = anim ? safeImages[anim.to] : (drag ? safeImages[drag.to] : null);
  const isRun = anim?.phase === "run";
  const isNext = anim?.dir === "next";

  const fromClass =
    anim == null
      ? "opacity-100 translate-x-0"
      : "opacity-100 translate-x-0";

  const toClass =
    anim == null
      ? ""
      : isRun
        ? "opacity-100 translate-x-0"
        : isNext
          ? "opacity-100 translate-x-6"
          : "opacity-100 -translate-x-6";

  return (
    <div className="rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-[#0a0f1e] p-5 flex flex-col gap-3 hover:shadow-xl transition-all duration-300" role="region" aria-label={`${title} image carousel`} aria-roledescription="carousel">
      <span className="inline-flex w-fit px-2 py-0.5 rounded-full bg-blue-500/15 dark:bg-blue-500/20 text-[10px] uppercase tracking-wide text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30">
        {tag}
      </span>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canNavigate}
            aria-label={`Previous photo`}
            aria-controls={imageRegionId}
            aria-disabled={!canNavigate}
            className={`h-8 w-8 rounded-full border border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/20 text-slate-900 dark:text-white text-sm transition-all ${
              canNavigate ? "hover:bg-blue-500/20 hover:border-blue-400" : "opacity-40 cursor-not-allowed"
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNavigate}
            aria-label={`Next photo`}
            aria-controls={imageRegionId}
            aria-disabled={!canNavigate}
            className={`h-8 w-8 rounded-full border border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/20 text-slate-900 dark:text-white text-sm transition-all ${
              canNavigate ? "hover:bg-blue-500/20 hover:border-blue-400" : "opacity-40 cursor-not-allowed"
            }`}
          >
            ›
          </button>
        </div>
      </div>

      <div
        id={imageRegionId}
        className="relative overflow-hidden rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-900/10 dark:bg-blue-900/20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-live="polite"
      >
        {animatedFrom ? (
          <div className="relative h-56 w-full">
            {(() => {
              const f = deriveFormats(animatedFrom.src);
              return (
                <picture className={`absolute inset-0 h-full w-full ${fromClass} z-10`}>
                  {f.avif && <source srcSet={f.avif} type="image/avif" />}
                  {f.webp && <source srcSet={f.webp} type="image/webp" />}
                  <img
                    src={f.original}
                    alt={animatedFrom.alt}
                    className={`h-full w-full object-cover`}
                    loading="lazy"
                    draggable={false}
                  />
                </picture>
              );
            })()}
            {animatedTo && (() => {
              const f2 = deriveFormats(animatedTo.src);
              const isDragging = drag && !anim;
              let styleObj = undefined;
              if (isDragging) {
                const base = drag.dir === "next" ? 24 : -24; // px
                const target = base + drag.dx;
                const clamped = drag.dir === "next" ? Math.max(0, Math.min(target, 24)) : Math.min(0, Math.max(target, -24));
                styleObj = { transform: `translateX(${clamped}px)` };
              }
              return (
                <picture className={`absolute inset-0 h-full w-full ${isDragging ? "transition-none" : `${toClass} transition-transform duration-600 ease-in-out`} z-20`} style={styleObj}>
                  {f2.avif && <source srcSet={f2.avif} type="image/avif" />}
                  {f2.webp && <source srcSet={f2.webp} type="image/webp" />}
                  <img
                    src={f2.original}
                    alt={animatedTo.alt}
                    className={`h-full w-full object-cover`}
                    loading="lazy"
                    draggable={false}
                  />
                </picture>
              );
            })()}
          </div>
        ) : (
          <div className="h-56 w-full flex items-center justify-center text-xs text-slate-500 dark:text-gray-400">
            No photos yet
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-blue-500/15 dark:from-[#0a0f1e]/40 dark:to-blue-500/20" />
        {canNavigate && (
          <div className="absolute bottom-2 right-2 rounded-full bg-white/80 dark:bg-[#0a0f1e]/70 border border-blue-200/70 dark:border-blue-900/50 px-2 py-0.5 text-[10px] text-slate-700 dark:text-gray-200" aria-label={`Slide ${Math.min(activeIndex + 1, safeImages.length)} of ${safeImages.length}`}>
            {Math.min(activeIndex + 1, safeImages.length)} / {safeImages.length}
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