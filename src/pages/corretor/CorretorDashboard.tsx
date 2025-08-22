import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Target, DollarSign, Users, Clock } from 'lucide-react';

const CorretorDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const corretorData = {
    metaMensal: 50000,
    vendasRealizadas: 35000,
    comissaoAReceber: 4500,
    leadsAtribuidos: 12,
    renovacoesPendentes: 15
  };

  const progressoMeta = (corretorData.vendasRealizadas / corretorData.metaMensal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-efika-navy rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-semibold text-efika-navy">Meu Pipeline</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Bem-vinda, <strong>{user?.name}</strong>
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-efika-navy border-efika-navy hover:bg-efika-navy hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Painel do Corretor
          </h2>
          <p className="text-muted-foreground">
            Acompanhe suas vendas, metas e oportunidades
          </p>
        </div>

        {/* Personal KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meta Mensal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">
                R$ {corretorData.vendasRealizadas.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                de R$ {corretorData.metaMensal.toLocaleString()} ({progressoMeta.toFixed(0)}%)
              </p>
              <div className="mt-2 w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-efika-navy h-2 rounded-full" 
                  style={{ width: `${Math.min(progressoMeta, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                9 dias restantes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissões</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">
                R$ {corretorData.comissaoAReceber.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                A receber este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Atribuídos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">{corretorData.leadsAtribuidos}</div>
              <p className="text-xs text-muted-foreground">
                Novos hoje: 3
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Renovações</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">{corretorData.renovacoesPendentes}</div>
              <p className="text-xs text-muted-foreground">
                Vencem em 30 dias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Kanban */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pipeline de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Interessados (8)</h4>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-sm">João Silva</p>
                    <p className="text-xs text-muted-foreground">Plano de Saúde</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-sm">Maria Santos</p>
                    <p className="text-xs text-muted-foreground">Seguro Auto</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-3">Cotação (5)</h4>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-sm">Pedro Costa</p>
                    <p className="text-xs text-muted-foreground">Consórcio</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-3">Aprovado (3)</h4>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-sm">Ana Lima</p>
                    <p className="text-xs text-muted-foreground">Seguro Vida</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">Vendido (12)</h4>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-sm">Carlos Mendes</p>
                    <p className="text-xs text-muted-foreground">Plano Família</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-efika-navy hover:bg-efika-navy-dark">
                <Users className="h-4 w-4 mr-2" />
                Novo Lead
              </Button>
              <Button variant="outline" className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white">
                <DollarSign className="h-4 w-4 mr-2" />
                Gerar Cotação
              </Button>
              <Button variant="outline" className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white">
                <Clock className="h-4 w-4 mr-2" />
                Follow-up Pendente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorretorDashboard;