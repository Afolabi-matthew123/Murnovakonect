console.log('í·ª DATABASE TEST (Fixed Version)\n');

// Use the same approach as our working PrismaService
async function testDatabase() {
  try {
    console.log('1. Testing with delayed initialization...');
    
    // Add a small delay before requiring Prisma
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const { PrismaClient } = require('@prisma/client');
    console.log('   âœ… PrismaClient loaded');
    
    const prisma = new PrismaClient();
    console.log('   âœ… PrismaClient instantiated');
    
    // Test connection with retry
    let connected = false;
    let attempts = 0;
    
    while (!connected && attempts < 3) {
      try {
        await prisma.$queryRaw`SELECT 1`;
        connected = true;
        console.log('   âœ… Database connection successful');
      } catch (error) {
        attempts++;
        console.log(`   âš ï¸  Connection attempt ${attempts} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    if (connected) {
      console.log('\n2. Testing table counts...');
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log(`   âœ… Database has ${tables.length} tables`);
      
      console.log('\ní¾‰ Database is fully operational!');
    } else {
      console.log('\nâŒ Could not establish database connection');
    }
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.log('âŒ Database test failed:', error.message);
  }
}

testDatabase();
