import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/portfolio";
import { BankingArchitectureDiagram } from "./artifacts/BankingArchitectureDiagram";
import { MistleArchitectureDiagram } from "./artifacts/MistleArchitectureDiagram";
import { PortfolioArchitectureDiagram } from "./artifacts/PortfolioArchitectureDiagram";

function ProjectArchitecture({
  project,
  recordIndex,
}: {
  project: Project;
  recordIndex: number;
}) {
  return (
    <div
      className="project-architecture"
      data-record={recordIndex}
      aria-hidden="true"
    >
      <div className="architecture-line" />
      {project.stages.map((stage, index) => (
        <div className="architecture-node" key={stage}>
          <span>{stage}</span>
          <div className="node-top">
            <b>{index % 2 === 0 ? "0006" : "0x04"}</b>
          </div>
          <div className="node-side" />
        </div>
      ))}
    </div>
  );
}

function ProjectRecord({
  project,
  index,
  isExpanded,
  onExpand,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
}) {
  return (
    <article
      id={`project-${project.id}`}
      className="project-record"
      data-expanded={isExpanded}
      onMouseEnter={onExpand}
      onFocus={onExpand}
    >
      <span className="record-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <dl className="project-proof">
          {project.proof.map((proof) => {
            const [value, ...label] = proof.split(" ");
            return (
              <div key={proof}>
                <dt>{value}</dt>
                <dd>{label.join(" ")}</dd>
              </div>
            );
          })}
        </dl>
        <p className="technology-line">{project.technologies.join(" / ")}</p>
        <div className="record-actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live project <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub repository <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      {project.id === "banking" ? (
        <BankingArchitectureDiagram />
      ) : project.id === "mistle" ? (
        <MistleArchitectureDiagram />
      ) : project.id === "portfolio" ? (
        <PortfolioArchitectureDiagram />
      ) : (
        <ProjectArchitecture project={project} recordIndex={index} />
      )}
    </article>
  );
}

export function ProjectsSection() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="work" className="projects-world chapter-shell">
      <div className="chapter-heading">
        <h2>Selected work.</h2>
        <p>Systems, delivery paths, and infrastructure built to be inspected.</p>
      </div>

      <nav className="project-tabs" aria-label="Selected projects">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            onClick={(event) => {
              event.preventDefault();
              setExpandedIndex(index);
              history.pushState(null, "", `#project-${project.id}`);
              const target = document.getElementById(`project-${project.id}`);
              // Wait out the record's expand transition so scrollIntoView measures its final height, not the collapsed one.
              window.setTimeout(() => {
                target?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 400);
            }}
          >
            {project.shortName}
          </a>
        ))}
      </nav>

      <div
        className="project-grid"
        onMouseLeave={() => setExpandedIndex(0)}
      >
        {projects.map((project, index) => (
          <ProjectRecord
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedIndex === index}
            onExpand={() => setExpandedIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
