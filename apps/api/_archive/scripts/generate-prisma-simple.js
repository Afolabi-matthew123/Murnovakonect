const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Ì¥ß Generating Prisma client (simple approach)...');

try {
  // Use the local schema with explicit path
  const prismaPath = path.join(__dirname, 'node_modules', '.bin', 'prisma');
  const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
  
  console.log('Using schema:', schemaPath);
  console.log('Using Prisma:', prismaPath);
  
  // Generate with local schema
  execSync(`"${prismaPath}" generate --schema "${schemaPath}"`, {
    stdio: 'inherit',
    shell: true
  });
  
  console.log('‚úÖ Prisma client generated!');
  
  // Check if client was created
  const clientDir = path.join(__dirname, 'node_modules', '.prisma', 'client');
  if (fs.existsSync(clientDir)) {
    const files = fs.readdirSync(clientDir);
    console.log('‚úÖ Client files:', files.join(', '));
  } else {
    console.log('‚ùå Client directory not found at:', clientDir);
  }
} catch (error) {
  console.error('‚ùå Generation failed:', error.message);
}
