console.log('Testing Prisma Client v6.19.0...');

try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ Prisma Client imported successfully');
  
  const prisma = new PrismaClient();
  console.log('✅ Prisma Client instantiated successfully');
  
  // Test a simple query
  prisma.school.findMany()
    .then(schools => {
      console.log('✅ Database query successful. Schools found:', schools.length);
      return prisma.$disconnect();
    })
    .then(() => {
      console.log('✅ Prisma disconnected successfully');
    })
    .catch(error => {
      console.error('❌ Database query failed:', error.message);
    });
} catch (error) {
  console.error('❌ Prisma Client import failed:', error.message);
}
