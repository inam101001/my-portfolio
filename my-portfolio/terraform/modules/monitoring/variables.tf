variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "cloudfront_distribution_id" {
  description = "CloudFront distribution ID to monitor"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 bucket name to monitor"
  type        = string
}

variable "alert_email" {
  description = "Email address for alerts"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default     = {}
}