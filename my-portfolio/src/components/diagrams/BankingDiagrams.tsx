import React from "react";

const glowFilter = (
  <defs>
    <filter id="glow-neon">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <path d="M0,0 L10,3.5 L0,7 Z" fill="#00ff99" />
    </marker>
    <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <path d="M0,0 L10,3.5 L0,7 Z" fill="#3b82f6" />
    </marker>
  </defs>
);

// 1. Banking System Architecture (K8s Fokus)
export const BankingSystem: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <rect x="20" y="40" width="960" height="520" rx="16" fill="rgba(0,15,5,0.4)" stroke="#00ff99" strokeWidth="2" strokeDasharray="8,4" />
        <text x="40" y="32" fill="#00ff99" fontSize="14" fontWeight="bold">CLUSTER : k8s-kind-microbank</text>

        <g transform="translate(100, 70)">
            <rect width="800" height="60" rx="30" fill="rgba(0,255,153,0.1)" stroke="#00ff99" strokeWidth="2" filter="url(#glow-neon)" />
            <text x="400" y="38" textAnchor="middle" fill="#00ff99" fontSize="16" fontWeight="bold">NGINX INGRESS CONTROLLER (Path-based Routing)</text>
        </g>

        <g transform="translate(60, 180)">
            {['user_service:8001', 'account_service:8002', 'transaction_service:8003', 'notification_service:8004'].map((svc, i) => (
                <g key={svc} transform={`translate(${i * 220}, 0)`}>
                    <rect width="180" height="140" rx="8" fill="#030712" stroke="#00ff99" strokeWidth="2" />
                    <text x="90" y="25" textAnchor="middle" fill="#00ff99" fontSize="11" fontWeight="bold">{svc.split(':')[0]}</text>
                    <path d="M90,60 L90,105" stroke="#00ff99" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
                    <rect x="30" y="105" width="120" height="25" rx="4" fill="#00ff99" />
                    <text x="90" y="122" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">PostgreSQL PVC</text>
                </g>
            ))}
        </g>

        <g transform="translate(300, 400)">
            <rect width="400" height="80" rx="40" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="2" />
            <text x="200" y="45" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">RABBITMQ (Message Broker)</text>
        </g>
    </svg>
);

// 2. Banking CI Pipeline (GHA Focused)
export const BankingPipeline: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="50" textAnchor="middle" fill="#3b82f6" fontSize="22" fontWeight="bold">GITHUB ACTIONS : Banking CI Flow</text>
        {[
            "1. Git Push / PR Trigger",
            "2. Detect Changed Services (Smart Build)",
            "3. Docker Image Build (Multi-stage)",
            "4. Security Scan (Trivy)",
            "5. Update Helm/K8s Manifests in Ops Repo",
            "6. Auto-Commit Manifest Update"
        ].map((step, i) => (
            <g key={step} transform={`translate(100, ${100 + i * 75})`}>
                <rect width="800" height="50" rx="8" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="20" y="32" fill="#fff" fontSize="14">{step}</text>
                {i < 5 && <path d="M400,50 L400,75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />}
            </g>
        ))}
    </svg>
);

// 3. Banking GitOps Sync (ArgoCD Focused)
export const BankingGitOps: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="60" textAnchor="middle" fill="#ef4444" fontSize="24" fontWeight="bold">ArgoCD : K8s State Reconciliation</text>
        
        <g transform="translate(50, 150)">
            <rect width="350" height="150" rx="10" fill="#030712" stroke="#fff" />
            <text x="175" y="35" textAnchor="middle" fill="#fff" fontWeight="bold">Git Ops Repository</text>
            <text x="30" y="70" fill="#00ff99" fontSize="12">deployment.yaml version: v2.1.0</text>
        </g>

        <g transform="translate(600, 150)">
            <rect width="350" height="150" rx="10" fill="#030712" stroke="#3b82f6" />
            <text x="175" y="35" textAnchor="middle" fill="#3b82f6" fontWeight="bold">Live K8s Cluster</text>
            <text x="30" y="70" fill="#ef4444" fontSize="12">Running version: v2.0.8</text>
            <text x="175" y="110" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">STATUS: Out of Sync</text>
        </g>

        <g transform="translate(350, 350)">
            <rect width="300" height="100" rx="50" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="3" />
            <text x="150" y="55" textAnchor="middle" fill="#ef4444" fontSize="28" fontWeight="bold">ArgoCD</text>
            <text x="150" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">Automated Sync & Healing</text>
        </g>
        <path d="M225,300 L350,380" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" />
        <path d="M650,380 L775,300" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" markerEnd="url(#arrow-green)" />
    </svg>
);

// 4. Banking Observability (Prometheus/Grafana)
export const BankingObservability: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="60" textAnchor="middle" fill="#f87171" fontSize="24" fontWeight="bold">Observability : Multi-Service Monitoring</text>

        <g transform="translate(50, 150)">
            <rect width="250" height="350" rx="10" fill="rgba(0,15,5,0.4)" stroke="#00ff99" />
            <text x="125" y="30" textAnchor="middle" fill="#00ff99" fontSize="14" fontWeight="bold">K8s Pod Targets</text>
            {['Users App', 'Accounts App', 'Txn App', 'RabbitMQ', 'Postgres'].map((t, i) => (
                <text key={t} x="30" y={70 + i * 60} fill="#fff" fontSize="12">◉ {t} [metrics]</text>
            ))}
        </g>

        <g transform="translate(400, 200)">
            <rect width="200" height="200" rx="100" fill="rgba(248,113,113,0.1)" stroke="#f87171" strokeWidth="3" />
            <text x="100" y="95" textAnchor="middle" fill="#f87171" fontSize="22" fontWeight="bold">Prometheus</text>
            <text x="100" y="120" textAnchor="middle" fill="#fff" fontSize="9">Scrape: every 15s</text>
        </g>

        <g transform="translate(700, 225)">
            <rect width="250" height="150" rx="10" fill="#030712" stroke="#f59e0b" strokeWidth="2" />
            <text x="125" y="40" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">Grafana</text>
            <rect x="30" y="60" width="190" height="60" rx="4" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="1" />
            <text x="125" y="95" textAnchor="middle" fill="#fff" fontSize="10">System Health Dashboard</text>
        </g>
        
        <path d="M300,325 L400,300" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrow-green)" />
        <path d="M600,300 L700,300" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-green)" />
    </svg>
);
