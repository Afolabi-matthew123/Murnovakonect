#!/bin/bash
echo "Creating fixed seed.ts..."

# Backup
cp src/modules/seed/seed.ts src/modules/seed/seed.ts.original

# Create a simple, working seed.ts
cat > src/modules/seed/seed.ts << 'SEED'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

async function main() {
  console.log('í¼± Starting Murnova SAAS database seed...')
  console.log('=======================================\n')

  try {
    // 1. Clear existing data
    console.log('1. Clearing existing data...')
    await prisma.user.deleteMany()
    await prisma.role.deleteMany()
    await prisma.school.deleteMany()
    console.log('   âœ… Data cleared\n')

    // 2. Create Super Admin (NO emailVerified - it's not in your schema!)
    console.log('2. Creating Super Administrator...')
    const hashedPassword = await hashPassword('admin123')
    
    const admin = await prisma.user.create({
      data: {
        email: 'superadmin@murnova.com',
        password: hashedPassword,
        userType: 'SUPER_ADMIN',
        isActive: true,
        displayName: 'Super Admin'
      }
    })
    console.log(`   âœ… Admin created: ${admin.email}\n`)

    // 3. Create default roles
    console.log('3. Creating default roles...')
    const roles = [
      { name: 'SUPER_ADMIN', description: 'Platform super administrator' },
      { name: 'SCHOOL_ADMIN', description: 'School administrator' },
      { name: 'TEACHER', description: 'Teaching staff' },
      { name: 'BURSAR', description: 'Financial officer' },
      { name: 'PARENT', description: 'Student parent/guardian' },
      { name: 'STUDENT', description: 'Student user' }
    ]

    for (const role of roles) {
      await prisma.role.create({ data: role })
      console.log(`   - ${role.name}`)
    }
    console.log('   âœ… Roles created\n')

    // 4. Create demo school
    console.log('4. Creating demo school...')
    const school = await prisma.school.create({
      data: {
        name: 'Goldsworth International School',
        slug: 'goldsworth',
        isActive: true,
        branding: {
          create: {
            primaryColor: '#1E40AF',
            secondaryColor: '#047857',
            motto: 'Excellence in Education',
            tagline: 'Shaping Future Leaders'
          }
        }
      }
    })
    console.log(`   âœ… School created: ${school.name} (${school.slug})\n`)

    console.log('í¾‰ SEED COMPLETED SUCCESSFULLY!')
    console.log('===============================')
    console.log('Super Admin: superadmin@murnova.com')
    console.log('Password: admin123')
    console.log('Demo School: goldsworth')
    console.log('\nYour Murnova SAAS database is ready! í¿«íº€')

  } catch (error) {
    console.error('âŒ Seed error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Execute
main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(() => {
    console.log('ï¿½ï¿½ Prisma disconnected')
    process.exit(0)
  })
SEED

echo "âœ… Created fixed seed.ts"
echo "Now test it: npx ts-node --project tsconfig.json src/modules/seed/seed.ts"
