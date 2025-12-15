const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../../prisma/schema.prisma');
console.log('Updating schema at:', schemaPath);

let content = fs.readFileSync(schemaPath, 'utf8');

// Change output to point to the API app's node_modules
content = content.replace(
  'output   = "../node_modules/.prisma/client"',
  'output   = "../../apps/api/node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');
console.log('✅ Updated output to: "../../apps/api/node_modules/.prisma/client"');
