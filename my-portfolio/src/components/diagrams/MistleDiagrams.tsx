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

// 1. Mistle Full DevOps Lifecycle
export const MistleLifecycle: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="40" textAnchor="middle" fill="#00ff99" fontSize="28" fontWeight="bold">Mistle : Full DevOps Lifecycle</text>
        <rect x="20" y="80" width="960" height="480" rx="20" fill="rgba(0,10,5,0.4)" stroke="#00ff99" strokeWidth="1" strokeDasharray="5,5" />
        
        <g transform="translate(60, 120)">
            <rect width="180" height="150" rx="10" fill="#030712" stroke="#fff" />
            <text x="90" y="30" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">SCM: GitHub</text>
            <text x="20" y="70" fill="#94a3b8" fontSize="10">Push main/PR</text>
        </g>

        <g transform="translate(320, 120)">
            <rect width="220" height="180" rx="10" fill="rgba(46,125,50,0.1)" stroke="#2e7d32" strokeWidth="2" />
            <text x="110" y="30" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">CI: GitHub Actions</text>
            <text x="30" y="75" fill="#4ade80" fontSize="10">→ Lint & Build</text>
            <text x="30" y="105" fill="#4ade80" fontSize="10">→ Multi-stage Docker</text>
            <text x="30" y="135" fill="#3b82f6" fontSize="10" fontWeight="bold">→ Push to DockerHub</text>
        </g>

        <g transform="translate(620, 120)">
            <rect width="320" height="280" rx="10" fill="#030712" stroke="#ea580c" strokeWidth="2" filter="url(#glow-neon)" />
            <text x="160" y="35" textAnchor="middle" fill="#ea580c" fontSize="16" fontWeight="bold">Production (AWS EC2)</text>
            <g transform="translate(40, 70)">
                <rect width="240" height="60" rx="6" fill="#1e1b4b" stroke="#00ff99" />
                <text x="120" y="38" textAnchor="middle" fill="#00ff99" fontSize="12" fontWeight="bold">Nginx Reverse Proxy</text>
            </g>
            <g transform="translate(40, 160)">
                <rect width="240" height="80" rx="6" fill="#030712" stroke="#3b82f6" />
                <text x="120" y="35" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Next.js Container</text>
                <text x="120" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8">Uptune: Node v20</text>
            </g>
        </g>

        <path d="M240,195 L320,195" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
        <path d="M540,210 L620,210" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-green)" />
    </svg>
);

// 2. Mistle AWS Infrastructure & Routing
export const MistleAWS: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="80" textAnchor="middle" fill="#3b82f6" fontSize="24" fontWeight="bold">AWS Cloud Architecture & Routing</text>
        
        <g transform="translate(50, 200)">
            <rect width="180" height="120" rx="10" fill="#030712" stroke="#3b82f6" />
            <text x="90" y="45" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Route 53</text>
            <text x="90" y="80" textAnchor="middle" fill="#fff" fontSize="10">DNS Manager</text>
        </g>

        <g transform="translate(300, 200)">
            <rect width="250" height="150" rx="10" fill="#030712" stroke="#f59e0b" filter="url(#glow-neon)" />
            <text x="125" y="45" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">CloudFront (CDN)</text>
            <text x="125" y="80" textAnchor="middle" fill="#fff" fontSize="9">Edge Caching + HTTPS</text>
            <text x="125" y="110" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">ACM SSL Termination</text>
        </g>

        <g transform="translate(650, 150)">
            <rect width="300" height="300" rx="15" fill="#030712" stroke="#00ff99" strokeWidth="3" />
            <text x="150" y="40" textAnchor="middle" fill="#00ff99" fontSize="18" fontWeight="bold">Ubuntu EC2 Instance</text>
            <g transform="translate(40, 80)">
                <rect width="220" height="60" rx="6" fill="rgba(0,10,5,0.8)" stroke="#ea580c" />
                <text x="110" y="38" textAnchor="middle" fill="#ea580c" fontSize="12" fontWeight="bold">Nginx Engine</text>
            </g>
            <g transform="translate(40, 180)">
                <rect width="220" height="80" rx="6" fill="#1e1b4b" stroke="#3b82f6" />
                <text x="110" y="45" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Next.js App</text>
            </g>
        </g>
        
        <path d="M230,260 L300,260" stroke="#fff" strokeWidth="1" strokeDasharray="5" markerEnd="url(#arrow-green)" />
        <path d="M550,275 L650,275" stroke="#fff" strokeWidth="2" markerEnd="url(#arrow-green)" />
    </svg>
);

// 3. Mistle CI/CD Pipeline Flow (SSH centric)
export const MistlePipeline: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="50" textAnchor="middle" fill="#ea580c" fontSize="22" fontWeight="bold">Mistle CI/CD : Auto-Deployment Flow</text>
        {[
            "1. Git Push (main branch)",
            "2. GHA: Multi-stage Docker Build",
            "3. GHA: Login & Push to DockerHub",
            "4. GHA: SSH Trigger to AWS EC2",
            "5. EC2: Docker Compose Pull",
            "6. EC2: Zero-Downtime Re-deploy"
        ].map((step, i) => (
            <g key={step} transform={`translate(150, ${100 + i * 75})`}>
                <rect width="700" height="50" rx="8" fill="#030712" stroke="#ea580c" strokeWidth="1.5" />
                <text x="20" y="32" fill="#fff" fontSize="14">{step}</text>
                {i < 5 && <path d="M350,50 L350,75" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-green)" />}
            </g>
        ))}
    </svg>
);

// 4. Mistle Monitoring (Instance centric)
export const MistleMonitoring: React.FC = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full font-mono">
        {glowFilter}
        <text x="500" y="80" textAnchor="middle" fill="#f43f5e" fontSize="24" fontWeight="bold">Observability : AWS Server Monitoring</text>
        
        <g transform="translate(100, 200)">
            <rect width="220" height="200" rx="10" fill="#030712" stroke="#3b82f6" />
            <text x="110" y="35" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">EC2 Metrics Source</text>
            <text x="30" y="80" fill="#fff" fontSize="11">◉ Node Exporter</text>
            <text x="30" y="120" fill="#fff" fontSize="11">◉ App Metrics (/metrics)</text>
            <text x="30" y="160" fill="#fff" fontSize="11">◉ Nginx VTS</text>
        </g>

        <g transform="translate(450, 225)">
            <ellipse cx="75" cy="75" rx="100" ry="80" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="3" filter="url(#glow-neon)" />
            <text x="75" y="85" textAnchor="middle" fill="#f43f5e" fontSize="20" fontWeight="bold">Prometheus</text>
        </g>

        <g transform="translate(750, 225)">
            <rect width="200" height="150" rx="10" fill="#030712" stroke="#f59e0b" strokeWidth="2" />
            <text x="100" y="40" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">Grafana</text>
            <line x1="20" y1="130" x2="180" y2="130" stroke="#f59e0b" strokeWidth="4" strokeDasharray="5" />
            <text x="100" y="145" textAnchor="middle" fill="#fff" fontSize="8">Live Dashboards</text>
        </g>

        <path d="M320,300 L450,300" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrow-green)" />
        <path d="M625,300 L750,300" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-green)" />
    </svg>
);
