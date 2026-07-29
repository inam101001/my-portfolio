import React, { useState, useRef } from "react";
import { ChevronDown, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.sendForm(
        "service_8jh55bf",
        "template_y855p8f",
        form.current,
        "a7Ke8zezFnlTyil-n"
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent! I'll get back to you soon.",
      });

      setFormData({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
      setSubmitStatus({ type: "error", message: `Failed to send. ${msg}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Web Development",
    "Mobile Development",
    "Cloud Solutions",
    "DevOps Services",
    "UI/UX Design",
  ];

  const inputClass = (name: string) => `
    form-input
    ${focused === name ? "border-[#00ff99]/60 shadow-[0_0_0_3px_rgba(0,255,153,0.08)]" : ""}
  `;

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Heading */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-[#00ff99]" />
          <span className="text-[#00ff99] font-mono text-xs tracking-[0.2em] uppercase">Contact</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-1">
          Let's work{" "}
          <span className="text-[#00ff99]">together</span>
        </h2>
        <p className="text-gray-500 text-sm font-mono">
          // drop me a message and I'll respond within 24h
        </p>
      </div>

      {/* Status */}
      {submitStatus.type && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-sm font-mono ${
            submitStatus.type === "success"
              ? "bg-[#00ff99]/08 border border-[#00ff99]/25 text-[#00ff99]"
              : "bg-red-500/08 border border-red-500/25 text-red-400"
          }`}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle size={16} className="shrink-0" />
          ) : (
            <XCircle size={16} className="shrink-0" />
          )}
          {submitStatus.message}
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={() => setFocused("firstName")}
            onBlur={() => setFocused(null)}
            required
            className={inputClass("firstName")}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={() => setFocused("lastName")}
            onBlur={() => setFocused(null)}
            required
            className={inputClass("lastName")}
          />
        </div>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          required
          className={inputClass("email")}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => setFocused("phone")}
          onBlur={() => setFocused(null)}
          className={inputClass("phone")}
        />
      </div>

      {/* Service */}
      <div className="relative">
        <select
          name="service"
          id="service"
          value={formData.service}
          onChange={handleChange}
          onFocus={() => setFocused("service")}
          onBlur={() => setFocused(null)}
          required
          className={`${inputClass("service")} appearance-none`}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <option value="" disabled>Select a service</option>
          {services.map((s) => (
            <option key={s} value={s} className="bg-black text-white">
              {s}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff99]/60 pointer-events-none"
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        id="message"
        placeholder="Tell me about your project..."
        value={formData.message}
        onChange={handleChange}
        onFocus={() => setFocused("message")}
        onBlur={() => setFocused(null)}
        required
        rows={5}
        className={`${inputClass("message")} resize-none`}
      />

      {/* Submit */}
      <button
        type="submit"
        id="contact-submit-btn"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-bold font-mono text-sm
                   bg-[#00ff99] text-black
                   hover:bg-[#00ff99]/90 hover:shadow-[0_0_30px_rgba(0,255,153,0.4)]
                   active:scale-95 hover:scale-105
                   disabled:opacity-50 disabled:pointer-events-none
                   transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
