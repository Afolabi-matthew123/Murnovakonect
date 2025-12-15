const { PrismaClient } = require('@prisma/client')

console.log('Testing Prisma connection...')
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

async function test() {
  try {
    // Test basic query
    const result = await prisma.$queryRaw`SELECT version() as version`
    console.log('✅ Connection successful:', result[0].version)
    
    // Try to create a table
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS prisma_test (id SERIAL PRIMARY KEY, name TEXT)`
    console.log('✅ Table creation successful')
    
  } catch (error) {
    console.error('❌ Prisma error:', error.message)
    console.error('Full error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
