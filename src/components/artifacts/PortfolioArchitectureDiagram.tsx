const stackItems = [
  { name: "React", src: "/react-logo.svg" },
  { name: "TypeScript", src: "/typescript-logo.svg" },
  { name: "Docker", src: "/docker-logo.svg" },
];

const ciSteps = [
  "Git push → main",
  "Docker Buildx build (local, for scan)",
  "Trivy scan — critical/high (report only)",
  "Push image → Artifact Registry (:latest + :sha)",
  "Auth via WIF → deploy to Cloud Run",
  "Verify health (curl https://)",
];

const wifRoles = ["roles/run.admin", "roles/artifactregistry.writer", "roles/iam.serviceAccountUser"];

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
              GCP · Terraform
            </span>
            <div className="pd-sync-box">
              <span className="pd-sync-title">Cloud DNS → inamulhaq.site</span>
              <span className="pd-sync-meta" data-tone="blue">
                Domain mapping · Google-managed TLS
              </span>
            </div>
            <span className="pd-arrow-down" />
            <div className="pd-route-node">
              <span className="pd-live-dot" />
              Cloud DNS — root A/AAAA + www CNAME
            </div>
          </div>

          <span className="pd-connector" />

          <div className="pd-col pd-col-host">
            <span className="pd-group-label" data-tone="green">
              Cloud Run · Serverless
            </span>
            <div className="pd-host-block">
              <div className="pd-nginx-block">nginx:alpine — port 8080</div>
              <span className="pd-arrow-down" />
              <div className="pd-app-node">
                <span className="pd-app-name">my-portfolio</span>
                <span className="pd-app-meta">europe-west1 · scale 0→3 · 1 vCPU / 512Mi</span>
              </div>
            </div>
          </div>

          <span className="pd-connector" />

          <div className="pd-col pd-col-monitor">
            <span className="pd-group-label">Security</span>
            <div className="pd-targets">
              <span className="pd-targets-title">Workload Identity Federation</span>
              <ul>
                {wifRoles.map((role) => (
                  <li key={role}>
                    github-actions-deploy <em>[{role}]</em>
                  </li>
                ))}
              </ul>
            </div>
            <span className="pd-arrow-down" />
            <div className="pd-prometheus">
              <span className="pd-prometheus-sweep" />
              No long-lived keys
            </div>
            <span className="pd-arrow-down" />
            <div className="pd-grafana">
              <span>OIDC provider</span>
              <div className="pd-grafana-dash">token.actions.githubusercontent.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
