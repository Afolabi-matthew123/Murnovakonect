const http = require('http');

console.log('��� Testing Multi-Identifier Auth with Real Database\n');

const tests = [
  {
    name: 'Email Registration',
    data: {
      email: 'real-user-email@murnova.ai',
      password: 'RealPass123!',
      userType: 'STUDENT'
    }
  },
  {
    name: 'Phone Registration',
    data: {
      phone: '+2348111111111',
     aders: {
      'Content-Type': 'application/json'
    }
  };

  const postData = JSON.stringify(test.data);
  options.headers['Content-Length'] = Buffer.byteLength(postData);

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`   Status: ${res.statusCode}`);
      
      try {
        const response = JSON.parse(data);
        
        if (res.statusCode === 201 || res.statusCode === 200) {
          console.log(`   ✅ SUCCESS!`);
          console.log(`      User ID: ${response.user?.id || 'N/A'}`);
          console.log(`      ${test.data.email ? 'Email' : 'Phone'}: ${test.data.email || test.data.phone}`);
          if (response.accessToken) {
            console.log(`      JWT Token: Generated ✓`);
          }
        } else if (res.statusCode === 400) {
          console.log(`   ⚠️  Validation: ${response.message}`);
        } else if (res.statusCode === 409) {
          console.log(`   ⚠️  User exists: ${response.message}`);
        } else if (res.statusCode === 500) {
          console.log(`   ❌ Server error: ${response.message || 'Unknown'}`);
        }
      } catch (e) {
        console.log(`   Response: ${data.substring(0, 100)}`);
      }
      
      // Run next test
      setTimeout(() => runTest(index + 1), 2000);
    });
  });

  req.on('error', (err) => {
    console.log(`   ❌ Connection error: ${err.message}`);
    setTimeout(() => runTest(index + 1), 2000);
  });

  req.write(postData);
  req.end();
}

// Wait for server to be ready
console.log('Waiting for server to be ready...');
setTimeout(() => runTest(0), 3000);
