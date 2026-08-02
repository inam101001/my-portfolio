import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#systems", label: "Systems" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = ["home", ...links.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Inam Ul Haq, back to top">
        INAM UL HAQ <span aria-hidden="true" />
      </a>
      <nav className="site-nav" aria-label="Portfolio">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={activeId === link.href.slice(1) ? "location" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
