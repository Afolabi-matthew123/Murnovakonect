-- FM-1 Row-Level Security baseline
-- Uses Prisma's PascalCase table names with quoted identifiers.

-------------------------------------------------------
-- 0. Clean up old function if it exists
-------------------------------------------------------
DROP FUNCTION IF EXISTS murnova_current_school_id();

-------------------------------------------------------
-- 1. Helper: current school id based on school slug
-------------------------------------------------------
-- We assume your NestJS app sets something like:
--   SELECT set_config('murnova.current_school_slug', '<slug>', false);
-- per request/tenant.
-------------------------------------------------------

CREATE FUNCTION murnova_current_school_id()
RETURNS text
LANGUAGE sql
AS $$
  SELECT "id"
  FROM "School"
  WHERE "slug" = current_setting('murnova.current_school_slug', true)
  LIMIT 1
$$;

-------------------------------------------------------
-- 2. Enable RLS on multi-tenant tables
-------------------------------------------------------

ALTER TABLE "Student" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Staff"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ParentPortalSubscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FeeInvoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Result" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AttendanceRecord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BehaviourIncident" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BehaviourPoint" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AnalyticsSnapshot" ENABLE ROW LEVEL SECURITY;

-------------------------------------------------------
-- 3. Policies: allow access only within the current school
-------------------------------------------------------

-- Students
DROP POLICY IF EXISTS student_isolation_policy ON "Student";
CREATE POLICY student_isolation_policy
ON "Student"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- Staff
DROP POLICY IF EXISTS staff_isolation_policy ON "Staff";
CREATE POLICY staff_isolation_policy
ON "Staff"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- Users (covers school admins, staff users, parent users, etc.)
DROP POLICY IF EXISTS user_isolation_policy ON "User";
CREATE POLICY user_isolation_policy
ON "User"
USING (
  "schoolId" IS NULL  -- e.g., global/superadmin users
  OR "schoolId" = murnova_current_school_id()
)
WITH CHECK (
  "schoolId" IS NULL
  OR "schoolId" = murnova_current_school_id()
);

-- Parent portal subscriptions
DROP POLICY IF EXISTS parent_portal_isolation_policy ON "ParentPortalSubscription";
CREATE POLICY parent_portal_isolation_policy
ON "ParentPortalSubscription"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- Fee invoices
DROP POLICY IF EXISTS fee_invoice_isolation_policy ON "FeeInvoice";
CREATE POLICY fee_invoice_isolation_policy
ON "FeeInvoice"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- Payments
DROP POLICY IF EXISTS payment_isolation_policy ON "Payment";
CREATE POLICY payment_isolation_policy
ON "Payment"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- Results
DROP POLICY IF EXISTS result_isolation_policy ON "Result";
CREATE POLICY result_isolation_policy
ON "Result"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- Attendance
DROP POLICY IF EXISTS attendance_isolation_policy ON "AttendanceRecord";
CREATE POLICY attendance_isolation_policy
ON "AttendanceRecord"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- BehaviourIncident
DROP POLICY IF EXISTS behaviour_incident_isolation_policy ON "BehaviourIncident";
CREATE POLICY behaviour_incident_isolation_policy
ON "BehaviourIncident"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- BehaviourPoint
DROP POLICY IF EXISTS behaviour_point_isolation_policy ON "BehaviourPoint";
CREATE POLICY behaviour_point_isolation_policy
ON "BehaviourPoint"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());

-- AnalyticsSnapshot
DROP POLICY IF EXISTS analytics_isolation_policy ON "AnalyticsSnapshot";
CREATE POLICY analytics_isolation_policy
ON "AnalyticsSnapshot"
USING ("schoolId" = murnova_current_school_id())
WITH CHECK ("schoolId" = murnova_current_school_id());
