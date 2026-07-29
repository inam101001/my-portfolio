import type { CSSProperties } from "react";

const terminalOutput = [
  "Connection established. Session: persistent",
  "Welcome to Inam's DevOps workspace.",
  "",
  "$ whoami",
  "Inam Ul Haq",
  "DevOps Engineer | Cloud Infrastructure | Automation",
  "",
  "$ scan --core-stack",
  "Cloud Platforms    : AWS, Google Cloud",
  "Containers         : Docker, Kubernetes, EKS/GKE",
  "IaC & Automation   : Terraform, Ansible, Bash",
  "CI/CD              : Jenkins, GitHub Actions, ArgoCD",
  "Observability      : Prometheus, Grafana, CloudWatch",
  "",
  "$ scan --systems",
  "Production Deployments : containerized, repeatable, monitored",
  "Infrastructure         : versioned, automated, scalable",
  "Pipelines              : build, test, deploy, recover",
  "",
  "STATUS: Operational. Ready to scale.",
];

type TerminalRevealProps = {
  progress: number;
};

function formatLine(line: string) {
  if (!line) {
    return <span>&nbsp;</span>;
  }

  if (line.startsWith("$")) {
    return <span className="terminal-command">{line}</span>;
  }

  if (line.startsWith("->")) {
    return (
      <>
        <span className="terminal-arrow">-&gt;</span>
        <span>{line.slice(2).trim()}</span>
      </>
    );
  }

  if (line.startsWith("STATUS:")) {
    return <span className="terminal-section">{line}</span>;
  }

  return line;
}

export function TerminalReveal({ progress }: TerminalRevealProps) {
  const visibleLines = Math.round(progress * terminalOutput.length);
  const opacity = Math.min(1, Math.max(0, (progress - 0.06) * 1.18));
  const translateY = (1 - progress) * 24;
  const scale = 0.06 + progress * 0.94;
  const terminalStyle = {
    opacity,
    transform: `translate3d(0, ${translateY}vh, 0) scale(${scale})`,
  } as CSSProperties;

  return (
    <div className="terminal-reveal" style={terminalStyle}>
      <div className="terminal-titlebar">
        <div className="terminal-pins" aria-hidden="true">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="terminal-title">portfolio-terminal</span>
        <span className="terminal-spacer" />
      </div>

      <div className="terminal-body">
        <div className="terminal-prompt-line">
          <span className="prompt-user">inam</span>
          <span className="prompt-host">@portfolio</span>
          <span className="prompt-muted">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-muted">$</span>
          <span className="terminal-typed">ssh inam-cloud-instance</span>
        </div>

        <div className="terminal-output">
          {terminalOutput.map((line, index) => (
            <div
              className="terminal-line"
              data-visible={index < visibleLines}
              key={`${line}-${index}`}
            >
              {formatLine(line)}
            </div>
          ))}
        </div>

        <div className="terminal-prompt-line trailing">
          <span className="prompt-user">inam</span>
          <span className="prompt-host">@portfolio</span>
          <span className="prompt-muted">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-muted">$</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}
