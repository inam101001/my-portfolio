variable "gcp_project_id" {
  description = "inamulhaq-portfolio"
  type        = string
}

variable "gcp_region" {
  description = "GCP region for Cloud Run and Artifact Registry"
  type        = string
  default     = "europe-west3"  # Frankfurt, Germany — Cloud Run free tier applies here
}

variable "domain_name" {
  description = "Root domain name for the portfolio"
  type        = string
  default     = "inamulhaq.site"
}

variable "project_name" {
  description = "Project name used for resource naming and labels"
  type        = string
  default     = "portfolio"
}

variable "cloud_run_service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  default     = "my-portfolio"
}

variable "github_repo" {
  description = "GitHub repository in 'owner/repo' format, used for Workload Identity Federation"
  type        = string
  default     = "inam101001/my-portfolio"
}

variable "terraform_state_bucket" {
  description = "GCS bucket name for Terraform remote state (must be globally unique)"
  type        = string
  default     = "portfolio-terraform-state"
}