-- Harden function search_path per linter
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;