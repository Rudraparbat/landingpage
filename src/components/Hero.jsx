import React from "react";
import { BackgroundBeams } from "./BackgroundBeams";

const Hero = () => {
  return (
    <section id="hero" className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="relative rounded-xl p-6 -m-4 overflow-hidden border border-transparent dark:border-white/5 isolate">
          <BackgroundBeams />
          <div className="space-y-4 relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">BB BENGAL & CO – Commercial Interior Design Experts</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-slate-900 dark:text-white drop-shadow-2xl">
              Transforming Commercial Spaces with <span className="text-blue-400">Style, Precision</span> & Smart Design
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-lg leading-relaxed">
              Smart interior solutions for modern businesses—designed to enhance functionality, aesthetics, and brand identity.
            </p>
            
            {/* Mobile Actions: Buttons & Tags */}
            <div className="md:hidden space-y-6">
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
            </div>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="md:hidden mt-6">
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-blue-500/25 dark:from-[#0a0f1e]/80 dark:to-blue-500/40" />
          </div>
        </div>

        {/* Desktop Image */}
        <div className="hidden md:block mt-6 w-full">
          <div className="relative w-full aspect-21/9 rounded-2xl overflow-hidden border-2 border-blue-200/70 dark:border-blue-900/50 bg-blue-900/10 dark:bg-blue-900/20 backdrop-blur-xl shadow-2xl">
            <picture>
              <source srcSet="/civil1.avif" type="image/avif" />
              <source srcSet="/civil1.webp" type="image/webp" />
              <img
                src="/civil1.jpeg"
                alt="Commercial interior design and civil engineering concept"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-blue-500/25 dark:from-[#0a0f1e]/60 dark:to-blue-500/40" />
          </div>
        </div>

        {/* Desktop Actions: Buttons & Tags (After Image) */}
        <div className="hidden md:flex flex-col gap-4 mt-6">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
