import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LoadingButton } from '@/components/common/LoadingButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import type { Profile } from '@/types/auth';

const inviteSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  role: z.enum(['corretor', 'suporte'], { 
    message: 'Selecione um cargo válido' 
  }),
  permissions: z.array(z.string()).optional()
});

type InviteFormData = z.infer<typeof inviteSchema>;

const TeamManagement: React.FC = () => {
  const [team, setTeam] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema)
  });

  const selectedRole = watch('role');

  const loadTeam = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeam(data || []);
    } catch (error) {
      console.error('Error loading team:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar a equipe'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const onSubmit = async (data: InviteFormData) => {
    setInviting(true);
    try {
      // Generate a temporary token
      const token = crypto.randomUUID();
      
      // Call the RPC function
      const { error: inviteError } = await supabase.rpc('create_user_invitation', {
        p_email: data.email,
        p_name: data.name,
        p_role: data.role as 'admin' | 'corretor' | 'suporte',
        p_permissions: data.permissions || [],
        p_token: token,
        p_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

      if (inviteError) throw inviteError;

      // Generate the invitation link
      const inviteUrl = `${window.location.origin}/auth/first-access?token=${token}`;
      
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(inviteUrl);
        toast({
          title: 'Convite criado!',
          description: `Link copiado para área de transferência. Compartilhe com ${data.name}: ${data.email}`,
          duration: 6000
        });
      } catch (err) {
        // Fallback for older browsers
        toast({
          title: 'Convite criado!',
          description: `Copie este link e compartilhe: ${inviteUrl}`,
          duration: 8000
        });
      }

      reset();
      await loadTeam();
    } catch (error) {
      console.error('Error sending invite:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível enviar o convite'
      });
    } finally {
      setInviting(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentlyActive: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ first_login: currentlyActive }) // Using first_login as active flag
        .eq('user_id', userId);

      if (error) throw error;

      await loadTeam();
      toast({
        title: 'Status atualizado',
        description: `Usuário ${currentlyActive ? 'desativado' : 'ativado'} com sucesso`
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível atualizar o status'
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      corretor: 'bg-blue-100 text-blue-800',
      suporte: 'bg-green-100 text-green-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: 'Administrador',
      corretor: 'Corretor',
      suporte: 'Suporte'
    };
    return labels[role as keyof typeof labels] || role;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Formulário de Convite */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Convidar Novo Membro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="João Silva"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="joao@efika.com.br"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="role">Cargo</Label>
                <Select onValueChange={(value) => setValue('role', value as 'corretor' | 'suporte')}>
                  <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corretor">Corretor</SelectItem>
                    <SelectItem value="suporte">Suporte</SelectItem>
                  </SelectContent>
                </Select>
              {errors.role && (
                <p className="text-destructive text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <LoadingButton
              type="submit"
              loading={inviting}
              className="bg-efika-navy hover:bg-efika-navy-dark"
            >
              Gerar Convite
            </LoadingButton>
          </form>
        </CardContent>
      </Card>

      {/* Lista da Equipe */}
      <Card>
        <CardHeader>
          <CardTitle>Equipe Atual ({team.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {team.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-efika-navy rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {getRoleLabel(member.role)}
                      </Badge>
                      {member.first_login && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          Primeiro acesso pendente
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleUserStatus(member.user_id, !member.first_login)}
                  >
                    {member.first_login ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    {member.first_login ? 'Inativo' : 'Ativo'}
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {team.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum membro da equipe encontrado.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;