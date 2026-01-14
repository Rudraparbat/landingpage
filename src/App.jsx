import React from "react";

const THEME_KEY = "voxket-theme";
const CONTACT_EMAIL = "bbbengal@example.com";
const SUBMIT_ENDPOINT = null; // Set to your form service endpoint to enable direct submissions

const App = () => {
  // Default = dark (works on phone + laptop). Users can toggle to light.
  // Initialize from localStorage immediately to match the HTML script
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(THEME_KEY);
      return saved === "light" || saved === "dark" ? saved : "dark";
    }
    return "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [contactErrors, setContactErrors] = React.useState({});
  const [contactStatus, setContactStatus] = React.useState("idle"); // idle | loading | success | error

  React.useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
    if (!contactName || contactName.trim().length < 2) errors.name = "Please enter at least 2 characters.";
    if (!emailOk) errors.email = "Please enter a valid email address.";
    if (!contactMessage || contactMessage.trim().length < 10) errors.message = "Please enter at least 10 characters.";
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMessage.trim(),
      source: "landingpage",
    };

    try {
      setContactStatus("loading");
      if (SUBMIT_ENDPOINT) {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submission failed");
        setContactStatus("success");
      } else {
        const subject = `Website enquiry - ${contactName || "B B Bengal"}`;
        const body = [
          `Name: ${contactName || "-"}`,
          `Email: ${contactEmail || "-"}`,
          "",
          "Message:",
          contactMessage || "-",
        ].join("\n");
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setContactStatus("success");
      }
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactErrors({});
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
  };

  const SocialBar = () => (
    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-200">
      <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      </a>
      <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="18" cy="6" r="1"/>
        </svg>
      </a>
      <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:opacity-80 text-green-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a href="tel:+919999999999" aria-label="Call us" className="hover:opacity-80">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </a>
    </div>
  );

  const SectionTitle = ({ label }) => (
    <div className="flex items-center gap-3">
      <div className="h-px w-8 bg-blue-500" />
      <h2 className="text-sm tracking-[0.25em] uppercase text-slate-500 dark:text-gray-400">{label}</h2>
    </div>
  );

  const ServiceCard = ({ title, desc }) => (
    <div className="rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-[#0a0f1e] p-5 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-sm font-semibold mb-2 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-gray-400">{desc}</p>
    </div>
  );

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

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-[#0a0f1e] dark:via-[#0f172a] dark:to-[#1e1b4b] dark:text-white transition-all duration-500">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-blue-200/70 dark:border-blue-900/50 shadow-2xl">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="B B Bengal logo"
              className="h-11 w-11 rounded-full border border-blue-200/70 dark:border-blue-900/50 bg-white dark:bg-[#0a0f1e] p-1 shadow-lg"
            />
            <span className="font-bold tracking-tight text-slate-900 dark:text-white drop-shadow-sm text-2xl sm:text-xl leading-none">
              B B Bengal
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#hero" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:underline underline-offset-4">
              Home
            </a>
            <a href="#about" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:underline underline-offset-4">
              About
            </a>
            <a href="#ourwork" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:underline underline-offset-4">
              Our Work
            </a>
            <a href="#services" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:underline underline-offset-4">
              Services
            </a>
            <a href="#contact" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:underline underline-offset-4">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full border-2 border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/30 flex items-center justify-center text-xs backdrop-blur-sm hover:bg-blue-500/20 transition-all"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? "🌙" : "☀"}
            </button>
            <a href="#contact" className="px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get in touch
            </a>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full border-2 border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/30 flex items-center justify-center text-xs backdrop-blur-sm hover:bg-blue-500/20 transition-all"
            >
              {theme === "dark" ? "🌙" : "☀"}
            </button>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-full border-2 border-blue-500/40 bg-blue-500/10 dark:bg-blue-900/30 flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/20 transition-all"
            >
              <div className="space-y-1">
                <span className={`block h-0.5 w-5 rounded bg-slate-900 dark:bg-white transition-transform ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 rounded bg-slate-900 dark:bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 rounded bg-slate-900 dark:bg-white transition-transform ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-200/70 dark:border-blue-900/50 bg-white/90 dark:bg-[#0a0f1e]/95 backdrop-blur-xl p-4 space-y-4 shadow-2xl">
            {["Home", "About", "Our Work", "Services", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "")}`} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
                {item}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <SocialBar />
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-xs text-white shadow-lg">
                Get in touch
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="hero" className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">B B Bengal – Commercial Interior Design Experts</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-slate-900 dark:text-white drop-shadow-2xl">
            Transforming Commercial Spaces with <span className="text-blue-400">Style, Precision</span> & Smart Design
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-lg leading-relaxed">
            Smart interior solutions for modern businesses—designed to enhance functionality, aesthetics, and brand identity.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="px-6 py-3 text-sm rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Talk to us
              </a>
              <a
                href="#services"
                className="px-6 py-3 text-sm rounded-full border-2 border-blue-500/50 hover:border-blue-400 text-slate-900 dark:text-white hover:bg-blue-500/10 dark:hover:bg-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                View services
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-blue-400 font-medium">
              <span>Design</span>
              <span>Execution</span>
              <span>Completion</span>
            </div>
          </div>
          <div className="md:justify-self-end">
            <div className="relative aspect-4/3 w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-blue-200/70 dark:border-blue-900/50 bg-blue-900/10 dark:bg-blue-900/20 backdrop-blur-xl shadow-2xl">
              <picture>
                <source srcSet="/civil1.avif" type="image/avif" />
                <source srcSet="/civil1.webp" type="image/webp" />
                <img
                  src="/civil1.jpeg"
                  alt="Commercial interior design and civil engineering concept"
                  className="h-full w-full object-cover"
                />
              </picture>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-blue-500/25 dark:from-[#0a0f1e]/80 dark:to-blue-500/40" />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/60 dark:bg-[#0a0f1e]/50 backdrop-blur-sm">
          <div className="max-w-3xl space-y-4">
            <SectionTitle label="About us" />
            <p className="text-sm md:text-base text-slate-700 dark:text-gray-300 leading-relaxed">
            B B Bengal is a trusted commercial interior design company specializing in creating functional, stylish, and innovative spaces for modern businesses. We don't just design interiors—we craft environments that enhance productivity, comfort, and brand identity.
            </p>
          </div>
        </section>

        {/* Our work */}
        <section id="ourwork" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/40 dark:bg-[#0a0f1e]/30 backdrop-blur-sm">
          <SectionTitle label="Civil & Interior Works" />
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <WorkCard
              tag="Home"
              title="Working Process in Interior"
              images={[
                {
                  src: "/interior1.jpeg",
                  alt: "Modern office interior with desks and lighting",
                },
                {
                  src: "/interior2.jpeg",
                  alt: "Open-plan office space with modern design",
                },
                {
                  src: "/interior3.jpeg",
                  alt: "Office meeting area with contemporary interior",
                },
              ]}
            />
            <WorkCard
              tag="civil work"
              title="Fire protection in buildings"
              images={[
                {
                  src: "/civil1.jpeg",
                  alt: "Retail showroom interior with product displays",
                },
                {
                  src: "/civil4.jpeg",
                  alt: "Modern retail store interior with shelving",
                },
                {
                  src: "/civil3.jpeg",
                  alt: "Showroom lighting and interior finishes",
                },
              ]}
            />
            <WorkCard
              tag="Interior"
              title="After interior design"
              images={[
                {
                  src: "/room2.jpeg",
                  alt: "Commercial interior renovation with modern finishes",
                },
                {
                  src: "/room3.jpeg",
                  alt: "Modern commercial space interior detailing",
                },
                {
                  src: "/room4.jpeg",
                  alt: "Contemporary commercial interior space",
                },
              ]}
            />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/40 dark:bg-[#0a0f1e]/30 backdrop-blur-sm">
          <SectionTitle label="Our services" />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="Complete Interiors for Your Home" desc="From living rooms to bedrooms, we create cohesive designs that combine style, comfort, and functionality for your entire home." />
            <ServiceCard title="Smart Kitchens & Modular Spaces" desc="Custom modular solutions for kitchens, wardrobes, and storage, designed to maximize space and simplify your daily life." />
            <ServiceCard title="Transform Your Home Effortlessly" desc="We handle renovations and home makeovers with precision, turning outdated spaces into modern, stylish, and functional interiors." />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/60 dark:bg-[#0a0f1e]/50 backdrop-blur-sm">
          <SectionTitle label="Contact us" />
          <div className="mt-8 grid md:grid-cols-2 gap-10">
            <div className="space-y-4 text-sm md:text-base text-slate-700 dark:text-gray-300">
              <p>Ready to transform your space? Get in touch with our interior experts today.</p>
              <SocialBar/>
            </div>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded-lg bg-white border border-blue-200/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 dark:bg-[#0f172a]/80 dark:border-blue-900/50 dark:text-white dark:placeholder-gray-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-lg bg-white border border-blue-200/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 dark:bg-[#0f172a]/80 dark:border-blue-900/50 dark:text-white dark:placeholder-gray-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">Message</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full rounded-lg bg-white border border-blue-200/70 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 dark:bg-[#0f172a]/80 dark:border-blue-900/50 dark:text-white dark:placeholder-gray-500"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <button type="submit" className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full md:w-auto" aria-busy={contactStatus === "loading"}>
                {contactStatus === "loading" ? "Sending..." : "Send message"}
              </button>
              <div id="contact-status" className="text-[11px]">
                {contactStatus === "success" && <span className="text-green-600">Message sent successfully.</span>}
                {contactStatus === "error" && <span className="text-red-600">Something went wrong. Please try again.</span>}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-[#0a0f1e]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} B B Bengal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <SocialBar />
            <a href="#hero" className="hover:text-slate-900 dark:hover:text-white transition-all duration-300">Back to top</a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-all duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
