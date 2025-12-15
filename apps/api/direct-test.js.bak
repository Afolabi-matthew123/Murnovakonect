const http = require('http');

console.log('Testing server directly...\n');

// Test 1: Health endpoint
console.log('1. Testing /health endpoint:');
http.get('http://localhost:3000/health', (res) => {
  console.log(`   Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`   Response: ${data || '(empty)'}`);
    
    // Test 2: Auth register
    console.log('\n2. Testing /v1/auth/register:');
    const postData = JSON.stringify({
      email: 'direct@test.com',
      password: 'DirectPass123!',
      userType: 'STUDENT'
    });
    
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/v1/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res2) => {
      console.log(`   Status: ${res2.statusCode}`);
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => {
        console.log(`   Response: ${data2 || '(empty)'}`);
        
        // Test 3: Try without /v1 prefix
        console.log('\n3. Testing /auth/register (without v1):');
        const req3 = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/auth/register',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
          }
        }, (res3) => {
          console.log(`   Status: ${res3.statusCode}`);
          let data3 = '';
          res3.on('data', chunk => data3 += chunk);
          res3.on('end', () => {
            console.log(`   Response: ${data3 || '(empty)'}`);
          });
        });
        req3.write(postData);
        req3.end();
      });
    });
    
    req.write(postData);
    req.end();
  });
}).on('error', (err) => {
  console.log(`   Error: ${err.message}`);
});
