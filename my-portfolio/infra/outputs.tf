output "kubeconfig_command" {
  value = "aws eks update-kubeconfig --region=${var.aws_region} --name=${var.cluster_name}"
}

output "node_group_role_arn" {
  value = module.eks.eks_managed_node_groups["default"].iam_role_arn
}

output "vpc_id" {
  value = module.vpc.vpc_id
}