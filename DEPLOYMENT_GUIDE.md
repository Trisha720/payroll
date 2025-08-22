# Deployment Guide

## Deploy to Railway (Recommended for Node.js + MySQL)

1. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign up
2. **Create New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Connect Repository**: Select your payroll management repository
4. **Add MySQL Database**: 
   - In your Railway project, click "New" → "Database" → "MySQL"
   - Railway will automatically create a MySQL instance
5. **Set Environment Variables**:
   - Go to your app service → Variables tab
   - Add the following variables (Railway will auto-populate database variables):
   \`\`\`
   PORT=3000
   NODE_ENV=production
   DB_HOST=${{MySQL.MYSQL_HOST}}
   DB_USER=${{MySQL.MYSQL_USER}}
   DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   DB_NAME=${{MySQL.MYSQL_DATABASE}}
   DB_PORT=${{MySQL.MYSQL_PORT}}
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   \`\`\`
6. **Deploy**: Railway will automatically deploy your app

## Deploy to Render

1. **Create Render Account**: Go to [render.com](https://render.com)
2. **Create Web Service**: New → Web Service → Connect GitHub repo
3. **Configure Service**:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add MySQL Database**: Create a new PostgreSQL database or use external MySQL
5. **Set Environment Variables** in Render dashboard

## Deploy to Heroku

1. **Install Heroku CLI**: Download from [heroku.com](https://heroku.com)
2. **Login**: `heroku login`
3. **Create App**: `heroku create your-payroll-app`
4. **Add MySQL**: `heroku addons:create jawsdb:kitefin` (or use ClearDB)
5. **Set Environment Variables**:
   \`\`\`bash
   heroku config:set NODE_ENV=production
   heroku config:set DB_SSL=true
   heroku config:set DB_SSL_REJECT_UNAUTHORIZED=false
   \`\`\`
6. **Deploy**: `git push heroku main`

## Environment Variables Required

- `PORT`: Server port (usually auto-set by hosting platform)
- `DB_HOST`: MySQL host URL
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name
- `DB_PORT`: MySQL port (usually 3306)
- `DB_SSL`: Set to 'true' for online databases
- `DB_SSL_REJECT_UNAUTHORIZED`: Set to 'false' for most cloud MySQL services

## Post-Deployment Steps

1. **Database Setup**: The app will automatically create tables on first run
2. **Test Endpoints**: Visit `/api/employees` to verify the API is working
3. **Access Frontend**: Navigate to your deployed URL to access the payroll system

## Troubleshooting

- **Database Connection Issues**: Verify all DB environment variables are set correctly
- **SSL Errors**: Ensure `DB_SSL=true` and `DB_SSL_REJECT_UNAUTHORIZED=false` for cloud databases
- **Port Issues**: Make sure `PORT` environment variable is set (most platforms auto-set this)
