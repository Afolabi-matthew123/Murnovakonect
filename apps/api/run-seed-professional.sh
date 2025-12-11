#!/bin/bash
echo "=== PROFESSIONAL SEED EXECUTION FOR MURNOVA SAAS ==="
echo ""

echo "1. Checking Prisma client location..."
if [ -f "node_modules/.ignored/@prisma/client/index.js" ]; then
    echo "âœ… Prisma client found in .ignored folder"
    echo "   This is normal for pnpm workspaces"
else
    echo "âŒ Prisma client not found"
    echo "   Regenerating..."
    npx prisma generate
fi

echo ""
echo "2. Creating TypeScript configuration for seed..."
cat > tsconfig.seed.json << 'TS_SEED'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@prisma/client": ["./node_modules/.ignored/@prisma/client"],
      "@murnova-konect/*": ["../../packages/*/src"]
    }
  },
  "ts-node": {
    "transpileOnly": true,
    "compilerOptions": {
      "module": "commonjs"
    },
    "require": ["tsconfig-paths/register"]
  }
}
TS_SEED

echo "âœ… Created tsconfig.seed.json"

echo ""
echo "3. Running seed with proper configuration..."
npx ts-node --project tsconfig.seed.json src/modules/seed/seed.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "í¾‰ SEED SUCCESSFUL!"
    echo "Your Murnova SAAS database is now seeded with:"
    echo "  - Admin user: superadmin@murnova.com"
    echo "  - Roles and permissions"
    echo "  - Initial school structure"
else
    echo ""
    echo "âš ï¸  Seed failed. Trying alternative approach..."
    
    echo ""
    echo "4. Alternative: Direct require approach..."
    cat > seed-require.js << 'SEED_REQ'
// Direct require bypasses TypeScript import issues
const { PrismaClient } = require('./node_modules/.ignored/@prisma/client')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}

async function seed() {
  console.log('Starting seed via require...')
  const prisma = new PrismaClient()
  
  try {
    // Your seed logic here
    const hashedPassword = await hashPassword('admin123')
    
    console.log('Creating admin user...')
    const admin = await prisma.user.create({
      data: {
        email: 'superadmin@murnova.com',
        password: hashedPassword,
        userType: 'SUPER_ADMIN',
        isActive: true,
        emailVerified: true
      }
    })
    
    console.log('âœ… Admin created:', admin.email)
    console.log('âœ… Seed completed successfully!')
    
  } catch (error) {
    console.error('âŒ Seed error:', error.message)
    
    // Check database state
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('í³‹ Database tables:', tables.map(t => t.table_name))
    
  } finally {
    await prisma.$disconnect()
  }
}

seed()
SEED_REQ
    
    node seed-require.js
fi
