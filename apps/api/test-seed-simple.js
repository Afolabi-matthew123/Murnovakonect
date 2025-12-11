const { PrismaClient } = require('./node_modules/.prisma/client')
const bcrypt = require('bcrypt')

async function testSeed() {
  console.log('Testing seed functionality...\n')
  
  const prisma = new PrismaClient()
  
  try {
    // 1. Test connection
    console.log('1. Testing database connection...')
    const version = await prisma.$queryRaw`SELECT version()`
    console.log(`   âœ… Connected to: ${version[0].version.split(',')[0]}`)
    
    // 2. Check existing users
    console.log('\n2. Checking existing users...')
    const userCount = await prisma.user.count()
    console.log(`   Found ${userCount} users in database`)
    
    if (userCount === 0) {
      console.log('\n3. Creating admin user...')
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      const admin = await prisma.user.create({
        data: {
          email: 'superadmin@murnova.com',
          password: hashedPassword,
          userType: 'SUPER_ADMIN',
          isActive: true,
          emailVerified: true
        }
      })
      
      console.log(`   âœ… Admin created: ${admin.email}`)
      console.log(`   User ID: ${admin.id}`)
    } else {
      console.log('\n3. Database already has users')
      const users = await prisma.user.findMany({
        select: { email: true, userType: true },
        take: 5
      })
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.userType})`)
      })
    }
    
    console.log('\ní¾‰ SEED TEST SUCCESSFUL!')
    console.log('Your database is ready.')
    
  } catch (error) {
    console.error('\nâŒ Seed error:', error.message)
  } finally {
    await prisma.$disconnect()
    console.log('\ní´Œ Disconnected from database')
  }
}

testSeed()
