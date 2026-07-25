#!/bin/bash
set -e

# Just update system and create directory
# Everything else will be done by Ansible
dnf update -y

# Create app directory
mkdir -p /home/ec2-user/app
chown -R ec2-user:ec2-user /home/ec2-user/app

echo "Userdata script completed" > /var/log/userdata-complete.log