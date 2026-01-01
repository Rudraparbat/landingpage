import React from "react";

const THEME_KEY = "voxket-theme";

const App = () => {
  const [theme, setTheme] = React.useState("system");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = window.localStorage.getItem(THEME_KEY) || "system";
    setTheme(saved);
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const effectiveTheme = theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

    if (effectiveTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const isActiveTheme = (value) => theme === value; 

  const ThemeButton = ({ label, active, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-0.5 rounded-full text-xs ${
        active
          ? "bg-blue-500 text-white"
          : "text-gray-400 hover:bg-blue-900/30"
      }`}
    >
      {label}
    </button>
  );

  const SocialBar = () => (
    <div className="flex items-center gap-3 text-sm">
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
      <h2 className="text-sm tracking-[0.25em] uppercase text-gray-400">{label}</h2>
    </div>
  );

  const ServiceCard = ({ title, desc }) => (
    <div className="rounded-xl border border-blue-900/50 bg-[#0a0f1e] p-5 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-sm font-semibold mb-2 text-white">{title}</h3>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );

  const WorkCard = ({ tag, title, desc }) => (
    <div className="rounded-xl border border-blue-900/50 bg-[#0a0f1e] p-5 flex flex-col gap-2 hover:shadow-xl transition-all duration-300">
      <span className="inline-flex w-fit px-2 py-0.5 rounded-full bg-blue-500/20 text-[10px] uppercase tracking-wide text-blue-400 border border-blue-500/30">
        {tag}
      </span>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs text-gray-400 flex-1">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1e1b4b] text-white transition-all duration-500">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-blue-900/50 shadow-2xl">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">V</div>
            <span className="font-semibold tracking-tight text-white drop-shadow-sm">Voxer</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {["Home", "About", "Services", "Our Work", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "")}`} className="text-gray-400 hover:text-white transition-all duration-300 hover:underline underline-offset-4">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get in touch
            </a>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
              className="h-8 w-8 rounded-full border-2 border-blue-500/50 bg-blue-900/30 flex items-center justify-center text-xs backdrop-blur-sm hover:bg-blue-500/20 transition-all"
            >
              {theme === "light" ? "☀" : theme === "dark" ? "🌙" : "💻"}
            </button>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-full border-2 border-blue-500/50 bg-blue-900/30 flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/20 transition-all"
            >
              <div className="space-y-1">
                <span className={`block h-0.5 w-5 rounded bg-white transition-transform ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 rounded bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 rounded bg-white transition-transform ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-900/50 bg-[#0a0f1e]/95 backdrop-blur-xl p-4 space-y-4 shadow-2xl">
            {["Home", "About", "Services", "Our Work", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "")}`} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">
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
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">AI‑powered experiences</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white drop-shadow-2xl">
              Build modern, responsive <span className="text-blue-400">React frontends</span> without the headache.
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
              Launch your product with a clean, mobile‑first landing page including navbar, hero, about, services, work, contact, and footer – all built in React.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="px-6 py-3 text-sm rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Talk to us
              </a>
              <a href="#services" className="px-6 py-3 text-sm rounded-full border-2 border-blue-500/50 hover:border-blue-400 text-white hover:bg-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                View services
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-blue-400 font-medium">
              <span>Fully responsive</span>
              <span>React + Vite + Tailwind</span>
              <span>Best practices 2025</span>
            </div>
          </div>
          <div className="md:justify-self-end">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-blue-900/50 bg-blue-900/20 backdrop-blur-xl shadow-2xl">
              <img src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team working on laptops" className="h-full w-full object-cover brightness-50 hover:brightness-75 transition-all duration-500" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0a0f1e]/80 via-transparent to-blue-500/40" />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-900/50 bg-[#0a0f1e]/50 backdrop-blur-sm">
          <div className="max-w-3xl space-y-4">
            <SectionTitle label="About us" />
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              We craft fast, accessible, and fully responsive React frontends for startups and businesses who care about performance and UX on every device.
            </p>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              From simple landing pages to complex dashboards, our focus is on clean code, reusable components, and developer‑friendly structure.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-900/50 bg-[#0a0f1e]/30 backdrop-blur-sm">
          <SectionTitle label="Our services" />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="Responsive landing pages" desc="Pixel‑perfect layouts that adapt seamlessly from 320px phones to large desktop screens." />
            <ServiceCard title="Component libraries" desc="Reusable React components for navbars, heroes, cards, forms, and more." />
            <ServiceCard title="Integration ready" desc="Clean structure so you can plug in APIs, auth, and AI agents without frontend pain." />
          </div>
        </section>

        {/* Our work */}
        <section id="ourwork" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-900/50 bg-[#0a0f1e]/30 backdrop-blur-sm">
          <SectionTitle label="Our work" />
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <WorkCard tag="SaaS" title="Analytics dashboard" desc="Responsive admin dashboard with charts, filters, and dark mode." />
            <WorkCard tag="AI" title="Voice agent studio" desc="Landing + onboarding for real‑time AI voice platform." />
            <WorkCard tag="Marketing" title="Product launch site" desc="High‑conversion launch page with A/B tested hero sections." />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-900/50 bg-[#0a0f1e]/50 backdrop-blur-sm">
          <SectionTitle label="Contact us" />
          <div className="mt-8 grid md:grid-cols-2 gap-10">
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>Have a project in mind or need help turning a Figma into a responsive React build? Send a quick message.</p>
              <SocialBar/>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                <input type="text" className="w-full rounded-lg bg-[#0f172a]/80 border border-blue-900/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-500" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                <input type="email" className="w-full rounded-lg bg-[#0f172a]/80 border border-blue-900/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-500" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-lg bg-[#0f172a]/80 border border-blue-900/50 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-500" placeholder="Tell us about your project..." />
              </div>
              <button type="submit" className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full md:w-auto">
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/50 bg-[#0a0f1e]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Voxket. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <SocialBar />
            <a href="#hero" className="hover:text-white transition-all duration-300">Back to top</a>
            <a href="#contact" className="hover:text-white transition-all duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
