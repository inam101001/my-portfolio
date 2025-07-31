# Route 53 Hosted Zone for the domain
resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = merge(var.common_tags, {
    Name = "${var.domain_name}-hosted-zone"
  })
}

# SSL Certificate for the domain (must be in us-east-1 for CloudFront)
resource "aws_acm_certificate" "ssl_cert" {
  domain_name               = var.domain_name
  subject_alternative_names = var.create_www_subdomain ? ["www.${var.domain_name}"] : []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = merge(var.common_tags, {
    Name = "${var.domain_name}-ssl-cert"
  })
}

# DNS records for SSL certificate validation
resource "aws_route53_record" "ssl_validation" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

# SSL Certificate validation
resource "aws_acm_certificate_validation" "ssl_validation" {
  certificate_arn         = aws_acm_certificate.ssl_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.ssl_validation : record.fqdn]

  timeouts {
    create = "5m"
  }
}

# Main A record pointing to CloudFront
resource "aws_route53_record" "main" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront hosted zone ID (global)
    evaluate_target_health = false
  }
}

# WWW subdomain redirect (optional)
resource "aws_route53_record" "www" {
  count   = var.create_www_subdomain ? 1 : 0
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront hosted zone ID
    evaluate_target_health = false
  }
}