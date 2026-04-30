import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../artifacts/ac-booking/dist/public');
const targetDir = path.join(__dirname, '..');

console.log('Copying build files from', sourceDir, 'to', targetDir);

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error('Error: Build directory not found at', sourceDir);
  console.error('Please run "npm run build" first');
  process.exit(1);
}

// Copy all files from source to target
const files = fs.readdirSync(sourceDir);

files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);

  const stat = fs.statSync(sourcePath);

  if (stat.isDirectory()) {
    // Copy directory recursively
    copyDirectory(sourcePath, targetPath);
  } else {
    // Copy file
    fs.copyFileSync(sourcePath, targetPath);
    console.log('Copied:', file);
  }
});

// Verify index.html exists
const indexPath = path.join(targetDir, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✓ index.html copied to root directory');
} else {
  console.error('✗ Error: index.html not found after copy');
  process.exit(1);
}

console.log('Build files copied successfully!');

function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}
