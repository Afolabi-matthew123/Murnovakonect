const fs = require('fs');
const path = require('path');

const schemaPath = path.resolve('prisma/schema.prisma');
let content = fs.readFileSync(schemaPath, 'utf8');

// For pnpm workspace with hoisting, output to root
content = content.replace(
  /output\s*=\s*".*"/,
  'output   = "../node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');

console.log('✅ Schema configured for pnpm workspace:');
console.log('   Output: ../node_modules/.prisma/client');
console.log('   Reason: pnpm hoisting makes it available to all apps');
