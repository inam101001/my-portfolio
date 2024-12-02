import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.sendForm(
        "service_8jh55bf", // Replace with your EmailJS service ID
        "template_y855p8f", // Replace with your EmailJS template ID
        form.current,
        "a7Ke8zezFnlTyil-n" // Replace with your EmailJS public key
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I will get back to you soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending email:", error); // Log the raw error for debugging

      const errorMessage =
        error.text || "Failed to send message. Please try again later.";

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
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

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <h2 className="text-[#00ff99] text-4xl mb-4 font-mono">
        Let's work together
      </h2>
      <p className="text-gray-400 mb-8">
        Have a project in mind? Let's discuss how we can bring your ideas to
        life.
      </p>

      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-[#00ff99]/10 text-[#00ff99]"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          placeholder="Firstname"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Lastname"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
      </div>

      <div className="relative">
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors appearance-none"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option
              className="bg-black backdrop-blur-sm border border-[#00ff99]"
              key={service}
              value={service}
            >
              {service}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00ff99]"
          size={20}
        />
      </div>

      <textarea
        name="message"
        placeholder="Type your message here."
        value={formData.message}
        onChange={handleChange}
        required
        rows={6}
        className="w-full bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-[#00ff99] text-black px-6 py-3 rounded-md hover:bg-[#00cc7a] transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
};

export default ContactForm;
