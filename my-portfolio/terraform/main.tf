# Get latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Create SSH Key Pair
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "portfolio_key" {
  key_name   = var.ssh_key_name
  public_key = tls_private_key.ssh_key.public_key_openssh

  tags = {
    Name = "${var.project_name}-key"
  }
}

# Save private key locally for Ansible
resource "local_file" "private_key" {
  content         = tls_private_key.ssh_key.private_key_pem
  filename        = "${path.module}/../ansible/inventory/portfolio-key.pem"
  file_permission = "0600"
}

# EC2 Instance
resource "aws_instance" "portfolio" {
  ami           = data.aws_ami.amazon_linux_2023.id
  instance_type = var.instance_type
  key_name      = aws_key_pair.portfolio_key.key_name

  vpc_security_group_ids = [aws_security_group.portfolio_sg.id]

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  user_data = file("${path.module}/userdata.sh")

  tags = {
    Name = "${var.project_name}-server"
  }

  depends_on = [aws_security_group.portfolio_sg]
}

# Elastic IP
resource "aws_eip" "portfolio_eip" {
  domain   = "vpc"
  instance = aws_instance.portfolio.id

  tags = {
    Name = "${var.project_name}-eip"
  }
}