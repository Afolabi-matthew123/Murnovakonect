-- ============================================
-- Row Level Security Setup for Murnova Konect
-- ============================================
-- 
-- This script enables RLS on all tables and creates
-- policies for tenant isolation.
--
-- Run this after initial database setup:
-- psql -U postgres -d murnova_konect -f setup-rls.sql
--

-- Enable RLS on all tenant-owned tables
DO $$ 
DECLARE 
    table_record RECORD;
BEGIN
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN ('_prisma_migrations')
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', table_record.tablename);
        RAISE NOTICE 'Enabled RLS on table: %', table_record.tablename;
    END LOOP;
END $$;

-- Create function to set current school context
CREATE OR REPLACE FUNCTION set_current_school(school_id uuid)
RETURNS void AS $$
BEGIN
    -- Set the school ID for RLS policies
    PERFORM set_config('app.current_school_id', school_id::text, false);
    
    -- Also set it for application use
    PERFORM set_config('app.current_school_slug', 
        (SELECT slug FROM "School" WHERE id = school_id), 
        false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to application user
GRANT EXECUTE ON FUNCTION set_current_school(uuid) TO postgres;

-- Create policies for each table (simplified version)
-- Note: For production, create specific policies for SELECT, INSERT, UPDATE, DELETE

-- School: users can only see their own school
CREATE POLICY school_isolation_policy ON "School"
    FOR ALL
    USING (id = current_setting('app.current_school_id', true)::uuid);

-- User: users can only see users in their school or global users
CREATE POLICY user_isolation_policy ON "User"
    FOR ALL
    USING (
        school_id = current_setting('app.current_school_id', true)::uuid 
        OR school_id IS NULL
    );

-- Student: users can only see students in their school
CREATE POLICY student_isolation_policy ON "Student"
    FOR ALL
    USING (school_id = current_setting('app.current_school_id', true)::uuid);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_student_school_id ON "Student"(school_id);
CREATE INDEX IF NOT EXISTS idx_user_school_id ON "User"(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_school_id ON "AttendanceRecord"(school_id);
CREATE INDEX IF NOT EXISTS idx_result_school_id ON "Result"(school_id);
CREATE INDEX IF NOT EXISTS idx_feeinvoice_school_id ON "FeeInvoice"(school_id);

-- Create a view for super admin to see all data (bypass RLS)
CREATE OR REPLACE VIEW super_admin_view AS
SELECT 
    s.name as school_name,
    s.slug as school_slug,
    COUNT(DISTINCT u.id) as user_count,
    COUNT(DISTINCT st.id) as student_count,
    COUNT(DISTINCT stf.id) as staff_count
FROM "School" s
LEFT JOIN "User" u ON u.school_id = s.id
LEFT JOIN "Student" st ON st.school_id = s.id
LEFT JOIN "Staff" stf ON stf.school_id = s.id
GROUP BY s.id, s.name, s.slug;

-- Create audit log table (optional)
CREATE TABLE IF NOT EXISTS audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name text NOT NULL,
    record_id uuid NOT NULL,
    operation text NOT NULL,
    old_data jsonb,
    new_data jsonb,
    user_id uuid,
    school_id uuid,
    ip_address inet,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- Create index on audit log for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_school_id ON audit_log(school_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);

-- Create trigger function for audit logging (optional)
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS trigger AS $$
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        operation,
        old_data,
        new_data,
        user_id,
        school_id
    ) VALUES (
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        TG_OP,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
        current_setting('app.current_user_id', true)::uuid,
        current_setting('app.current_school_id', true)::uuid
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: To add audit trigger to a table:
-- CREATE TRIGGER audit_trigger
-- AFTER INSERT OR UPDATE OR DELETE ON table_name
-- FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
