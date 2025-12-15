const http = require('http');

console.log('í·ª TESTING DATABASE THROUGH API ENDPOINTS\n');

// Test endpoints that should use the database
const endpoints = [
  { path: '/health', description: 'Basic health check' },
  { path: '/health/database', description: 'Database health' },
  { path: '/api/v1/health', description: 'API health' },
];

endpoints.forEach(({ path, description }) => {
  http.get(`http://localhost:3000${path}`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`âœ… ${description}`);
      console.log(`   Status: ${res.statusCode}`);
      
      try {
        const json = JSON.parse(data);
        console.log(`   Response: ${JSON.stringify(json)}`);
      } catch {
        console.log(`   Response: ${data}`);
      }
      console.log('');
    });
  }).on('error', (err) => {
    console.log(`âŒ ${description}: ${err.message}`);
  });
});
