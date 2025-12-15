const fs = require('fs');

console.log('Ì¥ß FIXING ARROW FUNCTION SYNTAX PROPERLY...\n');

const fixes = [
  {
    file: 'src/common/guards/permissions.guard.ts',
    corrections: [
      // Fix: userRole: any => should be (userRole: any) =>
      { from: 'userRole: any =>', to: '(userRole: any) =>' },
      // Fix: permission: any => should be (permission: any) =>
      { from: 'permission: any =>', to: '(permission: any) =>' }
    ]
  },
  {
    file: 'src/modules/auth/strategies/jwt.strategy.ts',
    corrections: [
      // Fix: role: any => should be (role: any) =>
      { from: 'role: any =>', to: '(role: any) =>' },
      // Fix: p: any => should be (p: any) =>
      { from: 'p: any =>', to: '(p: any) =>' }
    ]
  }
];

fixes.forEach(({ file, corrections }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    corrections.forEach(({ from, to }) => {
      content = content.replace(new RegExp(from, 'g'), to);
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`‚úÖ Fixed syntax in: ${file}`);
    }
  } else {
    console.log(`‚ùå File not found: ${file}`);
  }
});

console.log('\nÌæØ ARROW FUNCTION SYNTAX FIXED!');
console.log('Ì∫Ä Now run: pnpm run build');
