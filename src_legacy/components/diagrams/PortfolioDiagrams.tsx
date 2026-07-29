import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { 
    Lock, 
    Search, 
    Server, 
    Activity, 
    Cpu,
    Container,
    Smartphone,
    Terminal,
    Workflow,
    ShieldCheck
} from 'lucide-react';

/**
 * Premium Implementation Strategy:
 * 1. Uses Lucide for structural/generic service icons (reliable, vector, consistent).
 * 2. Uses SimpleIcons (Hosted) for brand-specific tools.
 * 3. Applies an SVG Filter (feColorMatrix) to force ALL icons into the #00ff99 neon theme.
 */

type NeonIconProps = {
    IconComponent?: LucideIcon;
    slug?: string;
    x: number;
    y: number;
    size?: number;
    label: string;
    color?: string;
};

const NeonIcon = ({
    IconComponent,
    slug,
    x,
    y,
    size = 60,
    label,
    color = "#00ff99"
}: NeonIconProps) => {
    // If slug is provided, use SimpleIcons CDN, otherwise use Lucide component
    const hostedIconUrl = slug ? `https://cdn.simpleicons.org/${slug}/white` : null;

    return (
        <motion.g 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
        >
            {/* Glow backdrop */}
            <circle cx={x + size/2} cy={y + size/2} r={size * 0.6} fill={color} opacity="0.05" />
            
            {/* Box frame */}
            <rect 
                x={x} y={y} width={size} height={size} rx="12" 
                fill="#030712" stroke={`${color}40`} strokeWidth="1" 
                className="shadow-2xl"
            />
            
            <g style={{ filter: `url(#neon-filter-${color.replace('#','')})` }}>
                {hostedIconUrl ? (
                    <image 
                        href={hostedIconUrl} 
                        x={x + size*0.2} y={y + size*0.2} 
                        width={size*0.6} height={size*0.6} 
                    />
                ) : (
                    <foreignObject x={x + size*0.2} y={y + size*0.2} width={size*0.6} height={size*0.6}>
                        <div className="w-full h-full flex items-center justify-center" style={{ color: color }}>
                            {IconComponent && (
                                <IconComponent size={size * 0.6} strokeWidth={1.5} />
                            )}
                        </div>
                    </foreignObject>
                )}
            </g>

            <text 
                x={x + size/2} y={y + size + 16} 
                textAnchor="middle" fill="#9ca3af" fontSize="10" 
                fontFamily="monospace" fontWeight="bold" 
                className="uppercase tracking-[0.1em]"
            >
                {label}
            </text>
        </motion.g>
    );
};

type ConnectionLineProps = {
    d: string;
    color?: string;
    animated?: boolean;
};

const ConnectionLine = ({
    d,
    color = "#00ff99",
    animated = true
}: ConnectionLineProps) => (
    <motion.path 
        d={d} fill="none" stroke={color} strokeWidth="1.5" 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        strokeDasharray={animated ? "5 5" : "none"}
        transition={{ duration: 1.5, ease: "easeInOut" }}
    />
);

