const stackItems = [
  { name: "Next.js", src: "/nextjs-logo.svg" },
  { name: "TypeScript", src: "/typescript-logo.svg" },
  { name: "MongoDB", src: "/mongodb-logo.svg" },
];

const featureSteps = [
  "Five-stage kanban tracking",
  "LaTeX CV + cover letter generation",
  "AI cover letters, ATS + skill-gap analysis",
  "AI-scraped job discovery",
  "Multi-track workspaces",
];

export function ApplystArchitectureDiagram() {
  return (
    <div className="applyst-diagram" aria-hidden="true">
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
              Core Features
            </span>
            <div className="md-ci-steps">
              {featureSteps.map((step, index) => (
                <div className="md-step-wrap" key={step}>
                  <div className="md-step">
                    <span className="md-step-index" style={{ animationDelay: `${index * 0.35}s` }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </div>
                  {index < featureSteps.length - 1 && <span className="md-arrow-down" />}
                </div>
              ))}
            </div>
          </div>

          <span className="md-connector" />

          <div className="md-col md-col-registry">
            <span className="md-group-label" data-tone="alert">
              AI Providers
            </span>
            <div className="md-registry-box">
              <span className="md-registry-title">OpenAI · Anthropic · Gemini</span>
              <span className="md-registry-meta" data-tone="blue">
                + Ollama (local, keyless)
              </span>
            </div>
          </div>

          <span className="md-connector" />

          <div className="md-col md-col-deploy">
            <span className="md-group-label" data-tone="green">
              Vercel
            </span>
            <div className="md-deploy-block">
              <div className="md-runtime-block">Serverless functions · edge middleware</div>
              <span className="md-arrow-down" />
              <div className="md-app-node">
                <span className="md-live-dot" />
                <span className="md-app-name">applyst</span>
                <span className="md-app-meta">Next.js 16 App Router</span>
              </div>
            </div>
          </div>

          <span className="md-connector" />

          <div className="md-col md-col-data">
            <span className="md-group-label">Data &amp; Auth</span>
            <div className="md-data-node">
              <span className="md-data-name">MongoDB Atlas</span>
              <span className="md-data-meta">Mongoose ODM</span>
            </div>
            <span className="md-arrow-down" />
            <div className="md-auth-node">
              <span className="md-auth-name">JWT (jose)</span>
              <span className="md-auth-meta">httpOnly session cookie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
