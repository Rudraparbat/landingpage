import React from "react";
import SectionTitle from "./SectionTitle";
import WorkCard from "./WorkCard";
import { workCards } from "../constants/data";

const Work = () => {
  return (
    <section id="ourwork" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/40 dark:bg-[#0a0f1e]/30 backdrop-blur-sm">
      <SectionTitle label="Civil & Interior Works" />
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {workCards.map((w) => (
          <WorkCard key={w.title} tag={w.tag} title={w.title} images={w.images} />
        ))}
      </div>
    </section>
  );
};

export default Work;