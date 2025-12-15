console.log('Testing Prisma client directly...');

// Test 1: Import from @prisma/client
try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ @prisma/client import successful');
  
  // Test instantiation
  const prisma = new PrismaClient();
  console.log('✅ PrismaClient instantiation successful');
  
  // Test connection
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connection successful');
      return prisma.$disconnect();
    })
    .then(() => {
      console.log('✅ Database disconnect successful');
    })
    .catch(error => {
      console.error('❌ Database connection failed:', error.message);
    });
      
} catch (e) {
  console.log('❌ @prisma/client import failed:', e.message);
}

// Test 2: Import from generated client
try {
  const { PrismaClient } = require('./node_modules/.prisma/client');
  console.log('✅ .prisma/client import successful');
} catch (e) {
  console.log('❌ .prisma/client import failed:', e.message);
}
