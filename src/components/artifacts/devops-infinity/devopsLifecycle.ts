export type DevOpsPhase = {
  id: string;
  label: string;
  command: string;
  summary: string;
  tools: string[];
  panelSide: "left" | "right";
};

export const devOpsLifecycle: DevOpsPhase[] = [
  {
    id: "plan",
    label: "Plan",
    command: "define --delivery-path",
    summary:
      "Turn requirements into an infrastructure plan with clear environments, dependencies, and recovery paths.",
    tools: ["AWS", "Google Cloud", "Terraform"],
    panelSide: "right",
  },
  {
    id: "code",
    label: "Code",
    command: "author --automation",
    summary:
      "Build repeatable infrastructure and operational tooling that can be reviewed, versioned, and reused.",
    tools: ["Git", "Bash", "TypeScript"],
    panelSide: "right",
  },
  {
    id: "build",
    label: "Build",
    command: "package --repeatable",
    summary:
      "Convert source and configuration into consistent container images and automated pipeline artifacts.",
    tools: ["Docker", "Jenkins", "GitHub Actions"],
    panelSide: "right",
  },
  {
    id: "test",
    label: "Test",
    command: "validate --before-release",
    summary:
      "Check infrastructure changes, container behavior, and pipeline health before anything reaches production.",
    tools: ["Terraform", "Docker", "GitHub Actions"],
    panelSide: "right",
  },
  {
    id: "release",
    label: "Release",
    command: "promote --controlled",
    summary:
      "Promote known artifacts through a controlled delivery path with traceable automation and rollback options.",
    tools: ["Jenkins", "GitHub Actions", "ArgoCD"],
    panelSide: "left",
  },
  {
    id: "deploy",
    label: "Deploy",
    command: "apply --production",
    summary:
      "Provision and deploy containerized workloads across managed Kubernetes environments.",
    tools: ["Kubernetes", "EKS", "GKE", "Ansible"],
    panelSide: "left",
  },
  {
    id: "operate",
    label: "Operate",
    command: "maintain --resilient",
    summary:
      "Keep services available through orchestration, operational automation, and production-focused maintenance.",
    tools: ["Kubernetes", "AWS", "Google Cloud", "Bash"],
    panelSide: "left",
  },
  {
    id: "monitor",
    label: "Monitor",
    command: "observe --continuous",
    summary:
      "Use metrics, dashboards, and cloud telemetry to understand system health and catch failures early.",
    tools: ["Prometheus", "Grafana", "CloudWatch"],
    panelSide: "left",
  },
];
