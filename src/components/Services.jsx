import React from "react";
import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";
import { serviceList } from "../constants/data";

const Services = () => {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-16 md:py-20 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/40 dark:bg-[#0a0f1e]/30 backdrop-blur-sm">
      <SectionTitle label="Our services" />
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceList.map((s) => (
          <ServiceCard key={s.title} title={s.title} desc={s.desc} />
        ))}
      </div>
    </section>
  );
};

export default Services;