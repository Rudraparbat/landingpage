import React from "react";
import { Navbar, Hero, About, Work, Services, Contact, Footer, SocialBar } from "./components";
const App = () => {
  // Main app now renders section components; theme and contact logic moved into hooks and components.


 return (
   <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-[#0a0f1e] dark:via-[#0f172a] dark:to-[#1e1b4b] dark:text-white transition-all duration-500">
     <Navbar />
     <main className="flex-1">
       <Hero />
       <About />
       <Work />
       <Services />
       <Contact />
     </main>

     <Footer />
   </div>
 );
};

export default App;
