# Inam Ul Haq — Portfolio

Portfolio for [Inam Ul Haq](https://inamulhaq.site), focused on DevOps, cloud
infrastructure, delivery automation, observability, and backend engineering.

The frontend uses a light editorial “Raster Relief” system. Its sections cover
selected work, the delivery lifecycle, professional experience, systems,
education, and contact information.

## Stack

- React 19 and TypeScript
- Vite 6
- Tailwind CSS 3 for preflight and authored CSS in `src/index.css`
- Lucide icons
- Docker and Nginx
- Terraform and Ansible
- GitHub Actions
- Prometheus and Grafana

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
npm run preview
```

## Frontend structure

```text
src/
├── components/
│   ├── ContactSection.tsx
│   ├── ExperienceSection.tsx
│   ├── HeroSection.tsx
│   ├── LifecycleSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SectionRail.tsx
│   ├── SiteNav.tsx
│   └── SystemsSection.tsx
├── data/
│   └── portfolio.ts
├── App.tsx
├── index.css
└── main.tsx
```

The approved raster compositions used by the desktop layout live in `public/`.
Mobile layouts use lightweight HTML/CSS fallbacks so the complete content
remains available at narrow viewport widths.

## Infrastructure

- `docker/` builds the frontend and serves it with Nginx.
- `docker-compose.yml` runs the site and monitoring services.
- `terraform/` defines AWS infrastructure and DNS.
- `ansible/` provisions and deploys the host.
- `monitoring/` configures Prometheus, Grafana, and blackbox monitoring.
- `.github/workflows/` contains deployment and certificate-renewal workflows.
- `docs/` retains the original infrastructure implementation notes.

Local credentials, Terraform state, Ansible inventory, generated builds, and
design-review output are excluded through `.gitignore`.

## Content

Professional claims and contact details should remain consistent with
`PRODUCT.md`, repository evidence, and `public/InamUlHaq_CV.pdf`.

© Inam Ul Haq
