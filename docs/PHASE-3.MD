# Phase 3: GitHub Actions CI/CD Pipeline

**Date:** January 18, 2026  
**Duration:** ~1 hour  
**Status:** ✅ Complete

---

## What I Did

Automated the entire deployment process using GitHub Actions. Every push to `main` branch now automatically builds, tests, and deploys to production.

---

## CI/CD Flow

```
Developer                GitHub Actions              DockerHub              EC2
    │                           │                        │                  │
    │ 1. git push main          │                        │                  │
    ├──────────────────────────►│                        │                  │
    │                           │                        │                  │
    │                           │ 2. Build Docker image  │                  │
    │                           │                        │                  │
    │                           │ 3. Push image          │                  │
    │                           ├───────────────────────►│                  │
    │                           │                        │                  │
    │                           │ 4. SSH to EC2          │                  │
    │                           │ 5. Pull & Deploy       │                  │
    │                           ├────────────────────────┼─────────────────►│
    │                           │                        │                  │
    │                           │                        │  6. Restart      │
    │                           │                        │     containers   │
    │                           │                        │                  │
    │                           │ 7. Health check        │                  │
    │                           │◄──────────────────────────────────────────┤
    │                           │                        │                  │
    │ 8. Deployment complete    │                        │                  │
    │◄──────────────────────────┤                        │                  │
```

---

## Workflow File Structure

**Location:** `.github/workflows/deploy.yml` (repository root)

```yaml
name: Deploy to EC2

on:
  push:
    branches: [ main ]
  workflow_dispatch:    # Manual trigger option

jobs:
  build-and-push:      # Job 1: Build Docker image
  deploy:              # Job 2: Deploy to EC2
```

---

## GitHub Secrets Configuration

**Repository Settings → Secrets and variables → Actions**

| Secret Name | Purpose | Value |
|------------|---------|-------|
| `DOCKERHUB_USERNAME` | DockerHub login | `inam101001` |
| `DOCKERHUB_TOKEN` | DockerHub auth | Access token |
| `EC2_HOST` | Server IP | `34.227.208.102` |
| `EC2_USERNAME` | SSH user | `ec2-user` |
| `EC2_SSH_PRIVATE_KEY` | SSH access | Contents of `.pem` file |

---

## Job 1: Build and Push

```yaml
build-and-push:
  runs-on: ubuntu-latest
  
  steps:
    - Checkout code
    - Setup Docker Buildx
    - Login to DockerHub
    - Build Docker image
    - Push to DockerHub with tags:
        • latest
        • commit SHA
```

**Docker Image Tags:**
- `inam101001/my-portfolio:latest` - Always newest
- `inam101001/my-portfolio:e85e319` - Specific commit

---

## Job 2: Deploy to EC2

```yaml
deploy:
  runs-on: ubuntu-latest
  needs: build-and-push
  
  steps:
    - SSH to EC2
    - Pull latest code (git pull)
    - Rebuild containers (docker-compose up -d --build)
    - Clean old images (docker image prune -f)
    - Health check (curl https://inamulhaq.dev)
```

---

## Deployment Commands on EC2

```bash
cd /home/ec2-user/app/my-portfolio
git pull origin main
docker-compose down
docker-compose up -d --build
docker image prune -f
```

**Key:** `--build` flag ensures code changes are included.

---

## Timeline

**Total Deployment Time:** ~3-5 minutes

```
0:00 - Trigger: git push main
0:30 - Build job starts
2:30 - Build complete, push to DockerHub
2:40 - Deploy job starts (SSH to EC2)
3:00 - Docker containers rebuilding
4:30 - Containers restarted
4:45 - Health check passed
5:00 - Deployment complete ✅
```

---

## Testing the Pipeline

```bash
# Make a change
nano src/components/Hero.tsx

# Commit and push
git add src/components/Hero.tsx
git commit -m "test: verify CI/CD pipeline"
git push origin main

# Watch: GitHub → Actions tab
# Verify: https://inamulhaq.dev
```

---

**Phase 3 Complete ✅**

**Result:** Fully automated deployment pipeline from code push to production.