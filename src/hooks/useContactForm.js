import React from "react";
import { CONTACT_EMAIL, SUBMIT_ENDPOINT } from "../constants/app";

export default function useContactForm() {
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [contactErrors, setContactErrors] = React.useState({});
  const [contactStatus, setContactStatus] = React.useState("idle"); // idle | loading | success | error

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
    if (!contactName || contactName.trim().length < 2) errors.name = "Please enter at least 2 characters.";
    if (!emailOk) errors.email = "Please enter a valid email address.";
    if (!contactMessage || contactMessage.trim().length < 10) errors.message = "Please enter at least 10 characters.";
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMessage.trim(),
      source: "landingpage",
    };

    try {
      setContactStatus("loading");
      if (SUBMIT_ENDPOINT) {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submission failed");
        setContactStatus("success");
      } else {
        const subject = `Website enquiry - ${contactName || "B B Bengal"}`;
        const body = [
          `Name: ${contactName || "-"}`,
          `Email: ${contactEmail || "-"}`,
          "",
          "Message:",
          contactMessage || "-",
        ].join("\n");
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setContactStatus("success");
      }
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactErrors({});
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
  };

  return {
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactMessage,
    setContactMessage,
    contactErrors,
    contactStatus,
    handleContactSubmit,
  };
}