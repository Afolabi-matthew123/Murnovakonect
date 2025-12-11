console.log('Testing Prisma symlink...\n');

try {
  console.log('1. Testing require("@prisma/client")...');
  const { PrismaClient } = require('@prisma/client');
  console.log('âœ… require("@prisma/client") works');
  
  console.log('\n2. Testing PrismaClient instantiation...');
  const prisma = new PrismaClient();
  console.log('âœ… PrismaClient instantiated');
  
  console.log('\n3. Testing models...');
  console.log('   user model:', typeof prisma.user);
  console.log('   school model:', typeof prisma.school);
  
  console.log('\ní¾‰ Prisma client is working!');
} catch (error) {
  console.error('âŒ Error:', error.message);
  console.error(error.stack);
  
  // Check what's actually there
  const fs = require('fs');
  const path = require('path');
  
  console.log('\nDebug info:');
  const checkPath = (p) => {
    try {
      if (fs.existsSync(p)) {
        const real = fs.realpathSync(p);
        console.log(`Path: ${p} -> ${real}`);
        if (fs.lstatSync(p).isSymbolicLink()) {
          console.log(`   Is symlink: YES`);
        }
      } else {
        console.log(`Path: ${p} - NOT EXISTS`);
      }
    } catch (e) {
      console.log(`Path: ${p} - ERROR: ${e.message}`);
    }
  };
  
  checkPath(path.join(__dirname, 'node_modules/.prisma/client'));
  checkPath(path.join(__dirname, 'node_modules/@prisma/client'));
}
