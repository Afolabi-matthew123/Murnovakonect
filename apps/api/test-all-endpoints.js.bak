const http = require('http');

console.log('Ì∑™ COMPREHENSIVE BACKEND API TEST\n');

const endpoints = [
  // Core endpoints
  { path: '/', method: 'GET', description: 'Root endpoint' },
  { path: '/health', method: 'GET', description: 'Health check' },
  
  // API versioned endpoints
  { path: '/api/v1/', method: 'GET', description: 'API v1 root' },
  { path: '/api/v1/health', method: 'GET', description: 'API v1 health' },
  
  // Documentation
  { path: '/api/docs', method: 'GET', description: 'Swagger documentation' },
  { path: '/api/docs-json', method: 'GET', description: 'Swagger JSON' },
  
  // Potential module endpoints
  { path: '/api/v1/auth', method: 'GET', description: 'Auth module' },
  { path: '/api/v1/schools', method: 'GET', description: 'Schools module' },
  { path: '/api/v1/users', method: 'GET', description: 'Users module' },
  { path: '/api/v1/students', method: 'GET', description: 'Students module' },
  { path: '/api/v1/roles', method: 'GET', description: 'Roles module' },
  { path: '/api/v1/permissions', method: 'GET', description: 'Permissions module' },
];

let completed = 0;
let successful = 0;

function testEndpoint({ path, method, description }) {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: method,
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const status = res.statusCode < 400 ? '‚úÖ' : '‚ö†Ô∏è';
      if (res.statusCode < 400) successful++;
      
      console.log(`${status} ${description}`);
      console.log(`   URL: http://localhost:3000${path}`);
      console.log(`   Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        try {
          const json = JSON.parse(data);
          console.log(`   Response: ${JSON.stringify(json).substring(0, 80)}...`);
        } catch {
          console.log(`   Response: ${data.substring(0, 80)}...`);
        }
      }
      console.log('');
      
      completed++;
      checkCompletion();
    });
  });

  req.on('error', (err) => {
    console.log(`‚ùå ${description}`);
    console.log(`   URL: http://localhost:3000${path}`);
    console.log(`   Error: ${err.message}`);
    console.log('');
    
    completed++;
    checkCompletion();
  });

  req.on('timeout', () => {
    console.log(`‚è∞ ${description} - TIMEOUT`);
    console.log(`   URL: http://localhost:3000${path}`);
    console.log('');
    
    req.destroy();
    completed++;
    checkCompletion();
  });

  req.end();
}

function checkCompletion() {
  if (completed === endpoints.length) {
    console.log('=' .repeat(50));
    console.log(`ÌæØ TEST SUMMARY:`);
    console.log(`   Total endpoints tested: ${endpoints.length}`);
    console.log(`   Successful responses: ${successful}`);
    console.log(`   Success rate: ${Math.round((successful / endpoints.length) * 100)}%`);
    console.log('');
    console.log('Ì∫Ä Backend API Testing Complete!');
  }
}

// Run all tests
endpoints.forEach(testEndpoint);
