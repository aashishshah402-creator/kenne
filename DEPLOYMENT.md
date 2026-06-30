# Deployment & SEO Setup Guide for Kennebis Hemp

This repository contains the complete static website files for **Kennebis Hemp** (Nepal's first science-backed Himalayan herbal skincare brand). All assets have been compressed, and sitemaps, manifests, and SEO features have been fully prepped for production.

Follow the instructions below to upload, deploy, and verify the website.

---

## 1. Hosting Options

Because this website is a static HTML/JS application, it can be hosted for **free** on multiple modern hosting platforms. We recommend the following:

### Option A: Vercel (Recommended for SPA Routing)
Vercel is ideal because it automatically supports custom headers and clean redirection rules via a `vercel.json` file.
1. Sign up for a free account at [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Import the repository and click **Deploy**. Vercel will build and deploy your site in seconds.
4. Go to **Settings > Domains** to add your custom domain (`kennebis.hemp` or another domain). Vercel handles SSL certificates automatically.

### Option B: Netlify
1. Sign up for a free account at [Netlify](https://netlify.com).
2. Connect your GitHub repository and select this project.
3. Keep the build command empty and select the repository root as the publish directory. Click **Deploy**.
4. Go to **Domain management** to configure your custom domain and activate free Let's Encrypt SSL/HTTPS.

### Option C: GitHub Pages
1. Go to your GitHub repository **Settings > Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` branch and `/ (root)` folder, then click **Save**.
4. To use a custom domain, type it in the **Custom domain** box and save. Tick **Enforce HTTPS** once the DNS check completes.

---

## 2. SSL / HTTPS (SSL Certificate)
For security, user trust, and SEO ranking, your site must run on **HTTPS (SSL)**.
* If hosting on **Vercel**, **Netlify**, or **GitHub Pages**, a free SSL certificate is automatically provisioned and renewed via Let's Encrypt.
* If using custom servers (Apache/Nginx), install **Certbot** to generate a free Let's Encrypt SSL certificate and set up a redirect from HTTP to HTTPS.

---

## 3. SEO Verification & Analytics Configuration

### Google Search Console
1. Open the [Google Search Console](https://search.google.com/search-console).
2. Add a new **URL Prefix** property using your deployed site address (e.g., `https://kennebis.hemp/`).
3. Under HTML tag verification, copy the verification code string (starts with `google-site-verification`).
4. Open [index.html](file:///c:/Users/ASUS/.gemini/antigravity/scratch/kennebis-hemp/index.html) and locate line 8:
   ```html
   <meta name="google-site-verification" content="GSC_VERIFICATION_CODE_PLACEHOLDER" />
   ```
   Replace `GSC_VERIFICATION_CODE_PLACEHOLDER` with your copied code, commit, and push.
5. In Search Console, click **Verify**.
6. Submit your sitemaps under the **Sitemaps** section by entering `sitemap.xml` and `sitemap-images.xml`.

### Google Analytics Setup
1. Create a Google Analytics 4 property at [Google Analytics](https://analytics.google.com).
2. Set up a Web Stream for your website to get a **Measurement ID** (format: `G-XXXXXXXXXX`).
3. Open [index.html](file:///c:/Users/ASUS/.gemini/antigravity/scratch/kennebis-hemp/index.html) and replace all instances of `G-GA_MEASUREMENT_ID_PLACEHOLDER` with your GA4 Measurement ID (usually in the header scripts around lines 10-17).
4. Commit and push the changes. Analytics will start tracking pageviews, product modal views, and button clicks automatically.

---

## 4. Git & GitHub Upload Instructions

If you haven't uploaded your repository to GitHub yet, run the following commands in your local workspace terminal:

```bash
# Initialize git repository (if not already initialized)
git init

# Add all project files
git add .

# Create the initial commit
git commit -m "chore: initial commit with asset compression and SEO optimization"

# Create a new repository on GitHub.com and copy the remote URL, then run:
git remote add origin https://github.com/your-username/kennebis-hemp.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

Your site is now ready for world-class indexing, premium load performance, and seamless analytics!
