import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingButton } from '@/components/common/LoadingButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { passwordSchema, type PasswordFormData } from '@/lib/validations';

const FirstAccessPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });

  const password = watch('password');

  // Check password criteria
  const passwordCriteria = {
    minLength: password?.length >= 8,
    hasUppercase: /[A-Z]/.test(password || ''),
    hasNumber: /\d/.test(password || ''),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password || '')
  };

  useEffect(() => {
    const loadInvitation = async () => {
      if (!token) {
        toast({
          variant: 'destructive',
          title: 'Token inválido',
          description: 'Link de convite inválido ou expirado'
        });
        navigate('/login');
        return;
      }

      try {
        // Using RPC call since table isn't in types yet
        const { data, error } = await supabase.rpc('get_invitation_by_token', {
          p_token: token
        });

        if (error || !data || data.length === 0) {
          toast({
            variant: 'destructive',
            title: 'Convite inválido',
            description: 'Este convite não existe ou já foi utilizado'
          });
          navigate('/login');
          return;
        }

        setInvitation(data[0]);
      } catch (error) {
        console.error('Error loading invitation:', error);
        navigate('/login');
      }
    };

    loadInvitation();
  }, [token, navigate, toast]);

  const onSubmit = async (data: PasswordFormData) => {
    if (!invitation) return;

    setLoading(true);
    try {
      // Create user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitation.email,
        password: data.password,
        options: {
          data: {
            name: invitation.name,
            role: invitation.role
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Mark invitation as used
      await supabase.rpc('mark_invitation_used', {
        p_invitation_id: invitation.id
      });

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você será redirecionado para fazer login'
      });

      // Redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      console.error('Error creating account:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: error.message || 'Não foi possível criar a conta'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!invitation) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 mx-auto mb-4 bg-white rounded-lg p-3 inline-flex items-center justify-center">
            <h1 className="text-2xl font-bold text-efika-navy">EFIKA</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Primeiro Acesso
          </h2>
          <p className="text-white/80">
            Bem-vindo(a) à Efika Corretora!
          </p>
        </div>

        {/* Card de Primeiro Acesso */}
        <div className="efika-card">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-efika-navy text-center mb-2">
              Configure sua senha de acesso
            </h3>
            <p className="text-center text-muted-foreground">
              Olá <strong>{invitation.name}</strong>, defina sua senha para acessar o sistema
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={invitation.email}
                readOnly
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha"
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Criteria */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Critérios da senha:</h4>
              <div className="space-y-1 text-sm">
                <div className={`flex items-center gap-2 ${passwordCriteria.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <span>{passwordCriteria.minLength ? '✓' : '○'}</span>
                  Mínimo 8 caracteres
                </div>
                <div className={`flex items-center gap-2 ${passwordCriteria.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <span>{passwordCriteria.hasUppercase ? '✓' : '○'}</span>
                  Pelo menos 1 letra maiúscula
                </div>
                <div className={`flex items-center gap-2 ${passwordCriteria.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <span>{passwordCriteria.hasNumber ? '✓' : '○'}</span>
                  Pelo menos 1 número
                </div>
                <div className={`flex items-center gap-2 ${passwordCriteria.hasSpecialChar ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <span>{passwordCriteria.hasSpecialChar ? '✓' : '○'}</span>
                  Pelo menos 1 caractere especial
                </div>
              </div>
            </div>

            <LoadingButton
              type="submit"
              className="w-full bg-efika-navy hover:bg-efika-navy-dark text-white"
              loading={loading}
              disabled={!Object.values(passwordCriteria).every(Boolean)}
            >
              CRIAR SENHA
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstAccessPage;