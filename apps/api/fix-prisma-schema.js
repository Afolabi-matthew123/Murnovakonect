const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';

console.log("í´§ Fixing Prisma schema output path...");

let content = fs.readFileSync(schemaPath, 'utf8');

// Update the output path to point to apps/api/node_modules
content = content.replace(
  'output   = "../node_modules/.prisma/client"',
  'output   = "../../node_modules/.prisma/client"'
);

fs.writeFileSync(schemaPath, content, 'utf8');
console.log("âœ… Updated Prisma schema output path");
console.log("   New path: ../../node_modules/.prisma/client");
