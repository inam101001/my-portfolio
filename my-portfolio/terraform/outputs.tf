output "ec2_public_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_eip.portfolio_eip.public_ip
}

output "ec2_instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.portfolio.id
}

output "route53_nameservers" {
  description = "Route53 nameservers (update these in Namecheap)"
  value       = aws_route53_zone.main.name_servers
}

output "domain_name" {
  description = "Domain name"
  value       = var.domain_name
}

output "acm_certificate_arn" {
  description = "ACM Certificate ARN"
  value       = aws_acm_certificate.portfolio_cert.arn
}

output "security_group_id" {
  description = "Security Group ID"
  value       = aws_security_group.portfolio_sg.id
}

output "ssh_private_key_path" {
  description = "Path to SSH private key for Ansible"
  value       = local_file.private_key.filename
}

output "ansible_inventory" {
  description = "Ansible inventory content"
  value = templatefile("${path.module}/ansible_inventory.tpl", {
    ec2_ip       = aws_eip.portfolio_eip.public_ip
    ssh_key_path = local_file.private_key.filename
  })
}