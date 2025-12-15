const fs = require('fs');

console.log('Ì¥ß FIXING TYPE ERRORS PROPERLY...\n');

const errorFixes = [
  {
    file: 'src/modules/auth/auth.service.ts',
    fixes: [
      { from: 'error.stack', to: '(error as Error).stack' },
      { from: 'error.message', to: '(error as Error).message' }
    ]
  },
  {
    file: 'src/modules/health/prisma.health-indicator.ts', 
    fixes: [
      { from: 'error.message', to: '(error as Error).message' }
    ]
  },
  {
    file: 'src/modules/health/redis.health-indicator.ts',
    fixes: [
      { from: 'error.message', to: '(error as Error).message' }
    ]
  },
  {
    file: 'src/modules/permissions/permissions.service.ts',
    fixes: [
      { from: 'error.stack', to: '(error as Error).stack' }
    ]
  },
  {
    file: 'src/modules/roles/roles.service.ts',
    fixes: [
      { from: 'error.stack', to: '(error as Error).stack' }
    ]
  },
  {
    file: 'src/modules/schools/schools.service.ts',
    fixes: [
      { from: 'error.stack', to: '(error as Error).stack' }
    ]
  },
  {
    file: 'src/modules/tenancy/tenancy.service.ts',
    fixes: [
      { from: 'error.stack', to: '(error as Error).stack' }
    ]
  },
  {
    file: 'src/modules/users/users.service.ts',
    fixes: [
      { from: 'error.stack', to: '(error as Error).stack' }
    ]
  }
];

errorFixes.forEach(({ file, fixes }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    fixes.forEach(({ from, to }) => {
      content = content.replace(new RegExp(from, 'g'), to);
    });
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`‚úÖ Fixed types in: ${file}`);
  } else {
    console.log(`‚ö†Ô∏è  File not found: ${file}`);
  }
});
