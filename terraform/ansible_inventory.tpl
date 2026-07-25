[webservers]
portfolio-server ansible_host=${ec2_ip} ansible_user=ec2-user ansible_ssh_private_key_file=${ssh_key_path} ansible_python_interpreter=/usr/bin/python3

[webservers:vars]
ansible_ssh_common_args='-o StrictHostKeyChecking=no'