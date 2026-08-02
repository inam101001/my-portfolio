const stackItems = [
  { name: "React", src: "/react-logo.svg" },
  { name: "TypeScript", src: "/typescript-logo.svg" },
  { name: "Docker", src: "/docker-logo.svg" },
];

const ciSteps = [
  "Git push → main",
  "Docker Buildx build (local, for scan)",
  "Trivy scan — critical/high (report only)",
  "Push image → Docker Hub (:latest + :sha)",
  "SSH deploy → docker-compose up",
  "Verify health (curl https://)",
];

const monitorTargets = ["node-exporter", "cAdvisor", "nginx-exporter", "blackbox-exporter"];

export function PortfolioArchitectureDiagram() {
  return (
    <div className="portfolio-diagram" aria-hidden="true">
      <div className="pd-canvas">
        <div className="pd-col pd-col-stack">
          <span className="pd-group-label">Built with</span>
          <div className="pd-stack-list">
            {stackItems.map(({ name, src }) => (
              <div className="pd-stack-item" key={name}>
                <img src={src} alt="" width={24} height={24} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pd-map">
          <div className="pd-col pd-col-ci">
            <span className="pd-group-label" data-tone="blue">
              CI · GitHub Actions
            </span>
            <div className="pd-ci-steps">
              {ciSteps.map((step, index) => (
                <div className="pd-step-wrap" key={step}>
                  <div className="pd-step">
                    <span className="pd-step-index" style={{ animationDelay: `${index * 0.35}s` }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </div>
                  {index < ciSteps.length - 1 && <span className="pd-arrow-down" />}
                </div>
              ))}
            </div>
          </div>

          <span className="pd-connector" />

          <div className="pd-col pd-col-edge">
            <span className="pd-group-label" data-tone="alert">
              AWS · Terraform
            </span>
            <div className="pd-sync-box">
              <span className="pd-sync-title">CloudFront → origin.inamulhaq.site</span>
              <span className="pd-sync-meta" data-tone="blue">
                ACM TLS · SPA fallback · caches /assets/*
              </span>
            </div>
            <span className="pd-arrow-down" />
            <div className="pd-route-node">
              <span className="pd-live-dot" />
              Route53 — root/www + grafana + prometheus
            </div>
          </div>

          <span className="pd-connector" />

          <div className="pd-col pd-col-host">
            <span className="pd-group-label" data-tone="green">
              EC2 · Docker Compose
            </span>
            <div className="pd-host-block">
              <div className="pd-nginx-block">Nginx — ports 80 / 443 (Let&apos;s Encrypt)</div>
              <span className="pd-arrow-down" />
              <div className="pd-app-node">
                <span className="pd-app-name">portfolio-app</span>
                <span className="pd-app-meta">serves dist/ · t2.micro · Amazon Linux 2023</span>
              </div>
            </div>
          </div>

          <span className="pd-connector" />

          <div className="pd-col pd-col-monitor">
            <span className="pd-group-label">Monitoring</span>
            <div className="pd-targets">
              <span className="pd-targets-title">Docker Compose exporters</span>
              <ul>
                {monitorTargets.map((target) => (
                  <li key={target}>
                    {target} <em>[metrics]</em>
                  </li>
                ))}
              </ul>
            </div>
            <span className="pd-arrow-down" />
            <div className="pd-prometheus">
              <span className="pd-prometheus-sweep" />
              Prometheus — 15d retention
            </div>
            <span className="pd-arrow-down" />
            <div className="pd-grafana">
              <span>Grafana</span>
              <div className="pd-grafana-dash">grafana.inamulhaq.site</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
