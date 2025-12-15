const fs = require('fs');
const path = require('path');

console.log('Ì¥ß FIXING IMPORT SYNTAX ERRORS IN 17 FILES...\n');

// These are the exact files from your build error
const filesToFix = [
  'src/common/guards/permissions.guard.ts',
  'src/modules/ai/ai.module.ts',
  'src/modules/auth/auth.module.ts',
  'src/modules/auth/auth.service.ts',
  'src/modules/auth/strategies/jwt.strategy.ts',
  'src/modules/domains/domains.module.ts',
  'src/modules/permissions/permissions.module.ts',
  'src/modules/permissions/permissions.service.ts',
  'src/modules/roles/roles.module.ts',
  'src/modules/roles/roles.service.ts',
  'src/modules/schools/schools.module.ts',
  'src/modules/schools/schools.service.ts',
  'src/modules/super-admin/super-admin.module.ts',
  'src/modules/tenancy/tenancy.module.ts',
  'src/modules/tenancy/tenancy.service.ts',
  'src/modules/users/users.module.ts',
  'src/modules/users/users.service.ts'
];

let fixedCount = 0;
let notFoundCount = 0;

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Fix the specific syntax error: "'; to ";
    content = content.replace(/from "([^"]+)"';/g, 'from "$1";');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`‚úÖ Fixed: ${file}`);
      fixedCount++;
    } else {
      console.log(`‚úÖ Already correct: ${file}`);
    }
  } else {
    console.log(`‚ùå File not found: ${file}`);
    notFoundCount++;
  }
});

console.log(`\nÌæØ FIX SUMMARY:`);
console.log(`   Files fixed: ${fixedCount}`);
console.log(`   Files not found: ${notFoundCount}`);
console.log(`   Total processed: ${filesToFix.length}`);
console.log(`\nÌ∫Ä Now run: pnpm run build`);
