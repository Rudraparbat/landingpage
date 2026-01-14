import React from "react";
import PropTypes from "prop-types";

const SectionTitle = ({ label }) => (
  <div className="flex items-center gap-3">
    <div className="h-px w-8 bg-blue-500" />
    <h2 className="text-sm tracking-[0.25em] uppercase text-slate-500 dark:text-gray-400">{label}</h2>
  </div>
);

SectionTitle.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SectionTitle;