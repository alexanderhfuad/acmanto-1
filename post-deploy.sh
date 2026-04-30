#!/bin/bash
# Post-deployment script for Hostinger Git deployment
# This script runs after git pull to move build files to public_html

echo "Running post-deployment script..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if build directory exists
if [ -d "$SCRIPT_DIR/artifacts/ac-booking/dist/public" ]; then
  echo "Copying ac-booking build files to public_html..."
  cp -r "$SCRIPT_DIR/artifacts/ac-booking/dist/public/"* "$SCRIPT_DIR/"
  echo "Build files copied successfully"
else
  echo "Warning: Build directory not found at artifacts/ac-booking/dist/public"
  echo "Please ensure the build completed successfully"
fi

# Set correct permissions
echo "Setting file permissions..."
find "$SCRIPT_DIR" -type d -exec chmod 755 {} \;
find "$SCRIPT_DIR" -type f -exec chmod 644 {} \;

echo "Post-deployment script completed"
