#!/bin/bash

# GitHub Deployment Script for Ferguson Appearances Map
# This script will help you initialize a git repository and push to GitHub

echo "=== Ferguson Appearances Map - GitHub Setup ==="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed. Please install git first."
    exit 1
fi

echo "Step 1: Initialize git repository"
git init

echo ""
echo "Step 2: Add all files to git"
git add index.html data.js map.js README.md .gitignore ferguson_appearances.csv

echo ""
echo "Step 3: Create initial commit"
git commit -m "Initial commit: Interactive map of Governor Ferguson's public appearances"

echo ""
echo "=== Next Steps ==="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: ferguson-appearances-map (or your choice)"
echo "   - Make it Public (required for GitHub Pages)"
echo "   - Do NOT initialize with README, .gitignore, or license"
echo ""
echo "2. After creating the repository, run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to your repository settings"
echo "   - Navigate to Pages section"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main / (root)"
echo "   - Click Save"
echo ""
echo "4. Your site will be live at:"
echo "   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/"
echo ""
echo "=== Alternative: Quick Commands ==="
echo ""
echo "If you've already created a GitHub repository, run:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
