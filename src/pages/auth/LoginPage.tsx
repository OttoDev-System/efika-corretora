import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  
  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log("📄 LoginPage renderizado - isLoading:", isLoading, "isAuthenticated:", isAuthenticated);

  // Efeito para redirecionar o usuário após o login ser bem-sucedido
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("✅ Usuário autenticado, redirecionando...", user.role);
      toast({
        title: 'Login bem-sucedido!',
        description: 'Redirecionando para o seu painel...',
      });

      const redirectPath = {
        admin: '/admin/dashboard',
        corretor: '/corretor/pipeline', 
        suporte: '/suporte/tickets'
      }[user.role] || '/';
      
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, toast]);

  // Efeito para exibir toasts de erro
  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'Credenciais inválidas. Por favor, tente novamente.',
      });
      clearError();
    }
  }, [error, toast, clearError]);

  // Validação simples
  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função chamada ao submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 handleSubmit chamado com:", { email, password });
    
    if (!validateForm()) {
      console.log("❌ Validação falhou");
      return;
    }

    try {
      console.log("📞 Chamando função login...");
      await login({ email, password, rememberMe });
      console.log("✅ Login concluído");
    } catch (err) {
      console.error("❌ Falha no login:", err);
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email ou CPF</Label>
              <Input
                id="email"
                type="text"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rememberMe" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm font-normal">Lembrar-me</Label>
                </div>
                <Link to="/auth/forgot-password" className="text-sm text-efika-navy hover:underline">
                    Esqueci minha senha
                </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-efika-navy hover:bg-efika-navy-dark text-white"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ENTRAR
            </Button>
          </form>
        </div>

        {/* Test Users Info */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
          <h4 className="font-semibold mb-2">Usuários de teste (senha: 123456):</h4>
          <div className="space-y-1">
            <p><strong>Admin:</strong> admin@efika.com.br</p>
            <p><strong>Corretor:</strong> corretor@efika.com.br</p>
            <p><strong>Suporte:</strong> suporte@efika.com.br</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;