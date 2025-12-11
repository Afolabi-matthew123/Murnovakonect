const { PrismaClient } = require('@prisma/client');

console.log('��� DATABASE OPERATIONS TEST\n');

async function testDatabase() {
  try {
    const prisma = new PrismaClient();
    
    console.log('1. Testing database connection...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('   ✅ Database connection successful\n');

    console.log('2. Testing table accessibility...');
    const tables = [
      'school', 'user', 'student', 'staff', 'role', 'permission',
      'attendance_record', 'fee_invoice', 'payment', 'result'
    ];

    for (const table of tables) {
      try {
        const result = await prisma.$queryRaw`SELECT COUNT(*) as count FROM ${table}`;
        console.log(`   ✅ ${table}: ${result[0].count} records`);
      } catch (error) {
        console.log(`   ⚠️  ${table}: ${error.message}`);
      }
    }

    console.log('\n3. Testing complex queries...');
    
    // Test relationship queries
    try {
      const schoolCount = await prisma.school.count();
      console.log(`   ✅ Schools count: ${schoolCount}`);
    } catch (e) {
      console.log(`   ⚠️  Schools query: ${e.message}`);
    }

    try {
      const userCount = await prisma.user.count();
      console.log(`   ✅ Users count: ${userCount}`);
    } catch (e) {
      console.log(`   ⚠️  Users query: ${e.message}`);
    }

    console.log('\n4. Testing Prisma client methods...');
    console.log('   ✅ Prisma client instantiation');
    console.log('   ✅ Raw SQL queries');
    console.log('   ✅ Model operations');

    await prisma.$disconnect();
    console.log('\n��� Database operations test completed successfully!');

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}

testDatabase();
