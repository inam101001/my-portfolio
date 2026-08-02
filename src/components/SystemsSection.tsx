import { systemGroups } from "../data/portfolio";

const artifactById: Record<string, { src: string; alt: string }> = {
  cloud: { src: "/01-cloud-control-fabric.svg", alt: "Cloud control fabric" },
  delivery: { src: "/02-delivery-pipeline.svg", alt: "Delivery pipeline" },
  containers: {
    src: "/03-containers-iac-stack.svg",
    alt: "Containers and infrastructure as code",
  },
  observability: {
    src: "/04-observability-radar.svg",
    alt: "Observability telemetry radar",
  },
  backend: { src: "/05-backend-data-mesh.svg", alt: "Backend and data mesh" },
  network: {
    src: "/06-network-security-perimeter.svg",
    alt: "Network and security perimeter",
  },
};

export function SystemsSection() {
  return (
    <section id="systems" className="systems-section chapter-shell">
      <div className="chapter-heading">
        <h2>Systems I work across.</h2>
        <p>Tools matter most when they connect into a delivery system.</p>
      </div>

      <div className="systems-grid" role="list">
        {systemGroups.map((group, index) => {
          const artifact = artifactById[group.id];
          return (
            <article key={group.id} className="system-record" role="listitem">
              <div className="system-record-header">
                <span className="system-title">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {group.name}
                  <i aria-hidden="true" />
                </span>
              </div>
              {artifact ? (
                <img
                  className="system-artifact-image"
                  src={artifact.src}
                  alt={artifact.alt}
                  loading="lazy"
                  width={480}
                  height={260}
                />
              ) : null}
              <p className="system-tools">{group.tools.join(" / ")}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
