const fs = require('fs');
const path = require('path');

const schemaPath = path.resolve('prisma/schema.prisma');
console.log('Updating root schema at:', schemaPath);

let content = fs.readFileSync(schemaPath, 'utf8');

// For pnpm workspace with monorepo, output should be in root
// All apps will access it via workspace symlinks
content = content.replace(
  /output\s*=\s*".*"/,
  'output   = "../node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');

console.log('✅ Root schema configured for monorepo:');
console.log('   Output: ../node_modules/.prisma/client');
console.log('   Reason: All apps share same Prisma client via pnpm workspace');

// Show final config
console.log('\n=== Final Generator Config ===');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('generator client'));
console.log(lines.slice(start, start + 5).join('\n'));
