const http = require('http');

console.log('Final test of multi-identifier auth with permanent fixes...\n');

const tests = [
  { 
    name: 'Email Registration', 
    path: '/v1/auth/register',
    data: { email: 'pe('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(\`   Status: \${res.statusCode}\`);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (parsed.message) {
            console.log(\`   Message: \${parsed.message}\`);
          }
          if (parsed.user) {
            console.log(\`   User created: \${parsed.user.email || parsed.user.phone}\`);
          }
          if (parsed.statusCode >= 400) {
            console.log(\`   Error: \${parsed.error || parsed.message}\`);
          }
        } catch (e) {
          console.log(\`   Response: \${data.substring(0, 100)}\`);
        }
      }
      
      testIndex++;
      setTimeout(runNextTest, 1000);
    });
  });
  
  req.on('error', (err) => {
    console.log(\`   Error: \${err.message}\`);
    testIndex++;
    setTimeout(runNextTest, 1000);
  });
  
  req.write(postData);
  req.end();
}

// Wait for server to be ready
setTimeout(runNextTest, 2000);
