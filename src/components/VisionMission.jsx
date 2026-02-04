import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const VisionIcon = () => (
  <svg className="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const MissionIcon = () => (
  <svg className="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const VisionMission = () => {
  return (
    <section id="vision-mission" className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <SectionTitle label="Our Vision & Mission" />

      <div className="mt-12 grid grid-cols-1 gap-8 relative z-10">
        {/* Vision Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative bg-white/60 dark:bg-[#0f172a]/60 p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl shadow-blue-500/5 backdrop-blur-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <VisionIcon />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Vision Statement
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg md:text-xl font-light italic border-l-4 border-blue-500/30 pl-6">
              "To be the definitive global benchmark for integrated building solutions, where architectural strength meets aesthetic brilliance. We envision a future where every structure we touch becomes a landmark of quality, seamlessly uniting robust civil engineering with intelligent technology and visionary interior artistry to redefine the modern living and commercial landscape."
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative bg-white/60 dark:bg-[#0f172a]/60 p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl shadow-blue-500/5 backdrop-blur-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <MissionIcon />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Mission Statement
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
              Our mission is to empower our clients through a masterful fusion of diverse disciplines. We are committed to delivering large-scale excellence by:
            </p>
            
            <ul className="grid gap-4">
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
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="flex gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                >
                  <CheckIcon />
                  <div>
                    <strong className="block text-slate-800 dark:text-slate-100 font-semibold mb-1 text-lg">{item.title}</strong>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
