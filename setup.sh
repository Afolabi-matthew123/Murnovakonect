#!/bin/bash

echo "Ì∫Ä Setting up Murnova Konect FM-1..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "‚ùå pnpm is not installed. Please install pnpm first: npm install -g pnpm"
    exit 1
fi

echo "Ì≥¶ Installing dependencies..."
pnpm install

echo "Ì∞≥ Starting infrastructure..."
pnpm db:up

echo "‚è≥ Waiting for database to be ready..."
sleep 5

echo "Ì∑ÑÔ∏è Setting up database..."
pnpm --filter ./apps/api run db:setup

echo "‚úÖ Setup completed!"
echo ""
echo "ÌæØ Next steps:"
echo "   1. Start development: pnpm --filter ./apps/api run start:dev"
echo "   2. Access API: http://localhost:3000"
echo "   3. API Docs: http://localhost:3000/api"
echo ""
echo "Ì¥ë Default credentials:"
echo "   Super Admin: superadmin@murnova.com / admin123"
echo "   School Admin: admin@demo-academy.com / admin123"
