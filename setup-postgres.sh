#!/bin/bash

echo "Ì∫Ä Setting up PostgreSQL for Murnova Konect..."

echo "Ì≥¶ Generating Prisma client..."
cd apps/api
pnpm prisma:generate

echo "Ì∑ÑÔ∏è Pushing database schema to PostgreSQL..."
pnpm prisma:db:push

echo "Ìº± Seeding database with sample data..."
pnpm seed

echo "‚úÖ PostgreSQL setup completed!"
echo ""
echo "ÌæØ Next steps:"
echo "   1. Start development: pnpm start:dev"
echo "   2. Access API: http://localhost:3000"
echo "   3. API Docs: http://localhost:3000/api"
echo ""
echo "Ì¥ë Default credentials:"
echo "   Super Admin: superadmin@murnova.com / admin123"
echo "   School Admin: admin@demo-academy.com / admin123"
