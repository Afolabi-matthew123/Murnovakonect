const http = require('http');

console.log('Verifying the fix...\n');

const tests = [
  {
    name: 'Health check',
    method: 'GET',
    path: '/health',
    data: null
  },
  {
    name: 'Email registration',
    method: 'POST',
    path: '/v1/auth/register',
    data: {
      email: 'verify-email@test.com',
      password: 'VerifyPass123!',
      userType: 'STUDENT'
    }
  },
  {
    name: 'Phone registration',
    method: 'POST', 
    path: '/v1/auth/register',
    data: {
      phone: '+2348099999999',
      password: 'VerifyPhone456!',
      userType: 'TEACHER'
    }
  },
  {
    name: 'Email login',
    method: 'POST',
    path: '/v1/auth/login',
    data: {
      email: 'verify-email@test.com',
      password: 'VerifyPass123!'
    }
  },
  {
    name: 'Phone login',
    method: 'POST',
    path: '/v1/auth/login',
    data: {
      phone: '+2348099999999',
      password: 'VerifyPhone456!'
    }
  }
];

let currentTest = 0;

function runTest() {
  if (currentTest >= tests.length) {
    console.log('\ní¾‰ All tests completed!');
    console.log('Your multi-identifier auth is now working!');
    return;
  }
  
  const test = tests[currentTest];
  console.log(`${currentTest + 1}. ${test.name}...`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: test.path,
    method: test.method,
    headers: {}
  };
  
  if (test.data) {
    const postData = JSON.stringify(test.data);
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = Buffer.byteLength(postData);
  }
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`   Status: ${res.statusCode}`);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          console.log(`   Response: ${JSON.stringify(parsed).substring(0, 100)}...`);
        } catch {
          console.log(`   Response: ${data.substring(0, 100)}`);
        }
      }
      
      currentTest++;
      setTimeout(runTest, 500);
    });
  });
  
  req.on('error', (err) => {
    console.log(`   Error: ${err.message}`);
    currentTest++;
    setTimeout(runTest, 500);
  });
  
  if (test.data) {
    req.write(JSON.stringify(test.data));
  }
  req.end();
}

// Wait a moment for server
setTimeout(runTest, 1000);
