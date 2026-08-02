terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }

  # Remote state stored in GCS — run bootstrap/init_backend.sh once before terraform init
  backend "gcs" {
    bucket = "inam-portfolio-terraform-state"  # Created manually before first terraform init (see docs/gcp-setup-guide.md)
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region

  default_labels = {
    project     = "portfolio"
    environment = "production"
    managed-by  = "terraform"
  }
}

provider "google-beta" {
  project = var.gcp_project_id
  region  = var.gcp_region
}