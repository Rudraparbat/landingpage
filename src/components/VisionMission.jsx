import React from "react";
import SectionTitle from "./SectionTitle";

const VisionMission = () => {
  return (
    <section id="vision-mission" className="max-w-6xl mx-auto px-4 py-10 md:py-12 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/40 dark:bg-[#0a0f1e]/30 backdrop-blur-sm">
      <SectionTitle label="Our Vision & Mission" />

      <div className="mt-8 grid grid-cols-1 gap-10 items-start">
        {/* Vision Section */}
        <div className="bg-white/50 dark:bg-white/5 p-6 rounded-2xl border border-blue-100 dark:border-white/10 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Vision
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            To be the definitive global benchmark for integrated building solutions, where architectural strength meets aesthetic brilliance. We envision a future where every structure we touch becomes a landmark of quality, seamlessly uniting robust civil engineering with intelligent technology and visionary interior artistry to redefine the modern living and commercial landscape.
          </p>
        </div>

        {/* Mission Section */}
        <div className="space-y-6">
          <div className="bg-white/50 dark:bg-white/5 p-6 rounded-2xl border border-blue-100 dark:border-white/10 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300">
             <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Mission
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Our mission is to empower our clients through a masterful fusion of diverse disciplines. We are committed to delivering large-scale excellence by :
            </p>
            
            <ul className="space-y-4">
              {[
                {
                  title: "Building with Precision",
                  desc: "Executing complex civil foundations that stand the test of time."
                },
                {
                  title: "Integrating Intelligence",
                  desc: "Implementing advanced electrical, CCTV, and telecom infrastructures that create smarter, safer environments."
                },
                {
                  title: "Designing with Elegance",
                  desc: "Crafting immersive interiors—from sophisticated false ceilings to artisanal paint finishes—that reflect the unique identity of every project."
                },
                {
                  title: "Delivering with Integrity",
                  desc: "Operating as a high-performance team that prioritizes transparency, technical skill, and client-centric innovation to ensure every project is built better, from the ground up."
                }
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500 dark:bg-blue-400" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                    <strong className="text-slate-800 dark:text-slate-100 font-semibold">{item.title}:</strong> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
