console.log('Testing Prisma import with fixed paths...\n');

try {
  // Try the direct path
  const { PrismaClient } = require('./node_modules/.prisma/client');
  console.log('‚úÖ Successfully imported from ./node_modules/.prisma/client');
  
  const prisma = new PrismaClient();
  
  prisma.$queryRaw`SELECT 1`
    .then(() => {
      console.log('‚úÖ Database connection successful');
      console.log('\nÌæâ FIX COMPLETE!');
      console.log('Schema: prisma/schema.prisma (in apps/api)');
      console.log('Client: ./node_modules/.prisma/client');
      console.log('Generator path: ../apps/api/node_modules/.prisma/client');
      process.exit(0);
    })
    .catch(err => {
      console.error('‚ùå Database error:', err.message);
      console.log('\nÌ≤° Check if PostgreSQL is running: docker-compose up -d postgres');
      process.exit(1);
    });
    
} catch (err) {
  console.error('‚ùå Import error:', err.message);
  
  // Check all possible locations
  const fs = require('fs');
  console.log('\nChecking client locations:');
  const locations = [
    './node_modules/.prisma/client',
    '../apps/api/node_modules/.prisma/client',
    '../../node_modules/.prisma/client',
    './node_modules/.ignored/@prisma/client'
  ];
  
  locations.forEach(loc => {
    console.log(`  ${fs.existsSync(loc) ? '‚úÖ' : '‚ùå'} ${loc}`);
  });
  
  process.exit(1);
}
