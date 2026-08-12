-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

GRANT SELECT ON public.todos TO anon;

GRANT INSERT, SELECT ON public.todos TO authenticated;