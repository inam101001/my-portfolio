variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Your custom domain name"
  type        = string
  default     = "example.com"  # We'll update this with your actual domain
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "portfolio"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

# Local values for resource naming
locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    Owner       = "devops-portfolio"
  }
}
