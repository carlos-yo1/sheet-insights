import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { PlatformChart } from "@/components/dashboard/PlatformChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { mockData, aggregateByDate, aggregateByPlatform, calculateTotals } from "@/data/mockData";
import { TrendingUp, MousePointer, Users, DollarSign } from "lucide-react";

const Index = () => {
  const totals = calculateTotals(mockData);
  const trendData = aggregateByDate(mockData);
  const platformData = aggregateByPlatform(mockData);
  
  const cpl = totals.totalLeads > 0 ? totals.totalGastos / totals.totalLeads : 0;

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                Dashboard de Marketing
              </h1>
              <p className="text-muted-foreground mt-1">
                Análise de desempenho de campanhas digitais
              </p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-sm font-medium text-accent">Dados do Google Sheets</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total de Gastos"
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totals.totalGastos)}
            change="+12.5% vs mês anterior"
            changeType="negative"
            icon={DollarSign}
            iconColor="text-destructive"
          />
          <MetricsCard
            title="Total de Cliques"
            value={totals.totalCliques.toLocaleString('pt-BR')}
            change="+8.3% vs mês anterior"
            changeType="positive"
            icon={MousePointer}
            iconColor="text-primary"
          />
          <MetricsCard
            title="Total de Leads"
            value={totals.totalLeads.toString()}
            change="+15.7% vs mês anterior"
            changeType="positive"
            icon={Users}
            iconColor="text-accent"
          />
          <MetricsCard
            title="CPL Médio"
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(cpl)}
            change="-3.2% vs mês anterior"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-primary"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrendChart data={trendData} />
          <PlatformChart data={platformData} />
        </div>

        {/* Data Table */}
        <DataTable data={mockData} />
      </main>

      {/* Chat Panel */}
      <ChatPanel />
    </div>
  );
};

export default Index;
