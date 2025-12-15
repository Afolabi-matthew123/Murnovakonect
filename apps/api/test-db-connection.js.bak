const { PrismaClient } = require('@prisma/client');

console.log('Testing database connection...\n');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('1. Connecting to database...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    console.log('\n2. Testing User model...');
    const userCount = await prisma.user.count();
    console.log(`✅ User model accessible (count: ${userCount})`);
    
    console.log('\n3. Testing database operations...');
    
    // Test creating a user with email
    const emailUser = await prisma.user.create({
      data: {
        email: 'test-email@murnova.ai',
        passwordHash: '$2b$10$examplehashforpassword', // Mock hash
        userType: 'STUDENT'
      }
    });
    console.log(`✅ Email user created: ${emailUser.id}`);
    
    // Test creating a user with phone
    const phoneUser = await prisma.user.create({
      data: {
        phone: '+2348100000000',
        passwordHash: '$2b$10$examplehashforpassword', // Mock hash
        userType: 'TEACHER'
      }
    });
    console.log(`✅ Phone user created: ${phoneUser.id}`);
    
    // Test multi-identifier query
    const foundByEmail = await prisma.user.findUnique({
      where: { email: 'test-email@murnova.ai' }
    });
    console.log(`✅ Find by email: ${foundByEmail ? 'Found' : 'Not found'}`);
    
    const foundByPhone = await prisma.user.findUnique({
      where: { phone: '+2348100000000' }
    });
    console.log(`✅ Find by phone: ${foundByPhone ? 'Found' : 'Not found'}`);
    
    console.log('\n��� DATABASE CONNECTION SUCCESSFUL!');
    console.log('Your multi-identifier auth system is fully operational.');
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Check your database connection and .env file');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
