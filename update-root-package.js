const fs = require('fs');
const path = require('path');

const packagePath = path.resolve('package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Add Prisma to root devDependencies
packageJson.devDependencies = packageJson.devDependencies || {};
packageJson.devDependencies.prisma = "6.19.0";
packageJson.devDependencies["@prisma/client"] = "6.19.0";

// Add Prisma scripts
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts["prisma:generate"] = "prisma generate";
packageJson.scripts["prisma:migrate"] = "prisma migrate dev";
packageJson.scripts["prisma:studio"] = "prisma studio";
packageJson.scripts["prisma:reset"] = "prisma migrate reset --force";

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log('✅ Added Prisma to root package.json');
console.log('   Now root can generate Prisma client for all apps');
