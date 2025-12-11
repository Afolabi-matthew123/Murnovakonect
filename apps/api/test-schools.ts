import { Test } from '@nestjs/testing';
import { SchoolsModule } from './src/modules/schools/schools.module';

async function test() {
  console.log('Testing schools module...');
  try {
    const moduleRef = await Test.createTestingModule({
      imports: [SchoolsModule],
    }).compile();
    
    console.log('✅ SchoolsModule compiled successfully');
    return true;
  } catch (error) {
    console.log('❌ SchoolsModule error:', error.message);
    return false;
  }
}

test().then(success => {
  process.exit(success ? 0 : 1);
});
