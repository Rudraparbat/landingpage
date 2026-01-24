import React from "react";
import SectionTitle from "./SectionTitle";
import { SocialBar } from "./";
import useContactForm from "../hooks/useContactForm";

const Contact = () => {
  const {
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactMessage,
    setContactMessage,
    contactErrors,
    contactStatus,
    handleContactSubmit,
  } = useContactForm();

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-10 md:py-12 border-t border-blue-200/70 dark:border-blue-900/50 bg-white/60 dark:bg-[#0a0f1e]/50 backdrop-blur-sm">
      <SectionTitle label="Contact us" />
      <div className="mt-8 grid md:grid-cols-2 gap-10">
        <div className="space-y-6 text-sm md:text-base text-slate-700 dark:text-gray-300">
          <p>Ready to transform your space? Get in touch with our interior experts today.</p>
          
          <div className="space-y-4 pt-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Head Office</h3>
              <p className="text-sm">BB Bengal & Co</p>
              <p className="text-sm">S/H/1 B.P first lane, Mahesh</p>
              <p className="text-sm">Serampur, Hooghly</p>
              <p className="text-sm">West Bengal, Pin 712202</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Phone</h3>
              <p className="text-sm"><a href="tel:+918478807327" className="hover:text-blue-600 dark:hover:text-blue-400 transition">+91 8478807327</a></p>
              <p className="text-sm"><a href="tel:+917439100473" className="hover:text-blue-600 dark:hover:text-blue-400 transition">+91 7439100473</a></p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
              <p className="text-sm"><a href="mailto:bbbengal15@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition">bbbengal15@gmail.com</a></p>
              <p className="text-sm"><a href="mailto:bidyutdas2007@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition">bidyutdas2007@gmail.com</a></p>
            </div>
          </div>
          
          <SocialBar />
        </div>
        <form className="space-y-4" onSubmit={handleContactSubmit}>
          <div>
            <label htmlFor="contact-name" className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">Name</label>
            <input
              id="contact-name"
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full rounded-lg bg-white border border-blue-200/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 dark:bg-[#0f172a]/80 dark:border-blue-900/50 dark:text-white dark:placeholder-gray-500"
              placeholder="Your name"
              aria-label="Your full name"
              aria-required="true"
              aria-describedby={contactErrors.name ? "contact-name-error" : undefined}
              required
            />
            {contactErrors.name && (
              <p id="contact-name-error" className="text-[11px] text-red-600 mt-1" role="alert">{contactErrors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">Email</label>
            <input
              id="contact-email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full rounded-lg bg-white border border-blue-200/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 dark:bg-[#0f172a]/80 dark:border-blue-900/50 dark:text-white dark:placeholder-gray-500"
              placeholder="you@example.com"
              aria-label="Your email address"
              aria-required="true"
              aria-describedby={contactErrors.email ? "contact-email-error" : undefined}
              required
            />
            {contactErrors.email && (
              <p id="contact-email-error" className="text-[11px] text-red-600 mt-1" role="alert">{contactErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-slate-600 dark:text-gray-400 mb-1">Message</label>
            <textarea
              id="contact-message"
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full rounded-lg bg-white border border-blue-200/70 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 dark:bg-[#0f172a]/80 dark:border-blue-900/50 dark:text-white dark:placeholder-gray-500"
              placeholder="Tell us about your project..."
              aria-label="Your message"
              aria-required="true"
              aria-describedby={contactErrors.message ? "contact-message-error" : undefined}
              required
            />
            {contactErrors.message && (
              <p id="contact-message-error" className="text-[11px] text-red-600 mt-1" role="alert">{contactErrors.message}</p>
            )}
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-[#0a0f1e] disabled:opacity-70" 
            aria-busy={contactStatus === "loading"}
            disabled={contactStatus === "loading"}
            aria-label={contactStatus === "loading" ? "Sending your message" : "Send contact form"}
          >
            {contactStatus === "loading" ? "Sending..." : "Send message"}
          </button>
          <div id="contact-status" className="text-[11px]">
            {contactStatus === "success" && <span className="text-green-600">Message sent successfully.</span>}
            {contactStatus === "error" && <span className="text-red-600">Something went wrong. Please try again.</span>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;