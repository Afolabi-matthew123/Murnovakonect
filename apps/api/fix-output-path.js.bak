const fs = require('fs');
const path = require('path');

const schemaPath = path.resolve('../../prisma/schema.prisma');
let content = fs.readFileSync(schemaPath, 'utf8');

// For pnpm workspace, we need this exact path
content = content.replace(
  /output\s*=\s*".*"/,
  'output   = "../../apps/api/node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');
console.log('✅ Schema output path updated');
console.log('Output now: "../../apps/api/node_modules/.prisma/client"');
