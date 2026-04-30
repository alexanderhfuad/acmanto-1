#!/bin/bash
# Deployment script for Hostinger Shared Hosting

echo "Starting deployment for Hostinger Shared Hosting..."

# Set Node.js version (Hostinger supports specific versions)
# Check Hostinger hPanel for available Node.js versions
export NODE_VERSION=22

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist
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

# Create public directory for static files if needed
# mkdir -p public
# cp -r dist/* public/

echo "Deployment build complete!"
echo "Upload the following to Hostinger:"
echo "1. package.json"
echo "2. package-lock.json"
echo "3. dist/ directory"
echo "4. node_modules/ directory (or run npm install on server)"
echo ""
echo "Alternatively, use Hostinger's Git deployment or file manager."
