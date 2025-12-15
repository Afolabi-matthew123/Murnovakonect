const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Update prisma commands to use relative paths correctly
packageJson.scripts = {
  ...packageJson.scripts,
  "prisma:generate": "prisma generate --schema=../prisma/schema.prisma",
  "prisma:migrate:dev": "prisma migrate dev --schema=../prisma/schema.prisma --name init",
  "prisma:db:push": "prisma db push --schema=../prisma/schema.prisma",
  "prisma:studio": "prisma studio --schema=../prisma/schema.prisma",
  "prisma:reset": "prisma migrate reset --schema=../prisma/schema.prisma --force",
  "db:setup": "pnpm prisma:generate && pnpm prisma:db:push && pnpm seed"
};

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json with correct Prisma paths');
console.log('   Note: Using ../prisma/schema.prisma instead of ../../prisma/schema.prisma');
