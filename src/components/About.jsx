import React from "react";
import SectionTitle from "./SectionTitle";

const About = () => {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/60 dark:bg-[#0a0f1e]/50 backdrop-blur-sm">
      <div className="max-w-3xl space-y-4">
        <SectionTitle label="About us" />
        <p className="text-sm md:text-base text-slate-700 dark:text-gray-300 leading-relaxed">
          B B Bengal is a trusted commercial interior design company specializing in creating functional, stylish, and innovative spaces for modern businesses. We don't just design interiors—we craft environments that enhance productivity, comfort, and brand identity.
        </p>
      </div>
    </section>
  );
};

export default About;