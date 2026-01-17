# Phase 1: Local Docker Setup & Testing

**Date:** January 16, 2026  
**Duration:** ~2 hours  
**Status:** ✅ Complete

---

## What We Did

Built and tested a Dockerized portfolio website with full monitoring stack locally before AWS deployment.

---

## Tools Installed

```bash
# Node.js 24.13.0 & npm 11.6.2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Docker 29.1.4 & Docker Compose 5.0.1
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker

# Terraform 1.14.3
sudo apt install -y terraform

# AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
```

**Accounts Configured:**
- AWS IAM user: `aws-admin` (EC2, Route53, ACM, VPC access)
- DockerHub: `inam101001/my-portfolio` (public repo)
- GitHub: `inam101001/my-portfolio`

---

## Project Structure Created

```
my-portfolio/
├── docker/
│   ├── Dockerfile              # Multi-stage build (26MB final image)
│   └── nginx.conf              # Web server config (SPA routing, metrics)
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml      # Metrics scraping config
│   ├── grafana/
│   │   └── provisioning/       # Auto-configure datasources & dashboards
│   └── blackbox/
│       └── blackbox.yml        # External monitoring probes
├── docker-compose.yml          # 7-container orchestration
└── src/                        # React application code
```

---

## Files Created

### 1. Dockerfile (Multi-Stage Build)

```dockerfile
# Stage 1: Build with Node.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx (final image: 26MB)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

### 2. nginx.conf

Key features configured:
- SPA routing: `try_files $uri $uri/ /index.html;`
- Gzip compression for performance
- `/nginx_status` endpoint for metrics
- Static asset caching (1 year)

### 3. docker-compose.yml

7 services defined:
- `nginx-app`: Portfolio website (8.3 MB)
- `prometheus`: Metrics storage (93.2 MB)
- `grafana`: Dashboards (112.4 MB)
- `node-exporter`: System metrics (8.9 MB)
- `cadvisor`: Container metrics (70.4 MB)
- `nginx-exporter`: Web server metrics (9.1 MB)
- `blackbox-exporter`: External probes (14.8 MB)

**Total: 317 MB** (fits comfortably in t2.micro's 1GB RAM)

### 4. prometheus.yml

Configured scraping for all exporters (15s interval).

### 5. blackbox.yml

HTTP and HTTPS probes for uptime monitoring.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│              Docker Network: monitoring             │
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │ nginx-   │    │prometheus│    │ grafana  │     │
│  │ app      │◄───┤          │◄───┤          │     │
│  └──────────┘    └──────────┘    └──────────┘     │
│       ▲               ▲                             │
│       │               │                             │
│  ┌────┴───────────────┴──────┐                     │
│  │    All Exporters:         │                     │
│  │ • node-exporter (system)  │                     │
│  │ • cadvisor (containers)   │                     │
│  │ • nginx-exporter (web)    │                     │
│  │ • blackbox (external)     │                     │
│  └───────────────────────────┘                     │
└─────────────────────────────────────────────────────┘
         │
         │ Port Mappings
         ▼
    localhost:80 → Portfolio
    localhost:3000 → Grafana
    localhost:9090 → Prometheus
```

### Data Flow

```
System/Containers → Exporters → Prometheus → Grafana → You
                       ▲                        │
                       │                        │
                       └─── Scrape every 15s ───┘
```

---

## Build & Test Commands

```bash
# Build Docker image
docker build -f docker/Dockerfile -t my-portfolio:local .

# Start all containers
docker compose up -d

# Check status
docker compose ps

# View resource usage
docker stats --no-stream

# Stop everything
docker compose down
```

---

## Verification

**✅ All services accessible:**
- Portfolio: http://localhost
- Grafana: http://localhost:3000 (admin/admin123)
- Prometheus: http://localhost:9090

**✅ Prometheus targets:** All 6 targets UP

**✅ Grafana dashboards imported:**
- Node Exporter Full (ID: 1860) - System metrics
- Docker Monitoring (ID: 193) - Container metrics  
- Nginx Monitoring (ID: 12708) - Web server metrics

**✅ Resource usage:** 317 MB total (31% of t2.micro's 1GB)

---

## Issues Fixed

1. **nginx.conf not found:** Changed `COPY nginx.conf` to `COPY docker/nginx.conf`
2. **TypeScript missing:** Changed `npm ci --only=production` to `npm ci`
3. **SSL cert error:** Created HTTP-only nginx.conf for local testing (will add HTTPS in production)

---

## Key Learnings

- Multi-stage Docker builds reduce image size dramatically (500MB → 26MB)
- Docker Compose simplifies multi-container management
- Monitoring requires: Exporters → Prometheus → Grafana
- t2.micro (1GB RAM) can handle our entire stack comfortably

---

## Next: Phase 2

**Terraform + Ansible**
- Terraform: Provision AWS infrastructure (EC2, Route53, Security Groups, SSL cert)
- Ansible: Configure EC2 (install Docker, deploy containers, setup SSL)
- Goal: Automate entire infrastructure and deployment

---

**Phase 1 Complete ✅**