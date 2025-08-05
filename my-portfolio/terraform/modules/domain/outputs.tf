output "route53_zone_id" {
  description = "Route 53 hosted zone ID"
  value       = aws_route53_zone.main.zone_id
}

output "route53_name_servers" {
  description = "Route 53 name servers for domain delegation"
  value       = aws_route53_zone.main.name_servers
}

output "ssl_certificate_arn" {
  description = "SSL certificate ARN"
  value       = aws_acm_certificate.ssl_cert.arn
}

output "domain_name" {
  description = "Primary domain name"
  value       = var.domain_name
}

output "www_domain_name" {
  description = "WWW subdomain name"
  value       = var.create_www_subdomain ? "www.${var.domain_name}" : null
}

output "nameservers_for_namecheap" {
  description = "Name servers to configure in Namecheap"
  value = {
    ns1 = aws_route53_zone.main.name_servers[0]
    ns2 = aws_route53_zone.main.name_servers[1] 
    ns3 = aws_route53_zone.main.name_servers[2]
    ns4 = aws_route53_zone.main.name_servers[3]
  }
}