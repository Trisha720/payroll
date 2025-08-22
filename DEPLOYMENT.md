# Deploying with Online MySQL Database

## Recommended Online MySQL Services

### 1. PlanetScale (Recommended)
- **Pros**: Serverless, branching, automatic scaling
- **Setup**: 
  1. Create account at planetscale.com
  2. Create database
  3. Get connection string
  4. Set `DB_SSL=true`

### 2. Railway
- **Pros**: Simple setup, good for development
- **Setup**:
  1. Create account at railway.app
  2. Add MySQL service
  3. Copy connection details
  4. Set `DB_SSL=true`

### 3. DigitalOcean Managed Database
- **Pros**: Reliable, managed backups
- **Setup**:
  1. Create droplet with managed database
  2. Configure firewall rules
  3. Use provided connection string
  4. Set `DB_SSL=true`

### 4. AWS RDS
- **Pros**: Enterprise-grade, highly scalable
- **Setup**:
  1. Create RDS MySQL instance
  2. Configure security groups
  3. Use endpoint as DB_HOST
  4. Set `DB_SSL=true`

## Environment Variables Setup

Copy `.env.example` to `.env` and fill in your database credentials:

\`\`\`bash
cp .env.example .env
\`\`\`

## Database Initialization

After connecting to your online database, run the setup script:

\`\`\`bash
# Run the database creation script on your online MySQL service
# You can use MySQL Workbench, phpMyAdmin, or command line
mysql -h YOUR_HOST -u YOUR_USER -p YOUR_DATABASE < scripts/create_database.sql
\`\`\`

## Testing Connection

Start the server to test the connection:

\`\`\`bash
npm start
\`\`\`

Look for the success message: "✅ MySQL Database connected successfully"

## Troubleshooting

- **SSL Errors**: Set `DB_SSL=true` for most online services
- **Connection Timeout**: Increase timeout values in database config
- **Access Denied**: Check username, password, and host permissions
- **Unknown Host**: Verify the database host URL is correct
