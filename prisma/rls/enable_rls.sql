-- =========================================
-- FM-1 DATABASE RLS HARDENING (PRODUCTION)
-- =========================================

-- Enable RLS
ALTER TABLE "School"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Student" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Staff"   ENABLE ROW LEVEL SECURITY;

-- =========================================
-- TENANT ISOLATION POLICIES
-- =========================================

-- School: allow access only to current school
DROP POLICY IF EXISTS school_isolation ON "School";
CREATE POLICY school_isolation ON "School"
USING (
  id::text = current_setting('app.current_school', true)
);

-- User: isolate by schoolId (TEXT)
DROP POLICY IF EXISTS user_isolation ON "User";
CREATE POLICY user_isolation ON "User"
USING (
  "schoolId" = current_setting('app.current_school', true)
);

-- Student: isolate by schoolId (TEXT)
DROP POLICY IF EXISTS student_isolation ON "Student";
CREATE POLICY student_isolation ON "Student"
USING (
  "schoolId" = current_setting('app.current_school', true)
);

-- Staff: isolate by schoolId (TEXT)
DROP POLICY IF EXISTS staff_isolation ON "Staff";
CREATE POLICY staff_isolation ON "Staff"
USING (
  "schoolId" = current_setting('app.current_school', true)
);
