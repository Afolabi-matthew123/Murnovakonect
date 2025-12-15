const { PrismaClient } = require('./node_modules/.prisma/client')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

async function seed() {
  console.log('Ìº± MURNOVA SAAS SEED - BASED ON ACTUAL SCHEMA')
  console.log('=============================================\n')
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  })
  
  try {
    // 1. Test connection
    console.log('1. Testing database connection...')
    const version = await prisma.$queryRaw`SELECT version()`
    console.log(`   ‚úÖ PostgreSQL: ${version[0].version.split(',')[0]}`)
    
    // 2. Check existing data
    console.log('\n2. Checking existing data...')
    const userCount = await prisma.user.count()
    const schoolCount = await prisma.school.count()
    const roleCount = await prisma.role.count()
    
    console.log(`   Users: ${userCount}`)
    console.log(`   Schools: ${schoolCount}`)
    console.log(`   Roles: ${roleCount}`)
    
    // 3. Only seed if empty
    if (userCount > 0) {
      console.log('\n‚úÖ Database already has data - skipping seed')
      console.log('   Run: npx prisma db push --force-reset to reset')
      return
    }
    
    console.log('\n3. Seeding database...')
    
    // Create Super Admin user (NO emailVerified field!)
    console.log('   Creating Super Admin...')
    const hashedPassword = await hashPassword('admin123')
    
    const admin = await prisma.user.create({
      data: {
        email: 'superadmin@murnova.com',
        password: hashedPassword,
        userType: 'SUPER_ADMIN',
        isActive: true,
        displayName: 'Super Administrator'
      }
    })
    
    console.log(`   ‚úÖ Admin created: ${admin.email}`)
    console.log(`   ID: ${admin.id}`)
    
    // Create default roles
    console.log('\n   Creating default roles...')
    const roles = [
      { name: 'SUPER_ADMIN', description: 'Platform super administrator' },
      { name: 'SCHOOL_ADMIN', description: 'School administrator' },
      { name: 'TEACHER', description: 'Teaching staff' },
      { name: 'BURSAR', description: 'Financial officer' },
      { name: 'PARENT', description: 'Student parent/guardian' },
      { name: 'STUDENT', description: 'Student user' }
    ]
    
    for (const role of roles) {
      await prisma.role.create({
        data: role
      })
      console.log(`     - ${role.name}`)
    }
    
    // Create a demo school
    console.log('\n   Creating demo school...')
    const school = await prisma.school.create({
      data: {
        name: 'Demo Academy',
        slug: 'demo-academy',
        isActive: true,
        branding: {
          create: {
            primaryColor: '#3B82F6',
            secondaryColor: '#10B981',
            motto: 'Education for Excellence'
          }
        }
      }
    })
    
    console.log(`   ‚úÖ School created: ${school.name}`)
    console.log(`   Slug: ${school.slug}`)
    
    console.log('\nÌæâ SEED COMPLETED SUCCESSFULLY!')
    console.log('================================')
    console.log('Super Admin: superadmin@murnova.com')
    console.log('Password: admin123')
    console.log('Demo School: demo-academy')
    console.log('\nYour Murnova SAAS is ready! Ìø´Ì∫Ä')
    
  } catch (error) {
    console.error('\n‚ùå SEED ERROR:', error.message)
    
    if (error.message.includes('Unknown argument')) {
      console.log('\nÌ≤° TIP: Your schema is missing fields your seed expects.')
      console.log('   Check that all fields in seed match your schema.prisma')
      console.log('   User model fields:')
      grep -A30 "model User {" prisma/schema.prisma | grep -E "^\s+\w+" | sed 's/^/     - /'
    }
    
  } finally {
    await prisma.$disconnect()
    console.log('\nÌ¥å Disconnected from database')
  }
}

// Run seed
seed()
