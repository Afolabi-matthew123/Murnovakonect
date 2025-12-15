console.log('Testing Prisma client on Windows...\n');

try {
  console.log('1. Testing require("@prisma/client")...');
  const { PrismaClient } = require('@prisma/client');
  console.log('‚úÖ require("@prisma/client") works');
  
  console.log('\n2. Testing PrismaClient instantiation...');
  const prisma = new PrismaClient();
  console.log('‚úÖ PrismaClient instantiated');
  
  console.log('\n3. Testing models...');
  console.log('   user:', typeof prisma.user);
  console.log('   user.findUnique:', typeof prisma.user.findUnique);
  console.log('   user.create:', typeof prisma.user.create);
  
  console.log('\n4. Testing mock queries...');
  
  // Test findUnique (used in login)
  prisma.user.findUnique({ where: { email: 'test@murnova.ai' } })
    .then(user => {
      console.log('   Login query:', user ? 'User found' : 'No user');
      
      // Test create (used in registration)
      return prisma.user.create({
        data: {
          email: 'new@test.com',
          password: 'hashedpassword',
          userType: 'STUDENT'
        }
      });
    })
    .then(newUser => {
      console.log('   Registration query: User created');
      console.log('\nÌæâ Prisma client is working!');
      console.log('Your PrismaService will now function.');
    })
    .catch(err => {
      console.log('   Query error (expected):', err.message);
      console.log('\n‚ö†Ô∏è Queries failed but client is loaded.');
    });
    
} catch (error) {
  console.error('‚ùå Error:', error.message);
}
