import React from "react";
import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";
import { serviceList } from "../constants/data";

const Services = ({ activeTab, setActiveTab }) => {
  const filteredServices =
    activeTab === "All"
        ? serviceList
        : serviceList.filter((s) => s.category === activeTab);

  const categories = ["All", ...new Set(serviceList.map((s) => s.category))];

  return (
    <section id="services" className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 overflow-hidden">
       {/* Background Decorative Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionTitle label="Our Services" />
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeTab === category
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-200 dark:hover:border-blue-900"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((s, index) => (
              <ServiceCard key={s.title} title={s.title} desc={s.desc} index={index} />
            ))}
          </div>

          {filteredServices.length === 0 && (
             <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400">No services found in this category.</p>
             </div>
          )}
      </div>
    </section>
  );
};

export default Services;
