#!/bin/bash

echo "Setting up FM-1: Core Backend Infrastructure"
echo "============================================"
echo ""

# 1. Install dependencies
echo "1. Installing dependencies..."
pnpm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# 2. Start Docker services
echo "2. Starting Docker services..."
docker-compose up -d
if [ $? -eq 0 ]; then
    echo "✅ Docker services started"
    
    # Wait for services to be ready
    echo "   Waiting for PostgreSQL to be ready..."
    sleep 5
    
    # Check if PostgreSQL is ready
    if docker-compose exec postgres pg_isready -U postgres; then
        echo "✅ PostgreSQL is ready"
    else
        echo "❌ PostgreSQL not ready, waiting longer..."
        sleep 10
    fi
else
    echo "❌ Failed to start Docker services"
    exit 1
fi

echo ""

# 3. Generate Prisma client
echo "3. Generating Prisma client..."
pnpm --filter @murnova-konect/api run prisma:generate
if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo ""

# 4. Run migrations
echo "4. Running database migrations..."
pnpm --filter @murnova-konect/api run prisma:migrate:dev --name init
if [ $? -eq 0 ]; then
    echo "✅ Database migrations completed"
else
    echo "❌ Failed to run migrations"
    exit 1
fi

echo ""

# 5. Seed database
echo "5. Seeding database..."
pnpm --filter @murnova-konect/api run seed
if [ $? -eq 0 ]; then
    echo "✅ Database seeded"
else
    echo "❌ Failed to seed database"
    exit 1
fi

echo ""

echo "============================================"
echo "SETUP COMPLETE! ���"
echo ""
echo "You can now start the API:"
echo "  pnpm --filter @murnova-konect/api run start:dev"
echo ""
echo "API will be available at: http://localhost:3000"
echo "Swagger documentation: http://localhost:3000/api/docs"
echo ""
echo "Default credentials:"
echo "  Super Admin: superadmin@murnova.com / admin123"
echo "  School Admin: admin@demo-academy.com / admin123"
echo ""
echo "Test the API:"
echo "  curl http://localhost:3000/health"
echo "============================================"
