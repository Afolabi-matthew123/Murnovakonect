#!/bin/bash

echo "íº€ Setting up PostgreSQL for Murnova Konect..."

# Check if .env exists, if not create it
if [ ! -f .env ]; then
    echo "í³ Creating .env file..."
    cat > .env << 'ENVEOF'
# PostgreSQL Database (Update with your actual credentials)
DATABASE_URL="postgresql://postgres:password@localhost:5432/murnova_konect?schema=public"

# Redis (optional for local development)
REDIS_URL="redis://localhost:6379"

# JWT Secrets (development)
JWT_ACCESS_SECRET="dev-access-secret-change-in-production"
JWT_REFRESH_SECRET="dev-refresh-secret-change-in-production"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# App
NODE_ENV="development"
PORT="3000"
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"

# Rate Limiting
THROTTLE_TTL="60"
THROTTLE_LIMIT="100"
ENVEOF
fi

echo "í´§ Please update the DATABASE_URL in .env file with your PostgreSQL credentials:"
echo "   Current: postgresql://postgres:password@localhost:5432/murnova_konect?schema=public"
echo "   Example: postgresql://username:password@localhost:5432/your_database_name"
echo ""
read -p "Have you updated the DATABASE_URL? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "âŒ Please update the .env file and run the script again."
    exit 1
fi

echo "í³¦ Generating Prisma client..."
cd apps/api
pnpm prisma:generate

echo "í·„ï¸ Pushing database schema to PostgreSQL..."
pnpm prisma:db:push

echo "í¼± Seeding database with sample data..."
pnpm seed

echo "âœ… PostgreSQL setup completed!"
echo ""
echo "í¾¯ Next steps:"
echo "   1. Start development: pnpm start:dev"
echo "   2. Access API: http://localhost:3000"
echo "   3. API Docs: http://localhost:3000/api"
echo ""
echo "í´‘ Default credentials:"
echo "   Super Admin: superadmin@murnova.com / admin123"
echo "   School Admin: admin@demo-academy.com / admin123"
