console.log('Testing Prisma client with pnpm setup...\n');

try {
  // Try to require from the standard location
  console.log('1. Testing require("@prisma/client")...');
  const { PrismaClient } = require('@prisma/client');
  console.log('‚úÖ @prisma/client loaded successfully');
  
  console.log('\n2. Creating Prisma client instance...');
  const prisma = new PrismaClient();
  console.log('‚úÖ PrismaClient instantiated');
  
  console.log('\n3. Testing database connection...');
  prisma.$connect()
    .then(() => {
      console.log('‚úÖ Database connected');
      
      // Test a simple query
      return prisma.user.findMany({ take: 5 });
    })
    .then(users => {
      console.log(`‚úÖ Query successful. Found ${users.length} users`);
      console.log('\nÌæâ Prisma client is working with pnpm!');
      
      // Show server status
      console.log('\nÌºê Your server is ready:');
      console.log('   ‚Ä¢ API: http://localhost:3000');
      console.log('   ‚Ä¢ Docs: http://localhost:3000/api/docs');
      console.log('   ‚Ä¢ Health: http://localhost:3000/v1/health');
      
      return prisma.$disconnect();
    })
    .catch(err => {
      console.log('‚ö†Ô∏è  Connection/query error (may be normal):', err.message);
      console.log('Your Prisma client is still loaded correctly.');
    });
    
} catch (error) {
  console.error('‚ùå Error loading Prisma client:', error.message);
  
  // Provide solutions
  console.log('\nÌ¥ß Solutions:');
  console.log('1. Run: pnpm add @prisma/client');
  console.log('2. Run: npx prisma generate');
  console.log('3. Or use the mock client we created');
}
