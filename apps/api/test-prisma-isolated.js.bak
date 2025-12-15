console.log('Testing Prisma client in isolation...');

// Test if we can load the Prisma client at all
try {
  // Try different import methods
  console.log('Method 1: Direct require from @prisma/client');
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ Success with @prisma/client');
  
  console.log('Method 2: Direct require from generated client');
  const { PrismaClient: PrismaClient2 } = require('./node_modules/.prisma/client');
  console.log('✅ Success with .prisma/client');
  
  console.log('Method 3: Check if PrismaClient class exists');
  const PC = require('@prisma/client').PrismaClient;
  console.log('✅ PrismaClient class exists');
  
} catch (error) {
  console.error('❌ Prisma client loading failed:', error.message);
  console.error('Stack:', error.stack);
}
