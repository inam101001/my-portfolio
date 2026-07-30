import { ArrowDownRight } from "lucide-react";

function DeliveryDiagram() {
  const labels = ["Commit", "Build", "Scan", "Package", "Deploy", "Observe"];

  return (
    <div className="delivery-diagram" aria-label="Delivery system sequence">
      {labels.map((label, index) => (
        <div className="delivery-step" key={label}>
          <span>{label}</span>
          {index < labels.length - 1 ? <i aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

function InfrastructureDiagram() {
  return (
    <svg
      className="ledger-svg"
      viewBox="0 0 360 132"
      role="img"
      aria-label="Repeatable infrastructure layers"
    >
      <rect x="14" y="14" width="332" height="26" rx="2" />
      <rect x="38" y="53" width="284" height="26" rx="2" />
      <rect x="64" y="92" width="232" height="26" rx="2" />
      <path d="M 26 27 H 92 M 50 66 H 116 M 76 105 H 142" />
      <circle cx="324" cy="27" r="5" />
      <circle cx="300" cy="66" r="5" />
      <circle cx="274" cy="105" r="5" />
    </svg>
  );
}

function ObserveDiagram() {
  const bars = [34, 72, 49, 104, 82, 118, 66, 92, 44];

  return (
    <svg
      className="ledger-svg observe-svg"
      viewBox="0 0 360 132"
      role="img"
      aria-label="Observability signal bars"
    >
      {bars.map((height, index) => (
        <rect
          key={`${height}-${index}`}
          x={18 + index * 38}
          y={124 - height}
          width="18"
          height={height}
          rx="1"
        />
      ))}
      <path d="M 12 124 H 350" />
    </svg>
  );
}

export function SystemLedger() {
  return (
    <section className="system-ledger page-shell" aria-labelledby="systems-title">
      <div className="ledger-heading">
        <h2 id="systems-title">The infrastructure behind the interface.</h2>
        <p>
          The work lives in the handoffs: repeatable infrastructure, traceable
          delivery, and production signals that make the next decision easier.
        </p>
        <a href="#process">
          Follow the lifecycle
          <ArrowDownRight size={18} aria-hidden="true" />
        </a>
      </div>

      <div className="ledger-grid">
        <article className="ledger-record ledger-record-main">
          <div className="record-head">
            <span>DELIVERY CONTROL</span>
            <span>CI / CD / GITOPS</span>
          </div>
          <div>
            <h3>One artifact. A visible route to production.</h3>
            <p>
              Build, test, scan, package, and release through automation that
              keeps every production change inspectable.
            </p>
          </div>
          <DeliveryDiagram />
          <ul aria-label="Delivery technologies">
            <li>GitHub Actions</li>
            <li>Docker</li>
            <li>Trivy</li>
            <li>ArgoCD</li>
          </ul>
        </article>

        <article className="ledger-record ledger-record-infra">
          <div className="record-head">
            <span>INFRASTRUCTURE</span>
            <span>REPEATABLE</span>
          </div>
          <InfrastructureDiagram />
          <h3>Cloud environments encoded, reviewed, and reproducible.</h3>
          <p>Terraform, Ansible, AWS, and Google Cloud.</p>
        </article>

        <article className="ledger-record ledger-record-observe">
          <div className="record-head">
            <span>OBSERVABILITY</span>
            <span>READABLE</span>
          </div>
          <ObserveDiagram />
          <h3>Health signals available before production becomes guesswork.</h3>
          <p>Prometheus, Grafana, CloudWatch, and service probes.</p>
        </article>
      </div>
    </section>
  );
}
