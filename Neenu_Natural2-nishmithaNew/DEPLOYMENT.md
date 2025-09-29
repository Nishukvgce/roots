# Deployment Guide

## Frontend Deployment (Vercel)

Your frontend is now configured for Vercel deployment with the `vercel.json` configuration file.

### Steps to Deploy:

1. **Push your changes** (already done):
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Configure Vercel Environment Variables**:
   Go to your Vercel project dashboard → Settings → Environment Variables and add:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```
   (Replace with your actual backend URL when deployed)

3. **Redeploy**: Vercel should automatically redeploy after you push the `vercel.json` file.

### Configuration Explanation:

- **buildCommand**: `cd frontend && npm run build` - Builds the React app from the frontend directory
- **outputDirectory**: `frontend/build` - Points to the Vite build output directory
- **installCommand**: `cd frontend && npm install` - Installs dependencies in the frontend directory
- **rewrites**: Configures client-side routing for React Router

## Backend Deployment Options

Your Spring Boot backend needs to be deployed separately. Consider these options:

### 1. Railway (Recommended)
- Simple to deploy Spring Boot apps
- Automatic database setup
- Environment variable management

### 2. Render
- Free tier available
- PostgreSQL database included
- Good for Spring Boot apps

### 3. Heroku
- Well-documented Spring Boot deployment
- PostgreSQL add-on available

### 4. Railway Deployment Steps:
1. Create account on Railway.app
2. Connect your GitHub repository
3. Select the `backend` folder as the source
4. Add environment variables for database connection
5. Deploy and get your backend URL
6. Update `VITE_API_BASE_URL` in Vercel with the Railway URL

## Current Build Status

✅ Frontend builds successfully locally
✅ Vercel configuration added
⏳ Backend deployment needed
⏳ Environment variables configuration needed

## Next Steps

1. Deploy your Spring Boot backend to Railway/Render/Heroku
2. Update the `VITE_API_BASE_URL` environment variable in Vercel
3. Test the full application flow

Your deployment should now work with the new Vercel configuration!