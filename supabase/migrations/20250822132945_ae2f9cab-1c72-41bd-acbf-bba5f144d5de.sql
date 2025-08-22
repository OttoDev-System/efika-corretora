-- Create test user profiles for development/testing
-- Note: These are test users that won't have corresponding auth.users entries
-- The authentication system will need to be modified to handle test scenarios

INSERT INTO profiles (id, user_id, email, name, role, permissions, first_login, active, created_at, updated_at)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'admin@efika.com.br',
    'Administrador Sistema',
    'admin',
    ARRAY['*'],
    false,
    true,
    now(),
    now()
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
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
    '33333333-3333-3333-3333-333333333333'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    'suporte@efika.com.br',
    'Suporte Técnico', 
    'suporte',
    ARRAY['tickets:read', 'tickets:write', 'clients:read'],
    false,
    true,
    now(),
    now()
  );