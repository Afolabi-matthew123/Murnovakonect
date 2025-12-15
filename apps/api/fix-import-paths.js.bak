const fs = require('fs');
const path = require('path');

console.log('Ì¥ß FIXING IMPORT PATHS...\n');

const pathFixes = [
  // From common/guards/ to database/ = ../database/
  { 
    files: ['src/common/guards/permissions.guard.ts'],
    from: '../database/prisma.service',
    to: '../../database/prisma.service'
  },
  
  // From modules/*/ to database/ = ../../database/
  {
    files: [
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
    ],
    from: '../database/',
    to: '../../database/'
  }
];

let totalFixed = 0;

pathFixes.forEach(fixGroup => {
  fixGroup.files.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Replace the import path
      content = content.replace(new RegExp(fixGroup.from, 'g'), fixGroup.to);
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`‚úÖ Fixed path in: ${file}`);
        totalFixed++;
      }
    } else {
      console.log(`‚ö†Ô∏è  File not found: ${file}`);
    }
  });
});

console.log(`\nÌæØ Fixed ${totalFixed} files`);
console.log(`Ì∫Ä Now let's fix TypeScript configuration...`);
