# Configure AWS Provider
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure AWS Provider
provider "aws" {
  region = var.aws_region
}

# S3 Bucket for static website hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = "${var.domain_name}-portfolio-${random_string.bucket_suffix.result}"
}

# Random string for unique bucket naming
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# S3 Bucket public access block
resource "aws_s3_bucket_public_access_block" "website_bucket_pab" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket website configuration
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"  # For SPA routing
  }
}


# S3 Bucket policy for CloudFront access
resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.website_bucket_pab]
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "website_oac" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.website_bucket.bucket}"
    origin_access_control_id = aws_cloudfront_origin_access_control.website_oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.website_bucket.bucket}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  # Custom error pages for SPA
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
   acm_certificate_arn      = module.domain.ssl_certificate_arn
   ssl_support_method       = "sni-only"
   minimum_protocol_version = "TLSv1.2_2021"
  }

  # Add custom domain aliases
  aliases = [module.domain.domain_name, "www.${module.domain.domain_name}"]

  tags = local.common_tags
}


# Monitoring Module
module "monitoring" {
  source = "./modules/monitoring"
  
  project_name               = var.project_name
  environment               = var.environment
  cloudfront_distribution_id = aws_cloudfront_distribution.website_distribution.id
  s3_bucket_name            = aws_s3_bucket.website_bucket.bucket
  alert_email               = "inam101001@gmail.com"  
  aws_region                = var.aws_region
  common_tags               = local.common_tags
}

# Domain Module
module "domain" {
  source = "./modules/domain"
  
  domain_name                = "inamulhaq.dev"
  cloudfront_distribution_id = aws_cloudfront_distribution.website_distribution.id
  cloudfront_domain_name     = aws_cloudfront_distribution.website_distribution.domain_name
  aws_region                 = var.aws_region
  environment               = var.environment
  common_tags               = local.common_tags
  create_www_subdomain      = true
}