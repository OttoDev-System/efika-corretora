import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Users, DollarSign, TrendingUp, Package } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const kpis = {
    receita: {
      valor: 250000,
      crescimento: 15.3,
      meta: 280000
    },
    leads: {
      captados: 127,
      conversao: 23.5
    },
    equipe: {
      totalCorretores: 8,
      atingiramMeta: 6
    },
    produtos: {
      maisVendido: 'Planos de Saúde',
      crescimento: 28
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-efika-navy rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-semibold text-efika-navy">Dashboard Administrativo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Olá, <strong>{user?.name}</strong>
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
            Bem-vindo ao painel administrativo
          </h2>
          <p className="text-muted-foreground">
            Visão geral das operações da Efika Corretora
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">
                R$ {kpis.receita.valor.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{kpis.receita.crescimento}%</span> vs mês anterior
              </p>
              <div className="mt-2 w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-efika-navy h-2 rounded-full" 
                  style={{ width: `${(kpis.receita.valor / kpis.receita.meta) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Meta: R$ {kpis.receita.meta.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Captados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">{kpis.leads.captados}</div>
              <p className="text-xs text-muted-foreground">
                Taxa de conversão: <span className="text-green-600">{kpis.leads.conversao}%</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance Equipe</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-efika-navy">
                {kpis.equipe.atingiramMeta}/{kpis.equipe.totalCorretores}
              </div>
              <p className="text-xs text-muted-foreground">
                Corretores que atingiram a meta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produto Destaque</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-efika-navy">
                {kpis.produtos.maisVendido}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{kpis.produtos.crescimento}%</span> crescimento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-efika-navy hover:bg-efika-navy-dark">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Equipe
              </Button>
              <Button variant="outline" className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white">
                <DollarSign className="h-4 w-4 mr-2" />
                Relatório Financeiro
              </Button>
              <Button variant="outline" className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                Análise de Performance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;