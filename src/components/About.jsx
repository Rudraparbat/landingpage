import React from "react";
import SectionTitle from "./SectionTitle";

const About = () => {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-10 md:py-12 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/60 dark:bg-[#0a0f1e]/50 backdrop-blur-sm">
      <div className="max-w-3xl space-y-4">
        <SectionTitle label="About us" />
        <p className="text-sm md:text-base text-slate-700 dark:text-gray-300 leading-relaxed">
          BB BENGAL & CO is a owned Construction Leader established in 2019, known for significant projects across the India focusing o large scale  developments with a strong emphasis on quality and professionalism.
        </p>
      </div>
    </section>
  );
};

export default About;
