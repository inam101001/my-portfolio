import React, { useState } from "react";
import { Code2, User, Briefcase, Mail } from "lucide-react";
import Tooltip from "./Tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, href, label }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li className="relative">
      <a
        href={href}
        className="text-[#00ff99] hover:text-white transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
      </a>
      {showTooltip && <Tooltip text={label} />}
    </li>
  );
};

const Navbar: React.FC = () => {
  const navItems = [
    { icon: <Code2 size={20} />, href: "#home", label: "Home" },
    { icon: <User size={20} />, href: "#about", label: "About" },
    { icon: <Briefcase size={20} />, href: "#projects", label: "Projects" },
    { icon: <Mail size={20} />, href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black border border-[#00ff99] rounded-full px-6 py-3 z-50">
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
