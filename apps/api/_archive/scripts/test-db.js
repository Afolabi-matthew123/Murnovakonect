// Use dynamic import for Prisma Client in workspace setup
async function testDatabase() {
  try {
    // Import Prisma Client dynamically
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    console.log('Ì∑™ Testing database connection and operations...');
    
    // Test connection
    await prisma.$connect();
    console.log('‚úÖ Database connected successfully');
    
    // Test creating a school
    const testSchool = await prisma.school.create({
      data: {
        name: 'Test Academy',
        slug: 'test-academy',
        primaryColor: '#3B82F6'
      }
    });
    console.log('‚úÖ Test school created:', testSchool.name);
    
    // Test creating a user
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        displayName: 'Test User',
        password: 'hashed_password_here',
        schoolId: testSchool.id
      }
    });
    console.log('‚úÖ Test user created:', testUser.email);
    
    // Query to verify data
    const schools = await prisma.school.findMany();
    const users = await prisma.user.findMany();
    
    console.log('Ì≥ä Current schools:', schools.length);
    console.log('Ì≥ä Current users:', users.length);
    
    // Clean up test data
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.school.delete({ where: { id: testSchool.id } });
    console.log('‚úÖ Test data cleaned up');
    
    await prisma.$disconnect();
    console.log('Ìæâ All tests passed! Database is ready for development.');
    
  } catch (error) {
    console.log('‚ùå Error:', error.message);
    if (error.code) console.log('Error code:', error.code);
  }
}

testDatabase();
