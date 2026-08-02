# ─────────────────────────────────────────────────────────────────────────────
# Enable required GCP APIs
# ─────────────────────────────────────────────────────────────────────────────

resource "google_project_service" "run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifactregistry" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "dns" {
  service            = "dns.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "iam" {
  service            = "iam.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "iamcredentials" {
  service            = "iamcredentials.googleapis.com"
  disable_on_destroy = false
}

# ─────────────────────────────────────────────────────────────────────────────
# Artifact Registry — Docker repository for container images
# ─────────────────────────────────────────────────────────────────────────────

resource "google_artifact_registry_repository" "portfolio" {
  location      = var.gcp_region
  repository_id = var.project_name
  description   = "Docker images for the portfolio website"
  format        = "DOCKER"

  depends_on = [google_project_service.artifactregistry]
}

# ─────────────────────────────────────────────────────────────────────────────
# Cloud Run service
# ─────────────────────────────────────────────────────────────────────────────

resource "google_cloud_run_v2_service" "portfolio" {
  name     = var.cloud_run_service_name
  location = var.gcp_region

  template {
    containers {
      # Image is updated on every CI/CD deploy — Terraform manages the service config,
      # GitHub Actions updates the image. Use a placeholder on first apply.
      image = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${var.project_name}/${var.cloud_run_service_name}:latest"

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }

    scaling {
      min_instance_count = 0  # Scale to zero when idle (free tier friendly)
      max_instance_count = 3
    }
  }

  lifecycle {
    # Prevent Terraform from overriding the image that CI/CD deploys on each push
    ignore_changes = [template[0].containers[0].image]
  }

  depends_on = [
    google_project_service.run,
    google_artifact_registry_repository.portfolio,
  ]
}

# Allow unauthenticated (public) access to the Cloud Run service
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.portfolio.name
  location = google_cloud_run_v2_service.portfolio.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ─────────────────────────────────────────────────────────────────────────────
# Cloud Run Custom Domain Mapping (No Load Balancer, Completely Free)
# ─────────────────────────────────────────────────────────────────────────────

resource "google_cloud_run_domain_mapping" "root" {
  name     = var.domain_name
  location = var.gcp_region

  metadata {
    namespace = var.gcp_project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.portfolio.name
  }
}

resource "google_cloud_run_domain_mapping" "www" {
  name     = "www.${var.domain_name}"
  location = var.gcp_region

  metadata {
    namespace = var.gcp_project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.portfolio.name
  }
}

# ─────────────────────────────────────────────────────────────────────────────
# Workload Identity Federation — keyless GitHub Actions authentication
# ─────────────────────────────────────────────────────────────────────────────

resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github-pool"
  display_name              = "GitHub Actions Pool"
  description               = "Identity pool for GitHub Actions CI/CD"

  depends_on = [google_project_service.iam]
}

resource "google_iam_workload_identity_pool_provider" "github" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub Actions Provider"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
  }

  # Only allow tokens from your specific GitHub repository
  attribute_condition = "attribute.repository == '${var.github_repo}'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

# Service account that GitHub Actions will impersonate
resource "google_service_account" "github_actions" {
  account_id   = "github-actions-deploy"
  display_name = "GitHub Actions Deployer"
  description  = "Used by GitHub Actions via Workload Identity Federation to deploy to Cloud Run"
}

# Allow GitHub Actions tokens from this repo to impersonate the service account
resource "google_service_account_iam_binding" "github_wif" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"

  members = [
    "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${var.github_repo}"
  ]
}

# Grant the service account the roles it needs
resource "google_project_iam_member" "github_actions_run_admin" {
  project = var.gcp_project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_project_iam_member" "github_actions_ar_writer" {
  project = var.gcp_project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_project_iam_member" "github_actions_sa_user" {
  project = var.gcp_project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}