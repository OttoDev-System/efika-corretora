-- Create user invitations table
CREATE TABLE public.user_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for user invitations
CREATE POLICY "Admins can manage invitations" 
ON public.user_invitations 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add active column to profiles
ALTER TABLE public.profiles ADD COLUMN active BOOLEAN DEFAULT true;

-- Create trigger for automatic timestamp updates on invitations
CREATE TRIGGER update_user_invitations_updated_at
  BEFORE UPDATE ON public.user_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();