import { useEffect, useState } from "react";
import { ArrowDownToLine, Menu, X } from "lucide-react";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function ArchiveHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const handleResize = () => setMenuOpen(false);

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="archive-header">
      <a className="archive-wordmark" href="#top" aria-label="Inam Ul Haq, home">
        <span aria-hidden="true">IUH</span>
        <strong>Inam Ul Haq</strong>
      </a>

      <button
        className="archive-menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="archive-navigation"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <nav
        id="archive-navigation"
        className={menuOpen ? "archive-nav is-open" : "archive-nav"}
        aria-label="Primary navigation"
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          className="archive-cv"
          href="/InamUlHaq_CV.pdf"
          download
          onClick={() => setMenuOpen(false)}
        >
          Download CV
          <ArrowDownToLine size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
