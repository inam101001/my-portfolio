import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="site-header">
      <a className="identity-lockup" href="#top" aria-label="Inam Ul Haq, home">
        <span className="identity-mark">IU</span>
        <span className="identity-copy">
          <strong>Inam Ul Haq</strong>
          <small><i aria-hidden="true" /> Available for opportunities</small>
        </span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>

      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="cv-link" href="/InamUlHaq_CV.pdf" download>
          <Download size={15} aria-hidden="true" />
          CV
        </a>
      </nav>
    </header>
  );
}
