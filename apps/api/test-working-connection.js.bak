console.log('Testing database connection with working import method...');

// Use the exact same import that worked in test-imports.js
try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ PrismaClient imported successfully');
  
  const prisma = new PrismaClient();
  console.log('✅ PrismaClient instance created');
  
  // Test connection
  prisma.$queryRaw`SELECT 1`
    .then(result => {
      console.log('✅ Database query successful:', result);
      prisma.$disconnect();
    })
    .catch(error => {
      console.error('❌ Database query failed:', error.message);
    });
      
} catch (error) {
  console.error('❌ Import failed:', error.message);
}
