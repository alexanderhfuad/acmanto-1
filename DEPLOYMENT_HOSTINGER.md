# Deployment Guide for Hostinger Shared Hosting

## Prerequisites

- Hostinger shared hosting account with Node.js support
- SSH access or File Manager access
- Node.js version 22.x (check hPanel for available versions)

## Important Notes for Hostinger Deployment

Hostinger's Git deployment builds in `.builds/source/repository/` and may not automatically serve files from there. The recommended approach is to:

1. **Use the deployment script** to build and prepare files in a `public/` directory
2. **Upload `public/` contents directly to `public_html`**
3. **Ensure `.htaccess` is in `public_html` for SPA routing**

## Deployment Methods

### Method 1: Using Deployment Script + File Manager (Recommended)

1. **Build and prepare files locally:**
   ```bash
   chmod +x deploy-hostinger.sh
   ./deploy-hostinger.sh
   ```

2. **Upload to Hostinger:**
   - Log in to Hostinger hPanel
   - Go to File Manager
   - Navigate to `public_html` or your subdomain folder
   - Upload all files from the `public/` directory
   - Upload the `.htaccess` file

3. **Set permissions:**
   - Folders: 755
   - Files: 644
   - This can be done via File Manager > right-click > Permissions

### Method 2: Using Git Deployment with Post-Build Script

1. **Configure Git deployment in Hostinger:**
   - Go to hPanel > Advanced > Git
   - Enter your Git repository URL: `git@github.com:alexanderhfuad/acmanto-1.git`
   - Select the branch: `main`
   - Set the deployment folder: `public_html`
   - Click "Create"

2. **Add a post-deployment script** to move build files:
   - Create `post-deploy.sh` in your repository
   - Hostinger will run this after git pull

3. **The build will run automatically** and files will be in `.builds/source/repository/`

### Method 3: Manual Build via Hostinger Node.js

1. **Configure Node.js application:**
   - Go to hPanel > Advanced > Node.js
   - Select your Node.js version (22.x)
   - Set the application root to your domain folder
   - Click "Create application"

2. **The system will:**
   - Run `npm install` automatically
   - Run the build script from `package.json`
   - You may need to manually move build files to public_html

### Method 2: Using Git Deployment

1. **Push your code to GitHub/GitLab:**
   ```bash
   git add .
   git commit -m "Prepare for Hostinger deployment"
   git push origin main
   ```

2. **Configure Git deployment in Hostinger:**
   - Go to hPanel > Advanced > Git
   - Click "Create repository"
   - Enter your Git repository URL
   - Select the branch (main/master)
   - Set the deployment folder (public_html)
   - Click "Create"

3. **Configure Node.js application:**
   - Go to hPanel > Advanced > Node.js
   - Select your Node.js version
   - Set the startup file
   - Click "Create application"

### Method 3: Using SSH (Advanced)

1. **Connect via SSH:**
   ```bash
   ssh username@yourdomain.com
   ```

2. **Navigate to your directory:**
   ```bash
   cd public_html
   ```

3. **Clone or upload your files:**
   ```bash
   git clone your-repo-url .
   # or upload files via SFTP
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Build the application:**
   ```bash
   npm run build
   ```

## Application Configuration

### For API Server (artifacts/api-server)

1. **Startup file:** `dist/index.mjs`
2. **Environment variables:** Set in Hostinger Node.js configuration
   - `NODE_ENV=production`
   - Database connection strings
   - API keys

### For Frontend (artifacts/ac-booking)

1. **Build the frontend:**
   ```bash
   cd artifacts/ac-booking
   npm run build
   ```

2. **Upload the dist folder contents to public_html**

3. **Ensure .htaccess is configured for SPA routing**

## Important Notes

1. **Node.js Version:** Hostinger may have specific Node.js versions available. Check hPanel and update `package.json` `engines` field if needed:
   ```json
   "engines": {
     "node": ">=22.0.0"
   }
   ```

2. **Environment Variables:** Set sensitive data (API keys, database URLs) in Hostinger's Node.js configuration, not in code.

3. **Database:** If using PostgreSQL, configure the database in Hostinger's MySQL/PostgreSQL section and update connection strings.

4. **Build Process:** Hostinger's Node.js setup runs `npm install` automatically. If you need a build step, you may need to:
   - Build locally and upload the dist folder
   - Or use a custom startup script that builds first

5. **File Permissions:** Ensure Node.js has write permissions for necessary directories (logs, uploads, etc.)

## Troubleshooting

### Application won't start
- Check Node.js version compatibility
- Verify startup file path
- Check error logs in Hostinger hPanel

### Build errors
- Ensure all dependencies are in package.json
- Check Node.js version requirements
- Try building locally first to identify issues

### Module not found errors
- Run `npm install` on the server
- Check that node_modules is properly uploaded
- Verify package-lock.json is uploaded

### Permission errors
- Check file permissions via File Manager or SSH
- Ensure Node.js user has read/write access

## Support

For Hostinger-specific issues:
- Check Hostinger knowledge base: https://support.hostinger.com
- Contact Hostinger support via hPanel

For application-specific issues:
- Check application logs
- Verify environment variables
- Test locally before deploying
