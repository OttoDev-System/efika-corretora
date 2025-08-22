-- Create RPC functions for invitation management

-- Function to create user invitation
CREATE OR REPLACE FUNCTION public.create_user_invitation(
  p_email TEXT,
  p_name TEXT,
  p_role user_role,
  p_permissions TEXT[],
  p_token TEXT,
  p_expires_at TIMESTAMP WITH TIME ZONE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_invitations (
    email, name, role, permissions, token, expires_at, created_by
  ) VALUES (
    p_email, p_name, p_role, p_permissions, p_token, p_expires_at, auth.uid()
  );
END;
$$;

-- Function to get invitation by token
CREATE OR REPLACE FUNCTION public.get_invitation_by_token(p_token TEXT)
RETURNS TABLE(
  id UUID,
  email TEXT,
  name TEXT,
  role user_role,
  permissions TEXT[],
  token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  used BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ui.id,
    ui.email,
    ui.name,
    ui.role,
    ui.permissions,
    ui.token,
    ui.expires_at,
    ui.used,
    ui.created_at
  FROM public.user_invitations ui
  WHERE ui.token = p_token 
    AND ui.used = false 
    AND ui.expires_at > now();
END;
$$;

-- Function to mark invitation as used
CREATE OR REPLACE FUNCTION public.mark_invitation_used(p_invitation_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.user_invitations 
  SET used = true, used_at = now()
  WHERE id = p_invitation_id;
END;
$$;