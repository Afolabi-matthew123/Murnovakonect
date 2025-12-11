#!/bin/bash

echo "=== MURNOVA KONECT SETUP (After Ubuntu Install) ==="
echo ""

# Check if Ubuntu is installed
echo "1. Checking WSL/Ubuntu installation..."
if wsl --list | grep -q "Ubuntu"; then
    echo "âœ… Ubuntu is installed in WSL2"
else
    echo "âŒ Ubuntu not found in WSL"
    echo "Please run the PowerShell script first"
    exit 1
fi

echo ""
echo "2. Checking Docker status..."
if docker ps &> /dev/null; then
    echo "âœ… Docker is running"
else
    echo "âŒ Docker not running"
    echo "Please start Docker Desktop from Start Menu"
    echo "Wait for whale icon to turn white"
    read -p "Press Enter after starting Docker..."
fi

echo ""
echo "3. Configuring Docker WSL2 Integration..."
echo "Please ensure in Docker Desktop:"
echo "âœ… Settings â†’ Resources â†’ WSL Integration"
echo "âœ… Enable integration with 'Ubuntu'"
echo "âœ… Click 'Apply & Restart'"
echo ""
read -p "Press Enter after configuring Docker WSL integration..."

echo ""
echo "4. Testing WSL2 Docker integration..."
docker run --rm --platform linux/amd64 alpine echo "âœ… WSL2 Docker is working!"

echo ""
echo "5. Starting Murnova services..."
docker-compose up -d

echo "   Waiting for services to start..."
sleep 15

echo ""
echo "6. Checking services..."
docker-compose ps

echo ""
echo "7. Setting up database..."
pnpm --filter @murnova-konect/api run prisma:generate
pnpm --filter @murnova-konect/api run prisma:migrate:dev
pnpm --filter @murnova-konect/api run seed

echo ""
echo "í¾‰ í¾‰ í¾‰ MURNOVA KONECT FM-1 IS READY! í¾‰ í¾‰ í¾‰"
echo ""
echo "To start the API:"
echo "pnpm --filter @murnova-konect/api run start:dev"
echo ""
echo "Test endpoints:"
echo "curl http://localhost:3000/health"
echo "curl -X POST http://localhost:3000/api/v1/auth/login \\"
echo '  -H "Content-Type: application/json" \'
echo '  -d '\''{"email":"superadmin@murnova.com","password":"admin123"}'\'
echo ""
echo "API Documentation: http://localhost:3000/api/docs"
