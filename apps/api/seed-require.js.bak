// Direct require bypasses TypeScript import issues
const { PrismaClient } = require('./node_modules/.ignored/@prisma/client')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}

async function seed() {
  console.log('Starting seed via require...')
  const prisma = new PrismaClient()
  
  try {
    // Your seed logic here
    const hashedPassword = await hashPassword('admin123')
    
    console.log('Creating admin user...')
    const admin = await prisma.user.create({
      data: {
        email: 'superadmin@murnova.com',
        password: hashedPassword,
        userType: 'SUPER_ADMIN',
        isActive: true,
        emailVerified: true
      }
    })
    
    console.log('âœ… Admin created:', admin.email)
    console.log('âœ… Seed completed successfully!')
    
  } catch (error) {
    console.error('âŒ Seed error:', error.message)
    
    // Check database state
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('í³‹ Database tables:', tables.map(t => t.table_name))
    
  } finally {
    await prisma.$disconnect()
  }
}

seed()
