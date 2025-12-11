const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Testing server startup...\n');

// Try to start the server with a short timeout
const server = spawn('pnpm', ['run', 'start:dev'], {
  stdio: 'pipe',
  shell: true
});

let output = '';
let error = '';

server.stdout.on('data', (data) => {
  output += data.toString();
  console.log('STDOUT:', data.toString().trim());
});

server.stderr.on('data', (data) => {
  error += data.toString();
  console.log('STDERR:', data.toString().trim());
});

// Wait 10 seconds then kill
setTimeout(() => {
  server.kill();
  
  console.log('\n=== Server Output Summary ===');
  console.log('Output length:', output.length);
  console.log('Error length:', error.length);
  
  if (output.includes('Nest application successfully started')) {
    console.log('\n✅ Server started successfully!');
    console.log('You should now be able to test endpoints.');
  } else if (error.includes('Error') || error.includes('error')) {
    console.log('\n❌ Server failed to start with error:');
    console.log(error.substring(error.lastIndexOf('Error'), error.length).substring(0, 500));
  } else {
    console.log('\n⚠️  Server output did not show successful startup');
    console.log('Last 500 chars of output:');
    console.log(output.substring(Math.max(0, output.length - 500), output.length));
  }
  
  process.exit(0);
}, 10000);
