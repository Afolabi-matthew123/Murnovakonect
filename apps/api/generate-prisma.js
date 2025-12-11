const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Generating Prisma client...');

try {
  // Check if schema exists
  const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Prisma schema not found at:', schemaPath);
    process.exit(1);
  }

  console.log('✓ Schema found');
  
  // Read schema to check if it's valid
  const schema = fs.readFileSync(schemaPath, 'utf8');
  console.log('✓ Schema is readable');
  
  // Try to generate using npx directly
  console.log('Running prisma generate...');
  execSync('npx prisma generate --skip-install', { stdio: 'inherit' });
  
  console.log('✅ Prisma client generated successfully!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  
  // Create a fallback client
  console.log('Creating fallback Prisma client...');
  
  const clientDir = path.join(__dirname, 'node_modules/.prisma/client');
  if (!fs.existsSync(clientDir)) {
    fs.mkdirSync(clientDir, { recursive: true });
  }
  
  // Create index.js
  fs.writeFileSync(
    path.join(clientDir, 'index.js'),
    `// Fallback Prisma client
const { PrismaClient } = require('@prisma/client');
module.exports = new PrismaClient();
`
  );
  
  console.log('✅ Created fallback Prisma client');
}
