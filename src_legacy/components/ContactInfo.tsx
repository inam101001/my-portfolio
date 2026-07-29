import React from "react";
import { Phone, Mail, MapPin, Github, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  index: number;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, href, index }) => (
  <ScrollReveal direction="right" delay={index * 100}>
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 shrink-0 glass-card rounded-xl flex items-center justify-center
                      group-hover:border-[#00ff99]/50 group-hover:shadow-[0_0_15px_rgba(0,255,153,0.15)]
                      transition-all duration-300">
        <span className="text-[#00ff99] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>
      <div>
        <div className="text-gray-600 font-mono text-xs tracking-widest uppercase mb-0.5">
          {label}
        </div>
        {href ? (
          <a
            href={href}
            className="text-white text-sm link-hover hover:text-[#00ff99] transition-colors duration-300"
          >
            {value}
          </a>
        ) : (
          <p className="text-white text-sm">{value}</p>
        )}
      </div>
    </div>
  </ScrollReveal>
);

const ContactInfo: React.FC = () => {
  const contacts: Omit<ContactItemProps, "index">[] = [
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "(+49) 1521 0926 948",
      href: "tel:+4915210926948",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "inam101001@gmail.com",
      href: "mailto:inam101001@gmail.com",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Rhineland-Palatinate, Germany",
    },
  ];

  const socials = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/inam101001",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/iaminam/",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {contacts.map((item, i) => (
          <ContactItem key={item.label} {...item} index={i} />
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#00ff99]/20 to-transparent my-6" />

      {/* Social / Online */}
      <div>
        <div className="text-gray-600 font-mono text-xs tracking-widest uppercase mb-3">
          Social
        </div>
        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 glass-card rounded-xl flex items-center justify-center
                         text-[#00ff99]/70 hover:text-[#00ff99]
                         hover:border-[#00ff99]/50 hover:shadow-[0_0_12px_rgba(0,255,153,0.2)]
                         transition-all duration-300 hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Availability badge */}
      <ScrollReveal direction="right" delay={350}>
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse"
                 style={{ boxShadow: "0 0 8px #00ff99" }} />
            <span className="text-[#00ff99] font-mono text-sm font-bold">
              Available for freelance
            </span>
          </div>
          <p className="text-gray-500 text-xs font-mono mt-1 ml-5">
            Open to exciting new projects
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ContactInfo;
