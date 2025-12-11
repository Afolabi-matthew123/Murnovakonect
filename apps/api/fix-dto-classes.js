const fs = require('fs');

console.log('Ì¥ß FIXING DTO CLASSES...\n');

const dtoFixes = [
  {
    file: 'src/modules/auth/dto/login.dto.ts',
    fixes: [
      { from: 'email: string;', to: 'email!: string;' },
      { from: 'password: string;', to: 'password!: string;' }
    ]
  },
  {
    file: 'src/modules/auth/dto/refresh-token.dto.ts', 
    fixes: [
      { from: 'refreshToken: string;', to: 'refreshToken!: string;' }
    ]
  },
  {
    file: 'src/modules/auth/dto/register.dto.ts',
    fixes: [
      { from: 'email: string;', to: 'email!: string;' },
      { from: 'password: string;', to: 'password!: string;' }
    ]
  },
  {
    file: 'src/modules/schools/dto/create-school.dto.ts',
    fixes: [
      { from: 'name: string;', to: 'name!: string;' },
      { from: 'slug: string;', to: 'slug!: string;' }
    ]
  }
];

dtoFixes.forEach(({ file, fixes }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    fixes.forEach(({ from, to }) => {
      content = content.replace(new RegExp(from, 'g'), to);
    });
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`‚úÖ Fixed DTO: ${file}`);
  } else {
    console.log(`‚ö†Ô∏è  File not found: ${file}`);
  }
});
