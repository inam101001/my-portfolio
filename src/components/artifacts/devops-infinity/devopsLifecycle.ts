export type DevOpsPhase = {
  id: string;
  label: string;
  command: string;
  summary: string;
  tools: string[];
  panelSide: "left" | "right";
  panelY: string;
};

export const devOpsLifecycle: DevOpsPhase[] = [
  {
    id: "plan",
    label: "Plan",
    command: "map --infra-and-recovery",
    summary:
      "I turn product goals into a delivery map: environments, cloud boundaries, dependencies, and recovery paths before resources are created.",
    tools: ["AWS", "Google Cloud", "Terraform"],
    panelSide: "right",
    panelY: "28%",
  },
  {
    id: "code",
    label: "Code",
    command: "version --automation",
    summary:
      "I keep infrastructure and operational logic reviewable, versioned, and reusable so a production change never depends on memory.",
    tools: ["Git", "Bash", "TypeScript"],
    panelSide: "left",
    panelY: "42%",
  },
  {
    id: "build",
    label: "Build",
    command: "package --immutable",
    summary:
      "I package applications into consistent Docker images and make the pipeline produce the same artifact in every environment.",
    tools: ["Docker", "Jenkins", "GitHub Actions"],
    panelSide: "right",
    panelY: "57%",
  },
  {
    id: "test",
    label: "Test",
    command: "verify --before-prod",
    summary:
      "I validate Terraform changes, container behavior, security checks, and pipeline health before a release can reach production.",
    tools: ["Terraform", "Docker", "GitHub Actions"],
    panelSide: "left",
    panelY: "64%",
  },
  {
    id: "release",
    label: "Release",
    command: "promote --traceable",
    summary:
      "I promote known artifacts through controlled automation, preserving a traceable release path and a practical rollback route.",
    tools: ["Jenkins", "GitHub Actions", "ArgoCD"],
    panelSide: "right",
    panelY: "34%",
  },
  {
    id: "deploy",
    label: "Deploy",
    command: "rollout --orchestrated",
    summary:
      "I provision cloud infrastructure and roll containerized workloads into Kubernetes with repeatable, declarative delivery.",
    tools: ["Kubernetes", "EKS", "GKE", "Ansible"],
    panelSide: "left",
    panelY: "48%",
  },
  {
    id: "operate",
    label: "Operate",
    command: "stabilize --production",
    summary:
      "I keep clusters and cloud services dependable through orchestration, automation, capacity awareness, and production-focused maintenance.",
    tools: ["Kubernetes", "AWS", "Google Cloud", "Bash"],
    panelSide: "right",
    panelY: "61%",
  },
  {
    id: "monitor",
    label: "Monitor",
    command: "observe --close-the-loop",
    summary:
      "I make system health visible with metrics, dashboards, and cloud telemetry, then feed what I learn back into the next plan.",
    tools: ["Prometheus", "Grafana", "CloudWatch"],
    panelSide: "left",
    panelY: "31%",
  },
];
