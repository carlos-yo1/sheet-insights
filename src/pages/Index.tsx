import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { PlatformChart } from "@/components/dashboard/PlatformChart";
import { mockData, aggregateByDate, aggregateByPlatform, calculateTotals } from "@/data/mockData";
import { TrendingUp, Target, Users, DollarSign } from "lucide-react";

const Index = () => {
  const totals = calculateTotals(mockData);
  const trendData = aggregateByDate(mockData);
  const platformData = aggregateByPlatform(mockData);
  
  const cpl = totals.totalLeads > 0 ? totals.totalGastos / totals.totalLeads : 0;
  const cpo = totals.totalOportunidades > 0 ? totals.totalGastos / totals.totalOportunidades : 0;

  return (
    <div className="min-h-screen gradient-bg">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
          <MetricsCard
            title="Oportunidades"
            value={totals.totalOportunidades.toString()}
            change="+18.4% vs mês anterior"
            changeType="positive"
            icon={Target}
            iconColor="text-accent"
          />
          <MetricsCard
            title="Custo por Oportunidade"
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(cpo)}
            change="-5.1% vs mês anterior"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-primary"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart data={trendData} />
          <PlatformChart data={platformData} />
        </div>
      </main>
    </div>
  );
};

export default Index;
