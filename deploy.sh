#!/bin/bash

# EVFBS Website Deployment Script
echo "🚀 Deploying EVFBS Website..."

# Build the website
echo "📦 Building website..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in ./dist/"
    echo ""
    echo "🌐 To deploy to Vercel:"
    echo "1. Run: vercel login"
    echo "2. Run: vercel --prod"
    echo ""
    echo "📋 Or upload ./dist/ folder to any static hosting provider"
    echo ""
    echo "🔗 Current site config:"
    echo "   - Site URL: https://edgeviewfinance-website.vercel.app"
    echo "   - Framework: Astro"
    echo "   - Output: Static"
else
    echo "❌ Build failed! Check errors above."
    exit 1
fi