-- Create test user profiles
-- Note: These will need corresponding auth.users entries created through Supabase Auth signup

-- First, let's check if we need to create any missing users in profiles table
-- We'll insert the test users directly for testing purposes

INSERT INTO profiles (id, user_id, email, name, role, permissions, first_login, active, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    gen_random_uuid(), -- This would normally match auth.users.id
    'admin@efika.com.br',
    'Administrador Sistema',
    'admin',
    ARRAY['*'], -- Admin has all permissions
    false,
    true,
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    gen_random_uuid(),
    'maria@efika.com.br', 
    'Maria Silva',
    'corretor',
    ARRAY['leads:read', 'leads:write', 'clients:read', 'clients:write'],
    false,
    true,
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    gen_random_uuid(),
    'suporte@efika.com.br',
    'Suporte Técnico', 
    'suporte',
    ARRAY['tickets:read', 'tickets:write', 'clients:read'],
    false,
    true,
    now(),
    now()
  )
ON CONFLICT (email) DO NOTHING;