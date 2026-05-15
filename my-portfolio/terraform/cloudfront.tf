# CloudFront Distribution for Portfolio Website
resource "aws_cloudfront_distribution" "portfolio" {
  # Origin: EC2 instance via Route53 DNS hostname (CloudFront rejects raw IPs)
  origin {
    domain_name = "origin.${var.domain_name}"
    origin_id   = "portfolio-ec2"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Portfolio CloudFront Distribution"
  default_root_object = "index.html"

  # Serve on both root domain and www
  aliases = [var.domain_name, "www.${var.domain_name}"]

  # Default cache behavior for HTML/dynamic content
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portfolio-ec2"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # Aggressive caching for static assets
  ordered_cache_behavior {
    path_pattern     = "/assets/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portfolio-ec2"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  # Use only US/Europe edge locations to stay on free tier where possible
  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Use ACM certificate for HTTPS
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.portfolio_cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # SPA fallback: serve index.html for any 404 (React Router support)
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  tags = {
    Name = "${var.project_name}-cloudfront"
  }

  depends_on = [aws_acm_certificate_validation.portfolio_cert]
}
