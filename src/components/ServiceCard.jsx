import React from "react";
import PropTypes from "prop-types";

const ServiceCard = ({ title, desc }) => (
  <div className="rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-white/70 dark:bg-[#0a0f1e] p-5 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg">
    <h3 className="text-sm font-semibold mb-2 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-xs text-slate-600 dark:text-gray-400">{desc}</p>
  </div>
);

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default ServiceCard;