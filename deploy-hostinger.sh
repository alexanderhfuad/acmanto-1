#!/bin/bash
# Deployment script for Hostinger Shared Hosting

echo "Starting deployment for Hostinger Shared Hosting..."

# Set Node.js version (Hostinger supports specific versions)
# Check Hostinger hPanel for available Node.js versions
export NODE_VERSION=22

# Clean previous build
echo "Cleaning previous build..."
rm -rf artifacts/ac-booking/dist/public
rm -rf artifacts/mockup-sandbox/dist
rm -rf node_modules/.cache

# Install dependencies
echo "Installing dependencies..."
npm ci --production=false

# Build the application
echo "Building application..."
npm run build

# For production deployment, install only production dependencies
echo "Installing production dependencies..."
npm ci --production

# Create public directory for static files
echo "Preparing public directory..."
mkdir -p public
cp -r artifacts/ac-booking/dist/public/* public/

# Create index.html if it doesn't exist
if [ ! -f public/index.html ]; then
  echo "Warning: index.html not found in build output"
fi

echo "Deployment build complete!"
echo "Upload the following to Hostinger public_html:"
echo "1. public/* (all files from public directory)"
echo "2. .htaccess file"
echo ""
echo "Or use Hostinger's Git deployment with these files in root."
