import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingButton } from '@/components/common/LoadingButton';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { loginSchema, type LoginFormData } from '@/lib/validations';

const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      const redirectPath = {
        admin: '/admin/dashboard',
        corretor: '/corretor/pipeline',
        suporte: '/suporte/tickets'
      }[user.role] || '/';
      
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: error,
      });
      clearError();
    }
  }, [error, toast, clearError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Redirecionando...',
      });
    } catch (error) {
      // Error is handled by the useEffect above
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 mx-auto mb-4 bg-white rounded-lg p-3 inline-flex items-center justify-center">
            <h1 className="text-2xl font-bold text-efika-navy">EFIKA</h1>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Sistema Efika Corretora
          </h2>
        </div>

        {/* Card de Login */}
        <div className="efika-card">
          <h3 className="text-2xl font-bold text-efika-navy text-center mb-6">
            Acesse sua conta
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email ou CPF</Label>
              <Input
                id="email"
                type="text"
                placeholder="seuemail@exemplo.com ou 000.000.000-00"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                {...register('rememberMe')}
              />
              <Label htmlFor="rememberMe" className="text-sm">
                Lembrar-me por 30 dias
              </Label>
            </div>

            <LoadingButton
              type="submit"
              className="w-full bg-efika-navy hover:bg-efika-navy-dark text-white"
              loading={isLoading}
            >
              ENTRAR
            </LoadingButton>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/auth/forgot-password"
              className="text-efika-navy hover:underline text-sm block"
            >
              Esqueci minha senha
            </Link>
            <Link
              to="/auth/first-access"
              className="text-efika-silver-dark hover:underline text-sm block"
            >
              Primeiro acesso? Clique aqui
            </Link>
          </div>
        </div>

        {/* Test Users Info */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
          <h4 className="font-semibold mb-2">Usuários de teste:</h4>
          <div className="space-y-1">
            <p><strong>Admin:</strong> admin@efika.com.br / admin123</p>
            <p><strong>Corretor:</strong> maria@efika.com.br / maria123</p>
            <p><strong>Suporte:</strong> suporte@efika.com.br / suporte123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;