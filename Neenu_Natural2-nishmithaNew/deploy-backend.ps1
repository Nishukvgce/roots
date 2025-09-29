# Railway Deployment Script for Backend (PowerShell)
# This script helps deploy your Spring Boot backend to Railway

Write-Host "🚀 Starting Railway Deployment for Neenu's Natural Backend" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if Railway CLI is installed
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Railway CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Navigate to backend directory
Set-Location backend
Write-Host "📂 Current directory: $(Get-Location)" -ForegroundColor Cyan

# Check if already logged in to Railway
try {
    railway status | Out-Null
    Write-Host "✅ Railway project already initialized" -ForegroundColor Green
} catch {
    Write-Host "🔐 Please log in to Railway..." -ForegroundColor Yellow
    railway login
    
    Write-Host "🆕 Initializing new Railway project..." -ForegroundColor Yellow
    railway init
}

Write-Host "🏗️  Deploying backend to Railway..." -ForegroundColor Blue
railway up

Write-Host "📊 Checking deployment status..." -ForegroundColor Blue
railway status

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Add MySQL database service in Railway dashboard" -ForegroundColor White
Write-Host "2. Configure environment variables:" -ForegroundColor White
Write-Host "   - SPRING_DATASOURCE_URL=`${{MySQL.DATABASE_URL}}" -ForegroundColor Gray
Write-Host "   - SPRING_DATASOURCE_USERNAME=`${{MySQL.MYSQL_USER}}" -ForegroundColor Gray
Write-Host "   - SPRING_DATASOURCE_PASSWORD=`${{MySQL.MYSQL_PASSWORD}}" -ForegroundColor Gray
Write-Host "   - SPRING_JPA_HIBERNATE_DDL_AUTO=update" -ForegroundColor Gray
Write-Host "   - SPRING_SERVLET_MULTIPART_LOCATION=/tmp/uploads" -ForegroundColor Gray
Write-Host "   - ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Update your Vercel frontend environment variable:" -ForegroundColor White
Write-Host "   VITE_API_BASE_URL=https://your-railway-app.railway.app/api" -ForegroundColor Gray
Write-Host ""
Write-Host "🔗 Railway Dashboard: https://railway.app/dashboard" -ForegroundColor Cyan