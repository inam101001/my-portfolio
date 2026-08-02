const stackItems = [
  { name: "Next.js", src: "/nextjs-logo.svg" },
  { name: "TypeScript", src: "/typescript-logo.svg" },
  { name: "MongoDB", src: "/mongodb-logo.svg" },
];

const ciSteps = [
  "Git push (main / develop)",
  "npm ci — install dependencies",
  "Next.js build (validate)",
  "Docker image build (multi-stage)",
  "Push image (main branch only)",
];

export function MistleArchitectureDiagram() {
  return (
    <div className="mistle-diagram" aria-hidden="true">
      <div className="md-canvas">
        <div className="md-col md-col-stack">
          <span className="md-group-label">Built with</span>
          <div className="md-stack-list">
            {stackItems.map(({ name, src }) => (
              <div className="md-stack-item" key={name}>
                <img src={src} alt="" width={24} height={24} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md-map">
          <div className="md-col md-col-ci">
            <span className="md-group-label" data-tone="blue">
              CI · GitHub Actions
            </span>
            <div className="md-ci-steps">
              {ciSteps.map((step, index) => (
                <div className="md-step-wrap" key={step}>
                  <div className="md-step">
                    <span className="md-step-index" style={{ animationDelay: `${index * 0.35}s` }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </div>
                  {index < ciSteps.length - 1 && <span className="md-arrow-down" />}
                </div>
              ))}
            </div>
          </div>

          <span className="md-connector" />

          <div className="md-col md-col-registry">
            <span className="md-group-label" data-tone="alert">
              Docker Hub
            </span>
            <div className="md-registry-box">
              <span className="md-registry-title">inam101001/mistle-app</span>
              <span className="md-registry-meta" data-tone="blue">
                :latest · :{"{git-sha}"}
              </span>
            </div>
          </div>

          <span className="md-connector" />

          <div className="md-col md-col-deploy">
            <span className="md-group-label" data-tone="green">
              Google Cloud Run
            </span>
            <div className="md-deploy-block">
              <div className="md-runtime-block">Serverless container · auto-scaling</div>
              <span className="md-arrow-down" />
              <div className="md-app-node">
                <span className="md-live-dot" />
                <span className="md-app-name">mistle-app</span>
                <span className="md-app-meta">node server.js · standalone · :3000</span>
              </div>
            </div>
          </div>

          <span className="md-connector" />

          <div className="md-col md-col-data">
            <span className="md-group-label">Data &amp; Auth</span>
            <div className="md-data-node">
              <span className="md-data-name">MongoDB Atlas</span>
              <span className="md-data-meta">User · Diagram (Mongoose)</span>
            </div>
            <span className="md-arrow-down" />
            <div className="md-auth-node">
              <span className="md-auth-name">NextAuth</span>
              <span className="md-auth-meta">GitHub OAuth · Google OAuth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
