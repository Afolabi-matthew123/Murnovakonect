import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function applyRLS() {
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "School" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "Student" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "Staff" ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS school_isolation ON "School";
    DROP POLICY IF EXISTS user_isolation ON "User";
    DROP POLICY IF EXISTS student_isolation ON "Student";
    DROP POLICY IF EXISTS staff_isolation ON "Staff";

    CREATE POLICY school_isolation ON "School"
      USING (id = current_setting('app.current_school')::uuid);

    CREATE POLICY user_isolation ON "User"
      USING (school_id = current_setting('app.current_school')::uuid);

    CREATE POLICY student_isolation ON "Student"
      USING (school_id = current_setting('app.current_school')::uuid);

    CREATE POLICY staff_isolation ON "Staff"
      USING (school_id = current_setting('app.current_school')::uuid);
  `);

  console.log('✅ RLS applied successfully');
}

applyRLS()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
