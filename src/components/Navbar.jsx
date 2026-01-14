import React from "react";
import SocialBar from "./SocialBar";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
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
  );
};

export default Navbar;