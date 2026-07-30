import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

export function ContactArchive() {
  return (
    <section
      id="contact"
      className="contact-archive"
      aria-labelledby="contact-title"
    >
      <div className="contact-punch-rail" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <div className="contact-main">
        <h2 id="contact-title">Put the next system in motion.</h2>
        <p>
          Based in Rhineland-Palatinate, Germany. Open to DevOps, platform
          engineering, cloud infrastructure, and automation opportunities.
        </p>
        <div className="contact-actions">
          <a href="mailto:inam101001@gmail.com">
            <Mail size={19} aria-hidden="true" />
            Start a conversation
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="/InamUlHaq_CV.pdf" download>
            <Download size={18} aria-hidden="true" />
            Download CV
          </a>
        </div>
      </div>

      <div className="contact-index">
        <div>
          <span>Email</span>
          <a href="mailto:inam101001@gmail.com">inam101001@gmail.com</a>
        </div>
        <div>
          <span>Location</span>
          <p>
            <MapPin size={15} aria-hidden="true" />
            Koblenz, Germany
          </p>
        </div>
        <div>
          <span>Elsewhere</span>
          <p>
            <a
              href="https://github.com/inam101001"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/iaminam/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
          </p>
        </div>
      </div>

      <footer className="archive-footer">
        <span>Inam Ul Haq · 2026</span>
        <span>DevOps / Cloud / Automation</span>
        <a href="#top">Return to top</a>
      </footer>
    </section>
  );
}
