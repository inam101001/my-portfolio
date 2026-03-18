import React, { useState, useEffect } from "react";
import { User, Briefcase, Mail, Home } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, href, label, isActive }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li className="relative">
      <a
        href={href}
        id={`nav-${label.toLowerCase()}`}
        aria-label={label}
        className={`
          relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl
          transition-all duration-300 group
          ${isActive
            ? "text-black bg-[#00ff99] shadow-[0_0_20px_rgba(0,255,153,0.4)]"
            : "text-[#00ff99]/70 hover:text-[#00ff99]"
          }
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={`transition-transform duration-200 ${hovered && !isActive ? "scale-110" : ""}`}>
          {icon}
        </span>

        {/* Tooltip */}
        <span
          className={`
            absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono
            bg-black/90 text-[#00ff99] border border-[#00ff99]/25 rounded-md
            whitespace-nowrap pointer-events-none
            transition-all duration-200
            ${hovered ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-1"}
          `}
        >
          {label}
        </span>
      </a>
    </li>
  );
};

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(false);

  const navItems = [
    { icon: <Home size={18} />, href: "#home", label: "Home", id: "home" },
    { icon: <User size={18} />, href: "#about", label: "About", id: "about" },
    { icon: <Briefcase size={18} />, href: "#projects", label: "Projects", id: "projects" },
    { icon: <Mail size={18} />, href: "#contact", label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    // Show after short delay
    const t = setTimeout(() => setVisible(true), 800);

    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        nav-pill rounded-2xl px-4 py-2
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={activeSection === item.id}
          />
        ))}
      </ul>

      {/* Green glow line at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,255,153,0.6), transparent)",
        }}
      />
    </nav>
  );
};

export default Navbar;
