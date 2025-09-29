#!/bin/bash

# Railway Deployment Script for Backend
# This script helps deploy your Spring Boot backend to Railway

echo "🚀 Starting Railway Deployment for Neenu's Natural Backend"
echo "================================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Navigate to backend directory
cd backend

echo "📂 Current directory: $(pwd)"

# Check if already logged in to Railway
if ! railway status &> /dev/null; then
    echo "🔐 Please log in to Railway..."
    railway login
fi

# Check if Railway project exists
if ! railway status &> /dev/null; then
    echo "🆕 Initializing new Railway project..."
    railway init
else
    echo "✅ Railway project already initialized"
fi

echo "🏗️  Deploying backend to Railway..."
railway up

echo "📊 Checking deployment status..."
railway status

echo ""
echo "🎯 Next Steps:"
echo "1. Add MySQL database service in Railway dashboard"
echo "2. Configure environment variables:"
echo "   - SPRING_DATASOURCE_URL=\${{MySQL.DATABASE_URL}}"
echo "   - SPRING_DATASOURCE_USERNAME=\${{MySQL.MYSQL_USER}}"
echo "   - SPRING_DATASOURCE_PASSWORD=\${{MySQL.MYSQL_PASSWORD}}"
echo "   - SPRING_JPA_HIBERNATE_DDL_AUTO=update"
echo "   - SPRING_SERVLET_MULTIPART_LOCATION=/tmp/uploads"
echo "   - ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000"
echo ""
echo "3. Update your Vercel frontend environment variable:"
echo "   VITE_API_BASE_URL=https://your-railway-app.railway.app/api"
echo ""
echo "🔗 Railway Dashboard: https://railway.app/dashboard"