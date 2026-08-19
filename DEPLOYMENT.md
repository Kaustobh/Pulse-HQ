# PulseHQ - Deployment & CI/CD Guide

This guide details the deployment setup, asset integrity requirements, GitHub Actions workflow configuration, and troubleshooting steps for hosting **PulseHQ** on **GitHub Pages**.

---

## 🎯 Hosting Architecture Overview

- **Hosting Provider**: GitHub Pages
- **Deployment Strategy**: GitHub Actions Workflow (`actions/deploy-pages@v4`)
- **Repository Link**: [https://github.com/Kaustobh/Pulse-HQ.git](https://github.com/Kaustobh/Pulse-HQ.git)
- **Live Site URL**: [https://Kaustobh.github.io/Pulse-HQ/](https://Kaustobh.github.io/Pulse-HQ/)
- **Build Output Directory**: `./dist`

---

## ⚙️ Pre-Deployment Asset Integrity Configuration

### 1. Base Sub-Path Setup (`vite.config.js`)
To ensure asset links (`.js`, `.css`, SVG icons, fonts) do not break under the repository subpath `/Pulse-HQ/`, the base path is configured in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Pulse-HQ/',
  // ...
})
```

### 2. Preventing Jekyll File Omission (`.nojekyll`)
GitHub Pages runs Jekyll processing by default, which strips or ignores files starting with underscores (e.g. `_app` or asset chunks). A `.nojekyll` file is added directly to `public/.nojekyll` so Vite places it into `dist/.nojekyll` during build.

### 3. SPA Routing Fallback (`404.html`)
To prevent `404 Not Found` errors when refreshing sub-routes on GitHub Pages, `public/404.html` contains a single-page app redirect script that preserves path parameters and routes back to `index.html`.

---

## 🚀 GitHub Actions Setup (Recommended)

Deployment is fully automated using GitHub Actions located at `.github/workflows/deploy.yml`.

### Workflow Workflow Steps:
1. **Trigger**: Pushing to the `main` branch or manual invocation via `workflow_dispatch`.
2. **Environment**: Node.js `20.x` on `ubuntu-latest`.
3. **Build**: Runs `npm ci` and `npm run build`.
4. **Artifact Upload**: Uploads `dist/` using `actions/upload-pages-artifact@v3`.
5. **Deployment**: Deploys artifacts via `actions/deploy-pages@v4`.

### Verification Steps in GitHub Repository:
1. Open your repository on GitHub: `https://github.com/Kaustobh/Pulse-HQ`
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push a commit to `main` to trigger the initial deployment run.

---

## ❓ Troubleshooting Matrix

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **Blank White Screen on Load** | Incorrect asset pathing (loading from domain root `/` instead of `/Pulse-HQ/`) | Ensure `base: '/Pulse-HQ/'` is set in `vite.config.js` and run `npm run build`. |
| **404 Error on Refresh** | GitHub Pages searching for actual static HTML files for SPA routes | Verify `public/404.html` is present in your build directory. |
| **Assets/Chunks 404 Ignored** | Jekyll ignoring files with underscores | Confirm `public/.nojekyll` exists in the repository. |
| **Build Timeout / npm Fail** | Missing or outdated lockfile | Run `npm install` locally to refresh `package-lock.json` and push changes. |

---

## 🛠️ Alternative Deployment (Standard `gh-pages` Branch)

If deploying manually without GitHub Actions, use the `gh-pages` package:

```bash
# Install gh-pages CLI tool
npm install -D gh-pages

# Deploy dist folder to gh-pages branch
npx gh-pages -d dist
```
In **Settings > Pages**, set **Source** to `Deploy from a branch` and select `gh-pages` / `/ (root)`.
