console.log('Testing existing Prisma client...');

async function test() {
  try {
    // Try to use the existing Prisma client
    const { PrismaClient } = require('@prisma/client');
    console.log('✅ PrismaClient imported successfully');
    
    const prisma = new PrismaClient();
    console.log('✅ PrismaClient instance created');
    
    await prisma.$connect();
    console.log('✅ Connected to database');
    
    const schools = await prisma.school.findMany();
    console.log('✅ Database query successful. Schools found:', schools.length);
    
    await prisma.$disconnect();
    console.log('✅ Disconnected successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

test();
