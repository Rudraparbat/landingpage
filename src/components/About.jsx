import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const About = () => {
  return (
    <section id="about" className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <SectionTitle label="About us" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative bg-white/60 dark:bg-[#0f172a]/60 p-8 md:p-10 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl shadow-blue-500/5 backdrop-blur-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
             {/* Decorative quote icon */}
             <div className="hidden md:block">
                <svg className="w-10 h-10 text-blue-500/40 dark:text-blue-400/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
             </div>

             <div className="space-y-4">
                <p className="text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed font-light">
                  <strong className="font-bold text-blue-600 dark:text-blue-400">BB BENGAL & CO</strong> is a renowned Construction Leader established in <span className="font-semibold text-slate-900 dark:text-white">2019</span>, known for significant projects across India.
                </p>
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                   We focus on large-scale developments with a steadfast emphasis on <span className="text-slate-900 dark:text-white font-medium border-b-2 border-blue-500/20">quality</span> and <span className="text-slate-900 dark:text-white font-medium border-b-2 border-blue-500/20">professionalism</span>, ensuring every structure stands as a testament to our engineering excellence.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
