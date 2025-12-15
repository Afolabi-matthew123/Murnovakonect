const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Update all prisma scripts to remove the --schema flag or use correct path
const updatedScripts = {};
for (const [key, value] of Object.entries(packageJson.scripts)) {
  if (key.includes('prisma:')) {
    // Remove --schema flag since prisma will find schema.prisma in ./prisma
    updatedScripts[key] = value.replace(/ --schema=\.\.\/prisma\/schema\.prisma/g, '');
  } else {
    updatedScripts[key] = value;
  }
}

packageJson.scripts = updatedScripts;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Updated Prisma scripts');
console.log('\nUpdated scripts:');
Object.entries(updatedScripts)
  .filter(([key]) => key.includes('prisma:'))
  .forEach(([key, value]) => console.log(`  ${key}: ${value}`));
