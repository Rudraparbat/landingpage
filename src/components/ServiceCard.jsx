import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ServiceCard = ({ title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative h-full bg-white/60 dark:bg-[#0f172a]/60 p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg shadow-blue-500/5 backdrop-blur-xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-blue-500/10 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            {/* Simple decorative icon based on first letter or generic */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        </div>

        <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
            {desc}
        </p>
    </div>
  </motion.div>
);

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default ServiceCard;
