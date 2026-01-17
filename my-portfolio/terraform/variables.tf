variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the portfolio"
  type        = string
  default     = "inamulhaq.dev"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ssh_key_name" {
  description = "Name for the SSH key pair"
  type        = string
  default     = "portfolio-key"
}

variable "my_ip" {
  description = "Your IP address for SSH access (set to 0.0.0.0/0 to allow from anywhere)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "portfolio"
}