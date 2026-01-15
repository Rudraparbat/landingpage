import React from "react";
import { SocialBar } from "./";

const Footer = () => (
  <footer className="border-t border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-[#0a0f1e]/90 backdrop-blur-xl">
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-gray-400">
      <p>© {new Date().getFullYear()} BB BENGAL & CO. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <SocialBar />
        <a href="#hero" className="hover:text-slate-900 dark:hover:text-white transition-all duration-300">Back to top</a>
        <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-all duration-300">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;