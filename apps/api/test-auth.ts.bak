import { Test } from '@nestjs/testing';
import { AuthModule } from './src/modules/auth/auth.module';

async function test() {
  console.log('Testing auth module...');
  try {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
    
    console.log('✅ AuthModule compiled successfully');
    return true;
  } catch (error) {
    console.log('❌ AuthModule error:', error.message);
    return false;
  }
}

test().then(success => {
  process.exit(success ? 0 : 1);
});
