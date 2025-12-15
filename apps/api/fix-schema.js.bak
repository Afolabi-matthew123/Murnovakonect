const fs = require('fs');
const path = require('path');

const schemaPath = path.resolve('../../prisma/schema.prisma');
console.log('Fixing schema at:', schemaPath);

let content = fs.readFileSync(schemaPath, 'utf8');

// Update output path for pnpm workspace
content = content.replace(
  'output   = "../node_modules/.prisma/client"',
  'output   = "../../apps/api/node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');
console.log('✅ Updated output path for pnpm workspace');
console.log('   Old: "../node_modules/.prisma/client"');
console.log('   New: "../../apps/api/node_modules/.prisma/client"');
