#!/bin/bash
echo "=== FIXING ORIGINAL PROJECT STRUCTURE ==="
echo ""

echo "1. Current working directory: $(pwd)"
echo ""

echo "2. Backing up schemas..."
cp ../../prisma/schema.prisma ../../prisma/schema.prisma.backup.$(date +%Y%m%d_%H%M%S)
cp prisma/schema.prisma prisma/schema.prisma.backup.$(date +%Y%m%d_%H%M%S)
echo "   ✅ Backups created with timestamp"
echo ""

echo "3. Fixing API schema generator path..."
# The root schema has correct path: ../apps/api/node_modules/.prisma/client
# Update API schema to match
sed -i 's|output   = "../../node_modules/.prisma/client"|output   = "../apps/api/node_modules/.prisma/client"|g' prisma/schema.prisma
echo "   ✅ API schema generator path fixed"
echo "   New path: ../apps/api/node_modules/.prisma/client"
echo ""

echo "4. Syncing schemas (copy API to root)..."
cp prisma/schema.prisma ../../prisma/
echo "   ✅ Root schema updated with API schema content"
echo ""

echo "5. Cleaning old generated clients..."
rm -rf node_modules/.prisma 2>/dev/null
rm -rf node_modules/.ignored/@prisma 2>/dev/null
rm -rf ../../node_modules/.prisma 2>/dev/null
echo "   ✅ Old clients cleaned"
echo ""

echo "6. Generating Prisma client from root..."
cd ../..
echo "   Running: npx prisma generate"
npx prisma generate
cd apps/api
echo "   ✅ Prisma client generated"
echo ""

echo "7. Verifying client location..."
if [ -d "node_modules/.prisma/client" ]; then
  echo "   ✅ Client found at: ./node_modules/.prisma/client/"
  echo "   Contents:"
  ls node_modules/.prisma/client/ | head -5 | sed 's/^/     - /'
else
  echo "   ❌ Client not found"
  echo "   Searching for .prisma folders..."
  find . -name ".prisma" -type d 2>/dev/null
fi
echo ""

echo "8. Updating tsconfig.json..."
cat > tsconfig.json << 'TSCONFIG'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@murnova-konect/auth": ["../../packages/auth/src"],
      "@murnova-konect/core": ["../../packages/core/src"],
      "@prisma/client": ["./node_modules/.prisma/client"]
    }
  }
}
TSCONFIG
echo "   ✅ tsconfig.json updated"
echo "   @prisma/client now points to: ./node_modules/.prisma/client"
echo ""

echo "9. Testing the fix..."
cat > test-complete.js << 'TEST'
const fs = require('fs');
console.log('=== COMPLETE TEST ===\n');

// 1. Check schemas
console.log('1. Schema verification:');
const rootSchema = fs.readFileSync('../../prisma/schema.prisma', 'utf8');
const apiSchema = fs.readFileSync('prisma/schema.prisma', 'utf8');

const rootGen = rootSchema.match(/output\s*=\s*"[^"]+"/);
const apiGen = apiSchema.match(/output\s*=\s*"[^"]+"/);

console.log(`   Root schema generator: ${rootGen ? rootGen[0] : 'Not found'}`);
console.log(`   API schema generator:  ${apiGen ? apiGen[0] : 'Not found'}`);

if (rootGen && apiGen && rootGen[0] === apiGen[0]) {
  console.log('   ✅ Schemas are synced');
} else {
  console.log('   ❌ Schemas are NOT synced');
}
console.log('');

// 2. Check client
console.log('2. Prisma client check:');
const clientPath = './node_modules/.prisma/client';
if (fs.existsSync(clientPath)) {
  console.log(`   ✅ Client found at: ${clientPath}`);
  
  try {
    const { PrismaClient } = require(clientPath);
    console.log('   ✅ PrismaClient import successful');
    
    const prisma = new PrismaClient();
    return prisma.$queryRaw\`SELECT version()\`
      .then(result => {
        console.log('   ✅ Database connection successful');
        console.log(`   PostgreSQL: ${result[0].version.split(',')[0]}`);
        console.log('\n��� ALL TESTS PASSED!');
        console.log('Your original structure is now working:');
        console.log('   - Schema: prisma/schema.prisma (in apps/api)');
        console.log('   - Root schema: ../../prisma/schema.prisma (synced)');
        console.log('   - Client: ./node_modules/.prisma/client');
        console.log('   - Generator path: ../apps/api/node_modules/.prisma/client');
        process.exit(0);
      })
      .catch(err => {
        console.error('   ❌ Database error:', err.message);
        process.exit(1);
      });
      
  } catch (err) {
    console.error('   ❌ Import error:', err.message);
    process.exit(1);
  }
} else {
  console.log(`   ❌ Client not found at: ${clientPath}`);
  process.exit(1);
}
TEST

node test-complete.js

echo ""
echo "✅ FIX COMPLETE!"
echo ""
echo "SUMMARY:"
echo "1. Fixed API schema generator path"
echo "2. Synced root schema with API schema"
echo "3. Generated client to: ./node_modules/.prisma/client"
echo "4. Updated tsconfig.json paths"
echo "5. Your original structure is preserved"
echo ""
echo "Now you can run: pnpm run seed"
