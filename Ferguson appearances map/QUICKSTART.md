# Quick Start Guide

## Files Included

- `index.html` - Main HTML page
- `data.js` - Data file with county populations and appearances
- `map.js` - JavaScript for rendering the interactive map
- `ferguson_appearances.csv` - Raw data in CSV format
- `README.md` - Full documentation
- `.gitignore` - Git ignore rules
- `deploy.sh` - Deployment helper script

## Option 1: View Locally (Immediate)

Simply open `index.html` in your web browser. No server required!

```bash
# On Mac
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

## Option 2: Deploy to GitHub Pages (Recommended for Sharing)

### Prerequisites
- A GitHub account
- Git installed on your computer

### Steps

1. **Create a new GitHub repository**
   - Go to https://github.com/new
   - Name: `ferguson-appearances-map` (or your choice)
   - Visibility: **Public** (required for free GitHub Pages)
   - **Do NOT** check "Initialize with README"
   - Click "Create repository"

2. **Initialize and push your local repository**
   
   In your terminal, navigate to the folder containing these files and run:
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ferguson appearances interactive map"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" (top menu)
   - Click "Pages" (left sidebar)
   - Under "Source", select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click "Save"

4. **View your live site**
   - Wait 1-2 minutes for GitHub to build your site
   - Your site will be available at:
     `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - The URL will be shown in the GitHub Pages settings

## Option 3: Use the Helper Script

Run the included deployment script:

```bash
bash deploy.sh
```

This will initialize git and show you the commands to run.

## Updating the Data

To add new appearances:

1. Edit `data.js`
2. Add entries to the `appearances` array
3. Update `countyAppearances` counts
4. Update `monthlyAppearances` totals
5. Commit and push changes:
   ```bash
   git add data.js
   git commit -m "Update: Added new appearances"
   git push
   ```

Your GitHub Pages site will automatically update in 1-2 minutes.

## Customization Tips

### Change Colors
Edit the color scheme in `index.html` (CSS section) or `map.js` (d3.interpolateBlues)

### Adjust Map Size
Modify `width` and `height` variables in `map.js`

### Update Title
Change the header text in `index.html`

## Troubleshooting

**Map not displaying?**
- Check browser console (F12) for JavaScript errors
- Make sure all three files (index.html, data.js, map.js) are in the same folder

**GitHub Pages not working?**
- Ensure repository is Public
- Wait 2-3 minutes after enabling Pages
- Check that branch is set to "main" not "master"

**Want to use a custom domain?**
- See GitHub Pages documentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Support

For issues or questions:
- Open an issue on your GitHub repository
- Check the full README.md for detailed documentation

---

Happy mapping! 🗺️
