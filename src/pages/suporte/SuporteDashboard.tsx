import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Ticket, AlertCircle, Clock, CheckCircle, Plus, Search } from 'lucide-react';

const SuporteDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const ticketStats = {
    critico: 2,
    alto: 5,
    normal: 12,
    baixo: 8
  };

  const meusTickets = [
    { id: '001', cliente: 'João Silva', tipo: 'Dúvida', prioridade: 'normal', sla: '18h restantes' },
    { id: '002', cliente: 'Maria Santos', tipo: 'Sinistro', prioridade: 'alto', sla: '2h restantes' },
    { id: '003', cliente: 'Pedro Costa', tipo: 'Renovação', prioridade: 'baixo', sla: '2d restantes' },
  ];

  const getPriorityColor = (prioridade: string) => {
    const colors = {
      critico: 'bg-red-500',
      alto: 'bg-yellow-500',
      normal: 'bg-blue-500',
      baixo: 'bg-green-500'
    };
    return colors[prioridade as keyof typeof colors] || 'bg-gray-500';
  };

  const getPriorityIcon = (prioridade: string) => {
    switch (prioridade) {
      case 'critico': return '🔴';
      case 'alto': return '🟡';
      case 'normal': return '🟢';
      case 'baixo': return '🔵';
      default: return '⚪';
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
            <h1 className="text-xl font-semibold text-efika-navy">Central de Suporte</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              ● Online
            </Badge>
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
            Central de Atendimento
          </h2>
          <p className="text-muted-foreground">
            Gerencie tickets e atenda nossos clientes
          </p>
        </div>

        {/* Tickets por Prioridade */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crítico</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{ticketStats.critico}</div>
              <p className="text-xs text-muted-foreground">SLA: 2h</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alto</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{ticketStats.alto}</div>
              <p className="text-xs text-muted-foreground">SLA: 4h</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Normal</CardTitle>
              <Ticket className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{ticketStats.normal}</div>
              <p className="text-xs text-muted-foreground">SLA: 24h</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Baixo</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{ticketStats.baixo}</div>
              <p className="text-xs text-muted-foreground">SLA: 72h</p>
            </CardContent>
          </Card>
        </div>

        {/* Meus Tickets Hoje */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Meus Tickets Atribuídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meusTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg">{getPriorityIcon(ticket.prioridade)}</span>
                    <div>
                      <p className="font-medium">#{ticket.id} - {ticket.cliente}</p>
                      <p className="text-sm text-muted-foreground">{ticket.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant="outline" 
                      className={`${getPriorityColor(ticket.prioridade)} text-white border-0`}
                    >
                      {ticket.prioridade}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{ticket.sla}</span>
                    <Button size="sm" variant="outline">
                      Atender
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-efika-navy hover:bg-efika-navy-dark">
                <Plus className="h-4 w-4 mr-2" />
                Novo Ticket
              </Button>
              <Button variant="outline" className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white">
                <Search className="h-4 w-4 mr-2" />
                Buscar Cliente
              </Button>
              <Button variant="outline" className="border-efika-navy text-efika-navy hover:bg-efika-navy hover:text-white">
                <Ticket className="h-4 w-4 mr-2" />
                Base de Conhecimento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuporteDashboard;