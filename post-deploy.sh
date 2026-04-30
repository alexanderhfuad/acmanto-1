#!/bin/bash
# Post-deployment script for Hostinger Git deployment
# This script runs after git pull to move build files to public_html

echo "Running post-deployment script..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Current directory: $SCRIPT_DIR"
echo "Listing directories:"
ls -la "$SCRIPT_DIR"

# Check if build directory exists in different possible locations
BUILD_DIR=""
if [ -d "$SCRIPT_DIR/artifacts/ac-booking/dist/public" ]; then
  BUILD_DIR="$SCRIPT_DIR/artifacts/ac-booking/dist/public"
  echo "Found build directory at: $BUILD_DIR"
elif [ -d "$SCRIPT_DIR/.builds/source/repository/artifacts/ac-booking/dist/public" ]; then
  BUILD_DIR="$SCRIPT_DIR/.builds/source/repository/artifacts/ac-booking/dist/public"
  echo "Found build directory at: $BUILD_DIR"
else
  echo "Error: Build directory not found"
  echo "Searching for dist directories..."
  find "$SCRIPT_DIR" -type d -name "dist" 2>/dev/null | head -10
  exit 1
fi

# Copy build files to root (public_html)
echo "Copying build files to root directory..."
cp -r "$BUILD_DIR/"* "$SCRIPT_DIR/"

# Verify index.html exists
if [ -f "$SCRIPT_DIR/index.html" ]; then
  echo "✓ index.html found in root directory"
else
  echo "✗ Error: index.html not found in root directory after copy"
  exit 1
fi

# Set correct permissions
echo "Setting file permissions..."
find "$SCRIPT_DIR" -type d -exec chmod 755 {} \;
find "$SCRIPT_DIR" -type f -exec chmod 644 {} \;

# Ensure .htaccess has correct permissions
if [ -f "$SCRIPT_DIR/.htaccess" ]; then
  chmod 644 "$SCRIPT_DIR/.htaccess"
  echo "✓ .htaccess permissions set"
fi

echo "Post-deployment script completed successfully"
echo "Files in root directory:"
ls -la "$SCRIPT_DIR" | head -20
