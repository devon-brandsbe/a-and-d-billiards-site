#!/usr/bin/env bash
# One-time setup on the EC2 box (Ubuntu/Debian with nginx already installed).
# Usage: APP_DIR=/var/www/adbilliards DEPLOY_USER=ubuntu bash deploy/ec2-setup.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/adbilliards}"
DEPLOY_USER="${DEPLOY_USER:-ubuntu}"

sudo mkdir -p "$APP_DIR/releases"
sudo chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$APP_DIR"

if ! command -v rsync >/dev/null; then
  sudo apt-get update && sudo apt-get install -y rsync
fi

cat <<MSG
Done. Next:
  1. sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/adbilliards  (edit server_name)
  2. sudo ln -s /etc/nginx/sites-available/adbilliards /etc/nginx/sites-enabled/
  3. sudo nginx -t && sudo systemctl reload nginx
  4. Append the deploy key's PUBLIC half to /home/$DEPLOY_USER/.ssh/authorized_keys
MSG