export const PortfolioAWS: React.FC = () => (
    <svg viewBox="0 0 800 500" className="w-full h-full bg-[#020617] rounded-3xl overflow-hidden">
        <defs>
            {/* Filter to force ANY icon to Neon Green */}
            <filter id="neon-filter-00ff99">
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 1  0 0 0 0 0.6  0 0 0 1 0" />
                <feGaussianBlur stdDeviation="1" result="glow" />
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            
            {/* Filter for white content */}
            <filter id="neon-filter-ffffff">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 1  0 0 1 0 1  0 0 0 1 0" />
            </filter>
        </defs>

        {/* BG Grid */}
        <rect width="800" height="500" fill="#020617" />
        <path d="M 0 0 L 800 500 M 0 500 L 800 0" stroke="rgba(0, 255, 153, 0.02)" strokeWidth="0.5" />

        {/* Global Traffic */}
        <NeonIcon x={40} y={200} size={50} label="Client" IconComponent={Smartphone} color="#ffffff" />
        
        {/* AWS Boundaries */}
        <rect x="120" y="40" width="640" height="420" rx="20" fill="rgba(0, 255, 153, 0.01)" stroke="#00ff99" strokeWidth="1" strokeDasharray="10 5" opacity="0.3" />
        <text x="140" y="30" fill="#00ff99" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="2">REGION: EU-WEST-2 (LONDON)</text>

        {/* Edge Services */}
        <NeonIcon x={150} y={100} size={55} label="Route 53" IconComponent={Search} />
        <NeonIcon x={240} y={100} size={55} label="ACM (SSL)" IconComponent={Lock} />
        
        {/* VPC / Security Zone */}
        <rect x="140" y="190" width="600" height="250" rx="15" fill="rgba(0,0,0,0.4)" stroke="rgba(0,255,153,0.15)" strokeWidth="1" />
        <text x="160" y="210" fill="rgba(0,255,153,0.4)" fontSize="9" fontFamily="monospace">PRIVATE VPC (10.0.0.0/16)</text>

        {/* EC2 Core */}
        <NeonIcon x={180} y={300} size={70} label="EC2: Portfolio" IconComponent={Server} />
        
        {/* Nginx Ingress */}
        <NeonIcon x={320} y={300} size={60} label="NGINX" slug="nginx" />
        <ConnectionLine d="M 250 335 H 320" />

        {/* Monitoring Stack */}
        <rect x="440" y="240" width="280" height="170" rx="12" fill="rgba(255,74,74,0.02)" stroke="rgba(255,74,74,0.2)" strokeWidth="1" />
        <NeonIcon x={460} y={260} size={50} label="Prometheus" slug="prometheus" color="#ff4a4a" />
        <NeonIcon x={550} y={260} size={50} label="Grafana" slug="grafana" color="#ff9e0b" />
        <NeonIcon x={640} y={260} size={50} label="Cadvisor" IconComponent={Activity} color="#3b82f6" />
        <text x="580" y="390" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="monospace">OBSERVABILITY ENV</text>

        {/* Connections */}
        <ConnectionLine d="M 90 225 H 180" animated={true} />
        <ConnectionLine d="M 220 155 V 300" />
        <ConnectionLine d="M 380 330 Q 420 280 460 280" color="#ff4a4a" />

        {/* IaC Tools */}
        <NeonIcon x={40} y={400} size={40} label="Terraform" slug="terraform" color="#623ce4" />
        <NeonIcon x={40} y={340} size={40} label="Ansible" slug="ansible" color="#ffffff" />
    </svg>
);

export const PortfolioCICD: React.FC = () => (
    <svg viewBox="0 0 800 500" className="w-full h-full bg-[#020617] rounded-3xl overflow-hidden">
        <rect x="40" y="40" width="720" height="420" rx="15" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.05)" />
        
        {/* Zone 1: Build (Local/Runner) */}
        <rect x="60" y="100" width="220" height="340" rx="12" fill="rgba(0,102,255,0.02)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5" />
        <text x="170" y="90" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace">GH RUNNER (UBUNTU)</text>
        
        <NeonIcon x={140} y={130} size={60} label="Actions" IconComponent={Workflow} />
        <NeonIcon x={90} y={240} size={50} label="Node 22" slug="nodedotjs" />
        <NeonIcon x={190} y={240} size={50} label="Trivy Scan" slug="trivy" />

        {/* Zone 2: Registry */}
        <NeonIcon x={370} y={200} size={70} label="DockerHub" IconComponent={Container} />
        <text x="405" y="285" textAnchor="middle" fill="#066da5" fontSize="9" fontFamily="monospace">ARTIFACT REGISTRY</text>
        
        {/* Zone 3: Target (EC2) */}
        <rect x="520" y="100" width="220" height="340" rx="12" fill="rgba(0,255,153,0.02)" stroke="#00ff99" strokeWidth="1" strokeDasharray="5" />
        <text x="630" y="90" textAnchor="middle" fill="#00ff99" fontSize="11" fontWeight="bold" fontFamily="monospace">PRODUCTION ENV</text>

        <NeonIcon x={600} y={150} size={60} label="SSH Trigger" IconComponent={Terminal} />
        <NeonIcon x={560} y={270} size={55} label="EC2 Pull" IconComponent={Cpu} />
        <NeonIcon x={660} y={270} size={55} label="Health (200)" IconComponent={ShieldCheck} />
        
        {/* Lines */}
        <ConnectionLine d="M 280 240 H 370" color="#3b82f6" />
        <ConnectionLine d="M 440 240 H 520" color="#00ff99" />

        {/* Step Numbers */}
        {[
            { n: "1", x: 170, y: 120 },
            { n: "2", x: 405, y: 190 },
            { n: "3", x: 630, y: 140 },
            { n: "4", x: 630, y: 350 }
        ].map((step) => (
            <g key={step.n} transform={`translate(${step.x}, ${step.y})`}>
                <circle r="12" fill="#00ff99" />
                <text textAnchor="middle" dy="4" fill="#000" fontSize="10" fontWeight="black" fontFamily="monospace">{step.n}</text>
            </g>
        ))}
    </svg>
);
