import type { CSSProperties } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, type ProjectRecord } from "../../data/portfolio";

function BankingSignal() {
  return (
    <svg
      className="project-signal-svg"
      viewBox="0 0 760 420"
      role="img"
      aria-label="Banking platform service topology"
    >
      <path d="M 66 210 H 174 M 242 210 H 344 M 412 210 H 514 M 582 210 H 694" />
      <path d="M 378 176 V 92 M 378 244 V 330" />
      <circle cx="208" cy="210" r="34" />
      <circle cx="378" cy="210" r="34" />
      <circle cx="548" cy="210" r="34" />
      <rect x="329" y="42" width="98" height="50" rx="4" />
      <rect x="329" y="330" width="98" height="50" rx="4" />
      <circle cx="66" cy="210" r="9" />
      <circle cx="694" cy="210" r="9" />
      <text x="208" y="216" textAnchor="middle">API</text>
      <text x="378" y="216" textAnchor="middle">QUEUE</text>
      <text x="548" y="216" textAnchor="middle">DATA</text>
      <text x="378" y="74" textAnchor="middle">GITOPS</text>
      <text x="378" y="362" textAnchor="middle">OBSERVE</text>
    </svg>
  );
}

function PortfolioSignal() {
  const stages = ["COMMIT", "SCAN", "IMAGE", "EC2", "EDGE"];

  return (
    <div className="portfolio-signal" aria-label="Portfolio delivery pipeline">
      {stages.map((stage, index) => (
        <div key={stage}>
          <span>{stage}</span>
          <i style={{ "--stage": index } as CSSProperties} />
        </div>
      ))}
    </div>
  );
}

function ProjectMedia({ project }: { project: ProjectRecord }) {
  if (project.image) {
    return (
      <div className="project-image-wrap">
        <img
          src={project.image}
          alt="Mistle diagram platform displayed on a laptop"
          loading="lazy"
        />
        <span aria-hidden="true">LIVE PRODUCT / MISTLE</span>
      </div>
    );
  }

  if (project.slug === "banking") return <BankingSignal />;
  return <PortfolioSignal />;
}

export function ProjectArchive() {
  return (
    <section id="work" className="project-archive" aria-labelledby="work-title">
      <div className="project-archive-heading page-shell">
        <h2 id="work-title">Three systems, opened like machine records.</h2>
        <p>
          Open a record and follow the connection from interface to
          infrastructure, automation, and the operating decisions behind it.
        </p>
      </div>

      <div className="project-accordion">
        {projects.map((project) => (
          <article
            className={`project-panel project-panel-${project.slug}`}
            key={project.id}
          >
            <div className="project-panel-top">
              <span>{project.id}</span>
              <span>{project.outcome}</span>
            </div>

            <ProjectMedia project={project} />

            <div className="project-panel-copy">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul aria-label={`${project.title} technologies`}>
                {project.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <div className="project-links">
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repository
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live project
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
