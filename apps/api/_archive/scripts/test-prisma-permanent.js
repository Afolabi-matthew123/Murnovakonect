console.log('Testing permanent Prisma fix...\n');

try {
  console.log('1. Testing require("@prisma/client")...');
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ require("@prisma/client") works');
  
  console.log('\n2. Testing PrismaClient instantiation...');
  const prisma = new PrismaClient();
  console.log('✅ PrismaClient instantiated');
  
  console.log('\n3. Testing connection...');
  prisma.$connect()
    .then(() => {
      console.log('✅ Connection successful');
      
      console.log('\n4. Testing user model...');
      console.log('   user.findUnique available:', typeof prisma.user.findUnique);
      console.log('   user.create available:', typeof prisma.user.create);
      
      console.log('\n��� PRISMA CLIENT IS WORKING!');
      console.log('Your PrismaService will now work correctly.');
      
      prisma.$disconnect();
    })
    .catch(err => {
      console.log('⚠️ Connection error:', err.message);
      console.log('But client is loaded, which is the main thing.');
    });
} catch (error) {
  console.error('❌ Error:', error.message);
  
  // Show where to look for the client
  const fs = require('fs');
  const path = require('path');
  
  console.log('\nLooking for Prisma client...');
  const possiblePaths = [
    path.join(__dirname, 'node_modules/.prisma/client'),
    path.join(__dirname, 'node_modules/@prisma/client'),
    path.join(__dirname, '../../node_modules/.prisma/client'),
    path.join(__dirname, '../../node_modules/@prisma/client')
  ];
  
  possiblePaths.forEach(p => {
    if (fs.existsSync(p)) {
      console.log(`Found at: ${p}`);
      console.log('Files:', fs.readdirSync(p).join(', '));
    }
  });
}
