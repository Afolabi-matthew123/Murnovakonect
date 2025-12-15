const fs = require('fs');
const path = require('path');

const schemaPath = path.resolve('../../prisma/schema.prisma');
console.log('Updating schema at:', schemaPath);

let content = fs.readFileSync(schemaPath, 'utf8');

// For your architecture: schema at root, API app uses it
// Output should be to root node_modules, API will access via workspace
content = content.replace(
  /output\s*=\s*".*"/,
  'output   = "../node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');
console.log('✅ Schema updated for your architecture:');
console.log('   Schema: ../../prisma/schema.prisma');
console.log('   Output: ../node_modules/.prisma/client (root)');
console.log('   API accesses via: workspace symlinks');

// Show the change
console.log('\n=== Generator Section ===');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('generator client'));
console.log(lines.slice(start, start + 5).join('\n'));
