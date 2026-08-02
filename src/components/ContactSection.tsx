import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ContactFormModal } from "./ContactFormModal";

export function ContactSection() {
  return (
    <section id="contact" className="contact-world">
      <div className="contact-copy">
        <h2>
          Let’s build
          <br />
          something that
          <br />
          survives production.
        </h2>
        <p>
          If you need someone who can connect application code, delivery
          automation, infrastructure, and observability, let’s talk.
        </p>
      </div>

      <div className="contact-actions">
        <ContactFormModal />
        <a
          className="button"
          href="https://github.com/inam101001"
          target="_blank"
          rel="noreferrer"
        >
          View GitHub <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          className="button"
          href="https://www.linkedin.com/in/iaminam/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <dl className="contact-records">
        <div>
          <dt>Email</dt>
          <dd><a href="mailto:inam101001@gmail.com">inam101001@gmail.com</a></dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Koblenz, Germany</dd>
        </div>
        <div>
          <dt>Website</dt>
          <dd><a href="https://inamulhaq.site">inamulhaq.site</a></dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd><a href="https://github.com/inam101001">github.com/inam101001</a></dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd><a href="https://www.linkedin.com/in/iaminam/">linkedin.com/in/iaminam/</a></dd>
        </div>
      </dl>

      <div className="ready-state">
        <span aria-hidden="true" /> Ready for the next system.
      </div>

      <footer className="site-footer">
        <span>© Inam Ul Haq</span>
        <span>Koblenz, Germany</span>
        <span>Designed as a working system</span>
        <a href="#home">Back to top <ArrowUp aria-hidden="true" /></a>
      </footer>
    </section>
  );
}
