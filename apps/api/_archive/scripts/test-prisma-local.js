const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  try {
    const prisma = new PrismaClient();
    console.log('Testing Prisma connection...');
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection successful:', result);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testConnection();
