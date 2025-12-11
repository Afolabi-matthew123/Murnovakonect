#!/bin/bash

echo "=== MURNOVA KONECT FM-1 LAUNCH ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check command
check() {
    if $1 >/dev/null 2>&1; then
        echo -e "${GREEN}‚úÖ $2${NC}"
        return 0
    else
        echo -e "${RED}‚ùå $2${NC}"
        return 1
    fi
}

echo "1. Checking prerequisites..."
check "docker --version" "Docker"
check "docker ps" "Docker running"
check "wsl --list" "WSL"
check "docker-compose --version" "Docker Compose"

echo ""
echo "2. Starting services..."
docker-compose up -d
sleep 8

echo ""
echo "3. Checking services..."
docker-compose ps

echo ""
echo "4. Setting up database..."
pnpm --filter @murnova-konect/api run prisma:generate
pnpm --filter @murnova-konect/api run prisma:migrate:dev
pnpm --filter @murnova-konect/api run seed

echo ""
echo "Ìæâ SETUP COMPLETE!"
echo ""
echo "To start the API:"
echo "  pnpm --filter @murnova-konect/api run start:dev"
echo ""
echo "Test endpoints:"
echo "  Health: curl http://localhost:3000/health"
echo "  Login: curl -X POST http://localhost:3000/api/v1/auth/login \\"
echo '    -H "Content-Type: application/json" \'
echo '    -d '\''{"email":"superadmin@murnova.com","password":"admin123"}'\'
echo ""
echo "API Documentation: http://localhost:3000/api/docs"
