output "cloud_run_url" {
  description = "Direct Cloud Run service URL (*.run.app)"
  value       = google_cloud_run_v2_service.portfolio.uri
}

output "cloud_dns_nameservers" {
  description = <<-EOT
    Google Cloud DNS nameservers for inamulhaq.site.
    Update your domain registrar (Namecheap) to use these 4 nameservers.
    This is the ONLY manual step after terraform apply.
  EOT
  value       = google_dns_managed_zone.portfolio.name_servers
}

output "artifact_registry_repo" {
  description = "Full Artifact Registry repository path (use this in CI/CD image tags)"
  value       = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.portfolio.repository_id}"
}

output "wif_provider" {
  description = "Workload Identity Federation provider resource name — set as GCP_WIF_PROVIDER GitHub secret"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "github_actions_service_account" {
  description = "Service account email for GitHub Actions — set as GCP_SERVICE_ACCOUNT GitHub secret"
  value       = google_service_account.github_actions.email
}

output "root_domain_mapping_status" {
  description = "Status of the custom domain mapping for the root domain"
  value       = google_cloud_run_domain_mapping.root.status[0].conditions[0].message
}

output "www_domain_mapping_status" {
  description = "Status of the custom domain mapping for the www subdomain"
  value       = google_cloud_run_domain_mapping.www.status[0].conditions[0].message
}