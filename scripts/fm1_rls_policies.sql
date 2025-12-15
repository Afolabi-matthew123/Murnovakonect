-- SAFE reapply of RLS helper (CASCADE)
DROP FUNCTION IF EXISTS murnova_current_school_id() CASCADE;

CREATE FUNCTION murnova_current_school_id()
RETURNS text
LANGUAGE sql
AS $$
  SELECT "id"
  FROM "School"
  WHERE "slug" = current_setting('murnova.current_school_slug', true)
  LIMIT 1
$$;
