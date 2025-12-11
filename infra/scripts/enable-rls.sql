-- Enable Row Level Security for production isolation
-- Run this script after initial database setup

-- Enable RLS on all school-owned tables
ALTER TABLE "School" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Student" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Staff" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClassRoom" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AcademicSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Term" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AttendanceRecord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FeeInvoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Result" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TimetableSlot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LessonPlan" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BehaviourIncident" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BehaviourPoint" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ParentPortalSubscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AnalyticsSnapshot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SchoolBranding" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SchoolDomain" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SchoolSitePage" ENABLE ROW LEVEL SECURITY;

-- Create policies for each table
CREATE POLICY tenant_isolation ON "School" USING (id::text = current_setting('app.current_school')::text);
CREATE POLICY tenant_isolation ON "User" USING (school_id::text = current_setting('app.current_school')::text OR school_id IS NULL);
CREATE POLICY tenant_isolation ON "Student" USING (school_id::text = current_setting('app.current_school')::text);
CREATE POLICY tenant_isolation ON "Staff" USING (school_id::text = current_setting('app.current_school')::text);
-- Repeat for all other tables...

-- Allow super admin to bypass RLS (use with caution)
CREATE POLICY bypass_rls FOR "School" TO super_admin USING (true);
