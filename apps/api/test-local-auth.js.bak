const { LocalStrategy } = require('./dist/modules/auth/strategies/local.strategy');
const { AuthService } = require('./dist/modules/auth/auth.service');
const bcrypt = require('bcrypt');

async function testLocalAuth() {
  console.log('Testing LocalStrategy...');
  
  // Mock AuthService
  const mockAuthService = {
    validateUserCredentials: async (identifier, password) => {
      console.log(`validateUserCredentials called with: ${identifier}, ${password}`);
      
      // Simulate superadmin check
      if (identifier === 'superadmin@murnova.com' && password === 'admin123') {
        return {
          id: 1,
          email: 'superadmin@murnova.com',
          displayName: 'Super Admin',
          roles: ['SUPER_ADMIN']
        };
      }
      return null;
    }
  };
  
  const strategy = new LocalStrategy(mockAuthService);
  
  // Test the strategy
  try {
    const result = await new Promise((resolve, reject) => {
      strategy.validate('superadmin@murnova.com', 'admin123', (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });
    
    console.log('✅ LocalStrategy test passed!');
    console.log('User returned:', result);
  } catch (error) {
    console.log('❌ LocalStrategy test failed:');
    console.log(error.message);
  }
}

testLocalAuth();
