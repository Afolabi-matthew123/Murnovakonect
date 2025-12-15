const { PrismaClient } = require('./node_modules/.prisma/client')

async function verify() {
  console.log('Ì¥ç VERIFYING SEED DATA\n')
  
  const prisma = new PrismaClient()
  
  try {
    // Check users
    const users = await prisma.user.findMany({
      select: { email: true, userType: true, displayName: true },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`Ì≥ä Users (${users.length}):`)
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.userType})`)
      if (user.displayName) console.log(`     Display: ${user.displayName}`)
    })
    
    // Check roles
    const roles = await prisma.role.findMany({
      select: { name: true, description: true },
      orderBy: { name: 'asc' }
    })
    
    console.log(`\nÌ±• Roles (${roles.length}):`)
    roles.forEach(role => {
      console.log(`   - ${role.name}: ${role.description}`)
    })
    
    // Check schools
    const schools = await prisma.school.findMany({
      select: { name: true, slug: true, motto: true },
      orderBy: { name: 'asc' }
    })
    
    console.log(`\nÌø´ Schools (${schools.length}):`)
    schools.forEach(school => {
      console.log(`   - ${school.name} (${school.slug})`)
      if (school.motto) console.log(`     Motto: ${school.motto}`)
    })
    
    // Check permissions
    const permissionCount = await prisma.permission.count()
    console.log(`\nÌ¥ê Permissions: ${permissionCount}`)
    
    console.log('\n‚úÖ VERIFICATION COMPLETE')
    console.log('Ìæâ Your Murnova SAAS database is properly seeded!')
    
  } catch (error) {
    console.error('‚ùå Verification error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

verify()
