const { spawn } = require('child_process');

console.log('íº€ Starting Your Original Architecture Server');
console.log('Features:');
console.log('â€¢ Passport LocalStrategy & JwtStrategy');
console.log('â€¢ Multi-identifier auth (email OR phone)');
console.log('â€¢ Prisma ORM with lazy loading');
console.log('â€¢ JWT authentication\n');

const server = spawn('npx', ['ts-node-dev', '--respawn', '--transpile-only', 'src/main.ts'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\ní»‘ Stopping server...');
  server.kill();
  process.exit();
});
