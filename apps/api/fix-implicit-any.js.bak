const fs = require('fs');

console.log('Ì¥ß FIXING IMPLICIT ANY TYPES...\n');

const implicitAnyFixes = [
  {
    file: 'src/common/guards/permissions.guard.ts',
    fixes: [
      { from: 'userRole =>', to: 'userRole: any =>' },
      { from: 'permission =>', to: 'permission: any =>' }
    ]
  },
  {
    file: 'src/modules/auth/strategies/jwt.strategy.ts',
    fixes: [
      { from: 'role =>', to: 'role: any =>' },
      { from: 'p =>', to: 'p: any =>' }
    ]
  }
];

implicitAnyFixes.forEach(({ file, fixes }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    fixes.forEach(({ from, to }) => {
      content = content.replace(new RegExp(from, 'g'), to);
    });
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`‚úÖ Fixed implicit any in: ${file}`);
  } else {
    console.log(`‚ö†Ô∏è  File not found: ${file}`);
  }
});
