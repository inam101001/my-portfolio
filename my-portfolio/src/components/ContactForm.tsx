import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ContactForm: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const services = [
    "Web Development",
    "Mobile Development",
    "Cloud Solutions",
    "DevOps Services",
    "UI/UX Design",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl ">
      <h2 className="text-[#00ff99] text-4xl mb-4 font-mono">
        Let's work together
      </h2>
      <p className="text-gray-400 mb-8">
        Have a project in mind? Let's discuss how we can bring your ideas to
        life.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          placeholder="Firstname"
          value={formData.firstName}
          onChange={handleChange}
          className="bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Lastname"
          value={formData.lastName}
          onChange={handleChange}
          className="bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
        />
      </div>

      <div className="relative">
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors appearance-none"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
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
        rows={6}
        className="w-full bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#00ff99] focus:outline-none focus:ring-1 focus:ring-[#00ff99] transition-colors"
      />

      <button
        type="submit"
        className="bg-[#00ff99] text-black px-6 py-3 rounded-md hover:bg-[#00cc7a] transition-colors font-mono"
      >
        Send message
      </button>
    </form>
  );
};

export default ContactForm;
