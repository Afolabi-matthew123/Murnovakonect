import { Test } from '@nestjs/testing';
import { UsersModule } from './src/modules/users/users.module';

async function test() {
  console.log('Testing users module...');
  try {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
    
    console.log('✅ UsersModule compiled successfully');
    return true;
  } catch (error) {
    console.log('❌ UsersModule error:', error.message);
    return false;
  }
}

test().then(success => {
  process.exit(success ? 0 : 1);
});
