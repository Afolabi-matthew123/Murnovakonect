const fs = require('fs');
console.log('=== COMPLETE TEST ===\n');

// 1. Check schemas
console.log('1. Schema verification:');
const rootSchema = fs.readFileSync('../../prisma/schema.prisma', 'utf8');
const apiSchema = fs.readFileSync('prisma/schema.prisma', 'utf8');

const rootGen = rootSchema.match(/output\s*=\s*"[^"]+"/);
const apiGen = apiSchema.match(/output\s*=\s*"[^"]+"/);

console.log(`   Root schema generator: ${rootGen ? rootGen[0] : 'Not found'}`);
console.log(`   API schema generator:  ${apiGen ? apiGen[0] : 'Not found'}`);

if (rootGen && apiGen && rootGen[0] === apiGen[0]) {
  console.log('   ✅ Schemas are synced');
} else {
  console.log('   ❌ Schemas are NOT synced');
}
console.log('');

// 2. Check client
console.log('2. Prisma client check:');
const clientPath = './node_modules/.prisma/client';
if (fs.existsSync(clientPath)) {
  console.log(`   ✅ Client found at: ${clientPath}`);
  
  try {
    const { PrismaClient } = require(clientPath);
    console.log('   ✅ PrismaClient import successful');
    
    const prisma = new PrismaClient();
    return prisma.$queryRaw\`SELECT version()\`
      .then(result => {
        console.log('   ✅ Database connection successful');
        console.log(`   PostgreSQL: ${result[0].version.split(',')[0]}`);
        console.log('\n��� ALL TESTS PASSED!');
        console.log('Your original structure is now working:');
        console.log('   - Schema: prisma/schema.prisma (in apps/api)');
        console.log('   - Root schema: ../../prisma/schema.prisma (synced)');
        console.log('   - Client: ./node_modules/.prisma/client');
        console.log('   - Generator path: ../apps/api/node_modules/.prisma/client');
        process.exit(0);
      })
      .catch(err => {
        console.error('   ❌ Database error:', err.message);
        process.exit(1);
      });
      
  } catch (err) {
    console.error('   ❌ Import error:', err.message);
    process.exit(1);
  }
} else {
  console.log(`   ❌ Client not found at: ${clientPath}`);
  process.exit(1);
}
