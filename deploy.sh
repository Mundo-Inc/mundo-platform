#!/bin/bash

# Exit script on error
set -e

# Pull latest changes from Git
echo "Pulling latest changes..."
git pull

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build the project
echo "Building the project..."
pnpm run build

# Restart the PM2 process
echo "Restarting the process..."
pm2 restart mundo-platform

echo "Deployment successful!"