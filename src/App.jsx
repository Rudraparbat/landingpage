import React, { useState } from "react";
import { Navbar, Hero, About, Work, Services, Contact, Footer } from "./components";
import usePerformanceMonitoring from "./hooks/usePerformanceMonitoring";

const App = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();

  // Lifted state for filtering sections from Navbar
  const [activeWorkFilter, setActiveWorkFilter] = useState("All");
  const [activeServiceFilter, setActiveServiceFilter] = useState("All");

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-[#0a0f1e] dark:via-[#0f172a] dark:to-[#1e1b4b] dark:text-white transition-all duration-500">
      <Navbar 
        setActiveWorkFilter={setActiveWorkFilter}
        setActiveServiceFilter={setActiveServiceFilter}
      />
      <main className="flex-1">
        <Hero />
        <About />
        <Work activeTab={activeWorkFilter} setActiveTab={setActiveWorkFilter} />
        <Services activeTab={activeServiceFilter} setActiveTab={setActiveServiceFilter} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
