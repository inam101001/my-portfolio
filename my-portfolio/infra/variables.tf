variable "aws_region" {
  description = "The AWS region to deploy to"
  type        = string
  default     = "eu-central-1"
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
  default     = "portfolio-cluster"
}