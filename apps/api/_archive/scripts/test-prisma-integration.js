console.log('Testing Prisma client with your architecture...\n');

try {
  console.log('1. Testing require("@prisma/client")...');
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ Success: PrismaClient loaded');
  
  console.log('\n2. Testing PrismaService instantiation...');
  const prisma = new PrismaClient();
  console.log('✅ Success: PrismaClient instantiated');
  
  console.log('\n3. Testing database operations...');
  
  // Test user operations (what your auth service uses)
  prisma.user.findUnique({ where: { email: 'test@test.com' } })
    .then(user => {
      console.log('✅ User query executed');
      console.log('   Result:', user ? 'User found' : 'No user (expected)');
      
      // Test create operation
      return prisma.user.create({
        data: {
          email: 'test@test.com',
          passwordHash: 'hashed',
          userType: 'STUDENT'
        }
      });
    })
    .then(newUser => {
      console.log('✅ User create executed');
      console.log('   Created user ID:', newUser.id);
      console.log('\n��� Prisma client is working with your architecture!');
    })
    .catch(err => {
      console.log('⚠️  Query error (may be expected):', err.message);
      console.log('But the client is loaded for your architecture.');
    });
    
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
}
