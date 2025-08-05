output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website_bucket.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.website_bucket.arn
}

output "website_endpoint" {
  description = "S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.website_config.website_endpoint
}

output "bucket_domain_name" {
  description = "S3 bucket domain name"
  value       = aws_s3_bucket.website_bucket.bucket_domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website_distribution.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website_distribution.domain_name
}

# Monitoring Module Outputs
output "monitoring_dashboard_url" {
  description = "CloudWatch monitoring dashboard URL"
  value       = module.monitoring.dashboard_url
}

output "monitoring_sns_topic" {
  description = "SNS topic ARN for monitoring alerts"
  value       = module.monitoring.sns_topic_arn
}

output "monitoring_log_group" {
  description = "CloudWatch log group for application logs" 
  value       = module.monitoring.log_group_name
}

output "monitoring_dashboard_name" {
  description = "CloudWatch dashboard name"
  value       = module.monitoring.dashboard_name
}

# Domain Module Outputs
output "domain_name" {
  description = "Custom domain name"
  value       = module.domain.domain_name
}

output "route53_zone_id" {
  description = "Route 53 hosted zone ID"
  value       = module.domain.route53_zone_id
}

output "ssl_certificate_arn" {
  description = "SSL certificate ARN"
  value       = module.domain.ssl_certificate_arn
}

output "nameservers_for_namecheap" {
  description = "Name servers to configure in Namecheap DNS"
  value       = module.domain.nameservers_for_namecheap
}

output "custom_domain_url" {
  description = "Your custom domain URL"
  value       = "https://${module.domain.domain_name}"
}

output "www_domain_url" {
  description = "WWW subdomain URL"
  value       = "https://www.${module.domain.domain_name}"
}