# ─────────────────────────────────────────────────────────────────────────────
# Google Cloud DNS — Managed Zone for inamulhaq.site
# ─────────────────────────────────────────────────────────────────────────────

resource "google_dns_managed_zone" "portfolio" {
  name        = "${var.project_name}-zone"
  dns_name    = "${var.domain_name}."
  description = "Managed DNS zone for ${var.domain_name}"

  depends_on = [google_project_service.dns]
}

# ─────────────────────────────────────────────────────────────────────────────
# DNS Records mapped directly to Cloud Run Domain Mappings
# ─────────────────────────────────────────────────────────────────────────────

# Local helper to filter resource records by type from the domain mapping status
locals {
  root_records = google_cloud_run_domain_mapping.root.status[0].resource_records
  www_records  = google_cloud_run_domain_mapping.www.status[0].resource_records
}

# Root Domain A Records
resource "google_dns_record_set" "root_a" {
  name         = "${var.domain_name}."
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.portfolio.name
  rrdatas      = [for r in local.root_records : r.rrdata if r.type == "A"]
}

# Root Domain AAAA Records
resource "google_dns_record_set" "root_aaaa" {
  name         = "${var.domain_name}."
  type         = "AAAA"
  ttl          = 300
  managed_zone = google_dns_managed_zone.portfolio.name
  rrdatas      = [for r in local.root_records : r.rrdata if r.type == "AAAA"]
}

# WWW Domain A Records
resource "google_dns_record_set" "www_a" {
  name         = "www.${var.domain_name}."
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.portfolio.name
  rrdatas      = [for r in local.www_records : r.rrdata if r.type == "A"]
}

# WWW Domain AAAA Records
resource "google_dns_record_set" "www_aaaa" {
  name         = "www.${var.domain_name}."
  type         = "AAAA"
  ttl          = 300
  managed_zone = google_dns_managed_zone.portfolio.name
  rrdatas      = [for r in local.www_records : r.rrdata if r.type == "AAAA"]
}
