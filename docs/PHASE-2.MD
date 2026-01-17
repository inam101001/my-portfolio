# Phase 2: Terraform + Ansible Infrastructure Setup

**Date:** January 17, 2026  
**Duration:** ~3 hours  
**Status:** ✅ Complete

---

## What We Did

Provisioned AWS infrastructure with Terraform and configured EC2 with Ansible. Deployed the portfolio to production with full SSL and subdomain support.

---

## Tools Used

- **Terraform v1.14.3** - Infrastructure as Code
- **Ansible v2.19.5** - Configuration management
- **Let's Encrypt + Certbot** - SSL certificates

---

## Infrastructure Created

| Resource | Purpose | Cost |
|----------|---------|------|
| EC2 t2.micro | Application server | Free tier |
| Elastic IP | Static IP address | Free |
| Security Group | Firewall rules | Free |
| Route53 Hosted Zone | DNS management | $0.50/month |
| SSH Key Pair | Secure access | Free |

---

## Terraform File Structure

```
terraform/
├── provider.tf              # AWS provider config
├── variables.tf             # Input variables
├── main.tf                  # EC2 instance, key pair
├── security-groups.tf       # Firewall rules
├── route53.tf               # DNS + subdomains
├── acm.tf                   # SSL certificate
├── outputs.tf               # Important values
├── userdata.sh              # EC2 initialization
└── ansible_inventory.tpl    # Ansible inventory template
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Internet                               │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Namecheap (Domain Registrar)                   │
│              Nameservers → Route53                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              AWS Route53 (DNS Management)                   │
│                                                             │
│  A Records:                                                 │
│  • inamulhaq.dev           → 34.227.208.102                │
│  • grafana.inamulhaq.dev   → 34.227.208.102                │
│  • prometheus.inamulhaq.dev → 34.227.208.102               │
│  • www.inamulhaq.dev (CNAME)                               │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              AWS Security Group                             │
│              Ports: 22, 80, 443, 3000, 9090                │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│           AWS EC2 t2.micro (Amazon Linux 2023)             │
│           Elastic IP: 34.227.208.102                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Nginx (SSL Termination + Reverse Proxy)              │ │
│  │                                                        │ │
│  │  https://inamulhaq.dev → Portfolio                    │ │
│  │  https://grafana.inamulhaq.dev → grafana:3000         │ │
│  │  https://prometheus.inamulhaq.dev → prometheus:9090   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  SSL: /etc/letsencrypt/live/inamulhaq.dev/                │
└─────────────────────────────────────────────────────────────┘
```

---

## SSL Certificate Flow

```
Let's Encrypt → Certbot → Port 80 Challenge → Certificates Issued
                   ↓
    /etc/letsencrypt/live/inamulhaq.dev/
         ├── fullchain.pem
         └── privkey.pem
                   ↓
        Mounted to Docker Container
                   ↓
              Nginx (HTTPS)
```

---

## Key Terraform Resources

### EC2 Instance
```hcl
resource "aws_instance" "portfolio" {
  ami           = data.aws_ami.amazon_linux_2023.id
  instance_type = "t2.micro"
  key_name      = aws_key_pair.portfolio_key.key_name
  
  vpc_security_group_ids = [aws_security_group.portfolio_sg.id]
  
  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }
}
```

### Security Group
```hcl
Ingress:
  - Port 22 (SSH)
  - Port 80 (HTTP)
  - Port 443 (HTTPS)
  - Port 3000 (Grafana)
  - Port 9090 (Prometheus)
```

### DNS Records
```hcl
inamulhaq.dev → 34.227.208.102
www.inamulhaq.dev → inamulhaq.dev (CNAME)
grafana.inamulhaq.dev → 34.227.208.102
prometheus.inamulhaq.dev → 34.227.208.102
```

---

## Ansible Setup

**Playbook:** `ansible/playbooks/setup.yml`

```yaml
Tasks:
  - Updated system packages
  - Installed Docker & Docker Compose
  - Installed Certbot
  - Created app directory
  - Started Docker service
```

---

## Deployment Process

```bash
# On EC2
cd /home/ec2-user/app/my-portfolio
git pull origin main
docker-compose up -d --build
```

---

## SSL Setup

```bash
# Request certificates
sudo certbot certonly --standalone \
  -d inamulhaq.dev \
  -d www.inamulhaq.dev \
  -d grafana.inamulhaq.dev \
  -d prometheus.inamulhaq.dev
```

**Auto-renewal:** Enabled (runs twice daily)

---

## Nginx Configuration

```nginx
# Force HTTPS
server {
    listen 80;
    return 301 https://$host$request_uri;
}

# Main site
server {
    listen 443 ssl;
    http2 on;
    server_name inamulhaq.dev www.inamulhaq.dev;
    
    ssl_certificate /etc/letsencrypt/live/inamulhaq.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/inamulhaq.dev/privkey.pem;
}

# Subdomains (reverse proxy)
server {
    listen 443 ssl;
    server_name grafana.inamulhaq.dev;
    
    location / {
        proxy_pass http://grafana:3000;
    }
}
```

---

## Live URLs

| URL | Purpose |
|-----|---------|
| https://inamulhaq.dev | Portfolio |
| https://grafana.inamulhaq.dev | Monitoring |
| https://prometheus.inamulhaq.dev | Metrics |

---

## Critical Files in .gitignore

```gitignore
# Terraform
terraform/terraform.tfstate
terraform/terraform.tfstate.backup
terraform/.terraform/

# Ansible
ansible/inventory/*.pem
ansible/inventory/hosts

# Environment
.env
```

---

**Phase 2 Complete ✅**

**Next:** Phase 3 - GitHub Actions CI/CD Pipeline