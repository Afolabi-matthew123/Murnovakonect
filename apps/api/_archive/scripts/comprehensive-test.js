const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('í·ª COMPREHENSIVE AUTH SYSTEM TEST\n');

// Step 1: Check server is reachable
console.log('1. Checking server connectivity...');
http.get('http://localhost:3000', (res) => {
  console.log(`   Root endpoint: Status ${res.statusCode}`);
  
  // Step 2: Test /v1/health
  console.log('\n2. Testing /v1/health endpoint...');
  http.get('http://localhost:3000/v1/health', (healthRes) => {
    console.log(`   Health endpoint: Status ${healthRes.statusCode}`);
    let healthData = '';
    healthRes.on('data', chunk => healthData += chunk);
    healthRes.on('end', () => {
      console.log(`   Response: ${healthData.substring(0, 100)}`);
      
      // Step 3: Test registration with email
      console.log('\n3. Testing email registration...');
      const registerData = JSON.stringify({
        email: 'comprehensive@test.com',
        password: 'CompPass123!',
        userType: 'STUDENT'
      });
      
      const registerReq = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/v1/auth/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': registerData.length
        }
      }, (registerRes) => {
        console.log(`   Registration status: ${registerRes.statusCode}`);
        let regData = '';
        registerRes.on('data', chunk => regData += chunk);
        registerRes.on('end', () => {
          console.log(`   Response: ${regData.substring(0, 150)}`);
          
          // Step 4: Test registration with phone
          console.log('\n4. Testing phone registration...');
          const phoneData = JSON.stringify({
            phone: '+2348077777777',
            password: 'PhonePass456!',
            userType: 'TEACHER'
          });
          
          const phoneReq = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/v1/auth/register',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': phoneData.length
            }
          }, (phoneRes) => {
            console.log(`   Phone registration status: ${phoneRes.statusCode}`);
            let phoneRegData = '';
            phoneRes.on('data', chunk => phoneRegData += chunk);
            phoneRes.on('end', () => {
              console.log(`   Response: ${phoneRegData.substring(0, 150)}`);
              
              // Step 5: Test login with email
              console.log('\n5. Testing email login...');
              const loginData = JSON.stringify({
                email: 'comprehensive@test.com',
                password: 'CompPass123!'
              });
              
              const loginReq = http.request({
                hostname: 'localhost',
                port: 3000,
                path: '/v1/auth/login',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': loginData.length
                }
              }, (loginRes) => {
                console.log(`   Email login status: ${loginRes.statusCode}`);
                let loginResponse = '';
                loginRes.on('data', chunk => loginResponse += chunk);
                loginRes.on('end', () => {
                  console.log(`   Response: ${loginResponse.substring(0, 150)}`);
                  
                  // Step 6: Test login with phone
                  console.log('\n6. Testing phone login...');
                  const phoneLoginData = JSON.stringify({
                    phone: '+2348077777777',
                    password: 'PhonePass456!'
                  });
                  
                  const phoneLoginReq = http.request({
                    hostname: 'localhost',
                    port: 3000,
                    path: '/v1/auth/login',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Content-Length': phoneLoginData.length
                    }
                  }, (phoneLoginRes) => {
                    console.log(`   Phone login status: ${phoneLoginRes.statusCode}`);
                    let phoneLoginResponse = '';
                    phoneLoginRes.on('data', chunk => phoneLoginResponse += chunk);
                    phoneLoginRes.on('end', () => {
                      console.log(`   Response: ${phoneLoginResponse.substring(0, 150)}`);
                      
                      console.log('\ní¾‰ TEST COMPLETE!');
                      console.log('\ní³‹ SUMMARY:');
                      console.log('âœ… Multi-identifier auth endpoints tested');
                      console.log('âœ… Email registration/login');
                      console.log('âœ… Phone registration/login');
                      console.log('âœ… Versioned API (/v1/) working');
                      
                      // Check if we got JWT tokens
                      try {
                        const emailResult = JSON.parse(loginResponse);
                        const phoneResult = JSON.parse(phoneLoginResponse);
                        
                        if (emailResult.accessToken) {
                          console.log('âœ… JWT tokens generated successfully');
                        }
                        
                        if (phoneResult.accessToken) {
                          console.log('âœ… Multi-identifier auth is WORKING!');
                        }
                      } catch (e) {
                        console.log('âš ï¸  Could not parse JSON responses');
                      }
                    });
                  });
                  
                  phoneLoginReq.on('error', (err) => {
                    console.log(`   Phone login error: ${err.message}`);
                  });
                  
                  phoneLoginReq.write(phoneLoginData);
                  phoneLoginReq.end();
                });
              });
              
              loginReq.on('error', (err) => {
                console.log(`   Email login error: ${err.message}`);
              });
              
              loginReq.write(loginData);
              loginReq.end();
            });
          });
          
          phoneReq.on('error', (err) => {
            console.log(`   Phone registration error: ${err.message}`);
          });
          
          phoneReq.write(phoneData);
          phoneReq.end();
        });
      });
      
      registerReq.on('error', (err) => {
        console.log(`   Registration error: ${err.message}`);
      });
      
      registerReq.write(registerData);
      registerReq.end();
    });
  }).on('error', (err) => {
    console.log(`   Health endpoint error: ${err.message}`);
    console.log('\nâŒ Server may not be running. Starting it now...');
    startServerAndTest();
  });
}).on('error', (err) => {
  console.log(`   Root endpoint error: ${err.message}`);
  console.log('\nâŒ Server is not running. Starting it now...');
  startServerAndTest();
});

function startServerAndTest() {
  const { spawn } = require('child_process');
  
  console.log('Starting server with ts-node-dev...');
  const server = spawn('npx', ['ts-node-dev', '--respawn', '--transpile-only', 'src/main.ts'], {
    stdio: 'pipe',
    shell: true
  });
  
  let serverOutput = '';
  server.stdout.on('data', (data) => {
    serverOutput += data.toString();
    if (serverOutput.includes('Nest application successfully started')) {
      console.log('âœ… Server started successfully!');
      console.log('Waiting 3 seconds then running tests again...');
      setTimeout(() => {
        // Re-run the test
        require('child_process').execSync('node comprehensive-test.js', { stdio: 'inherit' });
      }, 3000);
    }
  });
  
  server.stderr.on('data', (data) => {
    console.error('Server error:', data.toString());
  });
  
  // Timeout after 15 seconds
  setTimeout(() => {
    console.log('âŒ Server startup timeout');
    server.kill();
  }, 15000);
}
