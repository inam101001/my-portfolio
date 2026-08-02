const coreServices = [
  { name: "user-service", hasPvc: true },
  { name: "account-service", hasPvc: true },
  { name: "frontend", hasPvc: false },
];

const ciSteps = [
  "Git push / PR trigger",
  "Detect changed services (smart build)",
  "Docker image build (multi-stage)",
  "Security scan (Trivy)",
  "Update K8s manifests (same repo)",
  "Auto-commit manifest update",
];

const podTargets = ["Users app", "Accounts app", "Txn app", "Notification app"];

const stackItems = [
  { name: "Python", src: "/python-logo.svg" },
  { name: "React", src: "/react-logo.svg" },
  { name: "PostgreSQL", src: "/postgresql-logo.svg" },
];

export function BankingArchitectureDiagram() {
  return (
    <div className="banking-diagram" aria-hidden="true">
      <div className="bd-canvas">
        <div className="bd-col bd-col-stack">
          <span className="bd-group-label">Built with</span>
          <div className="bd-stack-list">
            {stackItems.map(({ name, src }) => (
              <div className="bd-stack-item" key={name}>
                <img src={src} alt="" width={26} height={26} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bd-map">
          <div className="bd-col bd-col-ci">
            <span className="bd-group-label" data-tone="blue">
              CI · GitHub Actions
            </span>
            <div className="bd-ci-steps">
              {ciSteps.map((step, index) => (
                <div className="bd-step-wrap" key={step}>
                  <div className="bd-step">
                    <span className="bd-step-index" style={{ animationDelay: `${index * 0.35}s` }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </div>
                  {index < ciSteps.length - 1 && <span className="bd-arrow-down" />}
                </div>
              ))}
            </div>
          </div>

          <span className="bd-connector" />

          <div className="bd-col bd-col-gitops">
            <span className="bd-group-label" data-tone="alert">
              GitOps · ArgoCD
            </span>
            <div className="bd-sync-box">
              <span className="bd-sync-title">k8s/manifests/* (same repo)</span>
              <span className="bd-sync-meta" data-tone="blue">
                deployment.yaml · v2.1.0
              </span>
            </div>
            <span className="bd-arrow-down" />
            <div className="bd-argocd">
              <span className="bd-live-dot" />
              ArgoCD — sync &amp; healing
            </div>
          </div>

          <span className="bd-connector" />

          <div className="bd-col bd-col-cluster">
            <span className="bd-group-label" data-tone="green">
              K8s cluster — synced · v2.1.0
            </span>
            <div className="bd-cluster-block">
              <div className="bd-ingress-block">Nginx ingress controller (path-based routing)</div>
              <span className="bd-arrow-down" />
              <div className="bd-services-grid">
                {coreServices.map((service) => (
                  <div className="bd-service-col" key={service.name}>
                    <span className="bd-service-name">{service.name}</span>
                    <span className={service.hasPvc ? "bd-pvc" : "bd-pvc bd-pvc-none"}>
                      {service.hasPvc ? "PostgreSQL PVC" : "Static SPA"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bd-event-row">
                <div className="bd-service-col">
                  <span className="bd-service-name">transaction-service</span>
                  <span className="bd-pvc">PostgreSQL PVC</span>
                </div>
                <div className="bd-event-link">
                  <span className="bd-event-arrow" />
                  <span className="bd-event-label">transaction.completed</span>
                </div>
                <div className="bd-broker-node">RabbitMQ</div>
                <div className="bd-event-link">
                  <span className="bd-event-arrow" />
                  <span className="bd-event-label">notifications queue</span>
                </div>
                <div className="bd-service-col">
                  <span className="bd-service-name">notification-service</span>
                  <span className="bd-pvc">PostgreSQL PVC</span>
                </div>
              </div>
            </div>
          </div>

          <span className="bd-connector" />

          <div className="bd-col bd-col-observability">
            <span className="bd-group-label">Observability</span>
            <div className="bd-targets">
              <span className="bd-targets-title">K8s pod targets</span>
              <ul>
                {podTargets.map((target) => (
                  <li key={target}>
                    {target} <em>[metrics]</em>
                  </li>
                ))}
              </ul>
            </div>
            <span className="bd-arrow-down" />
            <div className="bd-prometheus">
              <span className="bd-prometheus-sweep" />
              Prometheus — scrape every 15s
            </div>
            <span className="bd-arrow-down" />
            <div className="bd-grafana">
              <span>Grafana</span>
              <div className="bd-grafana-dash">System health dashboard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
