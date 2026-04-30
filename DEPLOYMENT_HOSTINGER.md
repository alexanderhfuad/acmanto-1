# Deployment Guide for Hostinger

## Deployment Methods

### Method 1: Hostinger Node.js Web App (Recommended)

This method uses Hostinger's built-in Node.js Web App feature with GitHub integration.

**Prerequisites:**
- Hostinger account with Node.js Web App feature
- GitHub repository with your code

**Steps:**

1. **Access Node.js Web App:**
   - Log in to Hostinger hPanel
   - Navigate to Websites on the sidebar
   - Click Add Website
   - Choose Node.js Apps

2. **Import from GitHub:**
   - Select Import Git Repository
   - Authorize GitHub access when prompted
   - Select repository: `alexanderhfuad/acmanto-1`
   - Select branch: `main`

3. **Configure Build Settings:**
   - **Framework Type:** Vite (or "Other" if Vite not detected)
   - **Build Command:** `npm run build:hostinger`
   - **Output Directory:** `artifacts/ac-booking/dist/public`
   - **Node.js Version:** 22.x

4. **Deploy:**
   - Click Deploy
   - Wait for build to complete
   - Preview your website

**Note:** This is a static SPA deployment - no server-side Node.js process is needed.

### Method 2: Manual Static File Upload

For traditional shared hosting without Node.js Web App feature.

**Steps:**

1. **Build Locally:**
   ```bash
   npm run build:hostinger
   ```

2. **Upload to Hostinger:**
   - Go to File Manager
   - Navigate to `public_html`
   - Upload contents of `artifacts/ac-booking/dist/public/` to `public_html`
   - Upload `.htaccess` to `public_html`

3. **Set Permissions:**
   - Folders: 755
   - Files: 644

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

### 403 Forbidden or 404 Not Found Errors

**1. Check if index.html exists in root:**
- Via File Manager, verify `index.html` is directly in `public_html`
- If not, run the post-deploy script or manually copy build files

**2. Disable .htaccess temporarily to test:**
- Rename `.htaccess` to `.htaccess-disabled` via File Manager
- Refresh the page - if it works, the issue is in rewrite rules
- Check the `.htaccess` file for blocking rules

**3. Verify file permissions:**
- Folders should be 755
- Files should be 644
- Set via File Manager > right-click > Permissions

**4. Check build location:**
- Hostinger Git deployment builds in `.builds/source/repository/`
- The post-deploy script should copy files to root
- Check deployment logs to see if post-deploy ran successfully

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
