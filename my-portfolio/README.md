# Inam Ul Haq — Portfolio

Personal portfolio site for **Inam Ul Haq**, a DevOps engineer, built to double as a working demo of a full cloud deployment pipeline — not just a static page. The React/TypeScript frontend is fronted by a self-managed CI/CD → Docker → AWS pipeline with its own observability stack.

**Live:** [inamulhaq.dev](https://inamulhaq.dev)

> This directory (`my-portfolio/`) is the application root. It sits inside a parent repository that also holds the GitHub Actions workflows (`.github/workflows/`) and phase notes (`docs/`) for the wider deployment project.

## Contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Infrastructure & deployment](#infrastructure--deployment)
- [CI/CD pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [License](#license)

## Overview

The site is a single-page, section-based portfolio (Hero, About, Projects, Contact) with a terminal-styled, matrix/dark aesthetic — animated binary rain background, an interactive 3D orb (Three.js), a mock terminal readout of the author's skill set, and scroll-triggered reveals throughout (Framer Motion).

Beyond the frontend, the repo captures the entire path from `git push` to a live, monitored production server:

- **Terraform** provisions the AWS infrastructure (EC2, Route 53, ACM, CloudFront, security groups).
- **Ansible** bootstraps the EC2 host (Docker, Docker Compose, directory layout).
- **GitHub Actions** builds the app, scans the image with Trivy, pushes to Docker Hub, and deploys over SSH — plus a scheduled job to renew Let's Encrypt certificates.
- **Docker Compose** runs the site behind Nginx alongside a Prometheus/Grafana/cAdvisor/node-exporter/blackbox-exporter observability stack on the same host.

## Tech stack

**Frontend**
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 3
- Framer Motion (scroll reveals, transitions)
- Three.js (`@types/three`) for the hero orb
- `@emailjs/browser` for the contact form
- `lucide-react` / `react-icons` for iconography

**Infrastructure & delivery**
- Docker (multi-stage build, served via Nginx) + Docker Compose
- Terraform (AWS: EC2, Route 53, ACM, CloudFront, security groups)
- Ansible (EC2 provisioning/setup and app deploy playbooks)
- GitHub Actions (build/scan/push/deploy, weekly SSL renewal)
- Trivy (container vulnerability scanning)
- Prometheus, Grafana, cAdvisor, node-exporter, nginx-exporter, blackbox-exporter (monitoring stack)

## Project structure

```
my-portfolio/
├── src/
│   ├── components/          # Hero, About, Projects, Contact, Navbar, Terminal, ThreeOrb, diagrams, ...
│   ├── types/                # Shared TS types (e.g. ProjectData)
│   ├── App.tsx                # Page composition (sections + footer + nav)
│   └── main.tsx
├── public/                    # Static assets (CV, images, favicon-adjacent files)
├── docker/
│   ├── Dockerfile             # Multi-stage: node build → nginx serve
│   └── nginx.conf
├── docker-compose.yml         # App + Prometheus/Grafana/cAdvisor/exporters stack
├── monitoring/
│   ├── prometheus/prometheus.yml
│   ├── grafana/provisioning/  # Datasources + dashboards
│   └── blackbox/blackbox.yml
├── terraform/                  # AWS infra: EC2, Route 53, ACM, CloudFront, security groups
├── ansible/playbooks/
│   ├── setup.yml               # One-time EC2 bootstrap (Docker, Compose, app dir)
│   └── deploy.yml              # App deployment playbook
└── vite.config.ts / tailwind.config.js / tsconfig*.json
```

The parent repository additionally contains:

```
../.github/workflows/
├── deploy.yml       # Build → Trivy scan → push to Docker Hub → SSH deploy to EC2
└── ssl-renew.yml     # Weekly certbot renewal + nginx reload
../docs/               # PHASE-1/2/3 notes documenting how the project evolved
```

## Getting started

**Requirements:** Node.js 22+, npm

```bash
# Install dependencies
npm install

# Start the dev server (Vite, with HMR)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | `tsc -b` then `vite build` → outputs to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | Run ESLint over the project |

## Infrastructure & deployment

**Provisioning (Terraform, `terraform/`)**
- Pins an Amazon Linux 2023 AMI and provisions a single EC2 instance with an attached Elastic IP.
- Sets up Route 53 DNS, an ACM certificate, and a CloudFront distribution in front of the EC2 origin for HTTPS, static caching, and SPA routing.
- Generates an SSH key pair and writes the private key into `ansible/inventory/` for Ansible to consume.
- Outputs the EC2 IP, CloudFront domain/ID, and a ready-to-use Ansible inventory.

**Host bootstrap (Ansible, `ansible/playbooks/`)**
- `setup.yml` — one-time provisioning: installs Docker + Docker Compose, adds `ec2-user` to the `docker` group, and creates the app directory.
- `deploy.yml` — pulls the latest app code/images and (re)starts the stack.

**Containerization**
- `docker/Dockerfile` builds the app in a `node:22-alpine` stage and serves the static output from `dist/` via `nginx:alpine`, using the custom config in `docker/nginx.conf`. Includes a container `HEALTHCHECK`.
- `docker-compose.yml` runs the Nginx app container (ports 80/443, mounting the Let's Encrypt certs) alongside the full monitoring stack on a shared `monitoring` network.

## CI/CD pipeline

Defined in the parent repo's `.github/workflows/deploy.yml`, triggered on every push to `main`:

1. **Build & scan** — checks out the code, builds the Docker image from `my-portfolio/docker/Dockerfile`, and scans it with **Trivy** (reports CRITICAL/HIGH CVEs without blocking the build).
2. **Push** — pushes the image to Docker Hub tagged `latest` and with the commit SHA.
3. **Deploy** — SSHes into the EC2 host, pulls the new image, runs `docker-compose up -d`, and prunes old images.
4. **Verify** — curls the site over HTTPS post-deploy and fails the workflow (surfacing container logs) if the health check doesn't pass.

`.github/workflows/ssl-renew.yml` runs weekly (and on manual dispatch) to renew the Let's Encrypt certificate via `certbot` and hot-reload Nginx inside the running container — no downtime.

## Monitoring

The Compose stack ships a full observability setup alongside the app:

- **Prometheus** — scrapes metrics from node-exporter, cAdvisor, and the Nginx exporter (15-day retention).
- **Grafana** — pre-provisioned datasource and dashboard (`monitoring/grafana/provisioning/`) for visualizing site and host health.
- **node-exporter** / **cAdvisor** — EC2 system and container-level metrics.
- **nginx-exporter** — Nginx request/connection metrics.
- **blackbox-exporter** — external HTTP probing/uptime checks.

## License

Personal portfolio — content and code are © Inam Ul Haq. Feel free to reference the infrastructure/CI-CD setup for learning purposes.
