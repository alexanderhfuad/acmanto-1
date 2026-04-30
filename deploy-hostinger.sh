#!/bin/bash
# Deployment script for Hostinger Shared Hosting (Static SPA Deployment)
# This script builds the frontend SPA locally for upload to shared hosting

echo "Starting deployment build for Hostinger Shared Hosting..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf artifacts/ac-booking/dist/public
rm -rf public

# Install dependencies
echo "Installing dependencies..."
npm install

# Build only the ac-booking SPA
echo "Building ac-booking SPA..."
cd artifacts/ac-booking
npm run build
cd ../..

# Verify build output
if [ ! -d "artifacts/ac-booking/dist/public" ]; then
  echo "Error: Build failed - dist/public directory not found"
  exit 1
fi

if [ ! -f "artifacts/ac-booking/dist/public/index.html" ]; then
  echo "Error: Build failed - index.html not found in build output"
  exit 1
fi

# Create public directory for upload
echo "Preparing public directory..."
mkdir -p public
cp -r artifacts/ac-booking/dist/public/* public/

echo "✓ Build completed successfully"
echo "✓ index.html found in public directory"
echo ""
echo "=========================================="
echo "DEPLOYMENT INSTRUCTIONS"
echo "=========================================="
echo ""
echo "Upload the CONTENTS of the 'public' folder to:"
echo "  Hostinger > File Manager > public_html"
echo ""
echo "Files to upload:"
ls -la public/
echo ""
echo "Also upload .htaccess to public_html"
echo ""
echo "DO NOT upload:"
echo "  - node_modules/"
echo "  - artifacts/"
echo "  - lib/"
echo "  - package.json"
echo "  - package-lock.json"
echo "  - source code files"
echo ""
echo "This is a STATIC SPA deployment - no Node.js server needed on Hostinger."
