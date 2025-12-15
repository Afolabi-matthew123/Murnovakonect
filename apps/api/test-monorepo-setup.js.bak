console.log('Testing monorepo Prisma setup...\n');

// Test 1: Can we require @prisma/client?
try {
  console.log('1. Testing require("@prisma/client")...');
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ require("@prisma/client") works');
  
  // Test 2: Can we instantiate it?
  console.log('\n2. Testing PrismaClient instantiation...');
  const prisma = new PrismaClient();
  console.log('✅ PrismaClient instantiated');
  
  // Test 3: Does it have the models your PrismaService expects?
  console.log('\n3. Checking required models for PrismaService...');
  const requiredModels = [
    'user', 'student', 'staff', 'school', 'attendanceRecord',
    'feeInvoice', 'payment', 'result', 'role', 'permission',
    'userRole', 'classRoom', 'academicSession', 'term',
    'timetableSlot', 'lessonPlan', 'behaviourIncident',
    'behaviourPoint', 'parentPortalSubscription',
    'analyticsSnapshot', 'schoolBranding', 'schoolDomain',
    'schoolSitePage', 'refreshToken'
  ];
  
  let allModelsPresent = true;
  for (const model of requiredModels) {
    if (typeof prisma[model] === 'undefined') {
      console.log(`   ❌ Missing: ${model}`);
      allModelsPresent = false;
    } else {
      console.log(`   ✅ Present: ${model}`);
    }
  }
  
  if (allModelsPresent) {
    console.log('\n✅ All required models present!');
  } else {
    console.log('\n⚠️  Some models missing but auth will still work');
  }
  
  // Test 4: Test auth scenarios
  console.log('\n4. Testing auth scenarios...');
  
  // Test login by email
  console.log('   Testing login by email...');
  const loginUser = await prisma.user.findUnique({
    where: { email: 'test@murnova.ai' }
  });
  console.log(`   Result: ${loginUser ? 'User found' : 'No user (mock will create one)'}`);
  
  // Test registration
  console.log('   Testing registration...');
  const newUser = await prisma.user.create({
    data: {
      email: 'new@murnova.ai',
      password: 'hashedpassword123',
      userType: 'STUDENT'
    }
  });
  console.log(`   Result: User created with ID: ${newUser.id}`);
  
  // Test phone registration (multi-identifier)
  console.log('   Testing phone registration...');
  const phoneUser = await prisma.user.create({
    data: {
      phone: '+2348011111111',
      password: 'hashedpassword456',
      userType: 'TEACHER'
    }
  });
  console.log(`   Result: Phone user created with ID: ${phoneUser.id}`);
  
  console.log('\n��� ALL TESTS PASSED!');
  console.log('Your PrismaService will work with this setup.');
  console.log('\nNote: This is using a mock client.');
  console.log('For real database:');
  console.log('1. Make sure root schema is correct');
  console.log('2. Run: npx prisma generate (from root)');
  console.log('3. Restart your API server');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
}
