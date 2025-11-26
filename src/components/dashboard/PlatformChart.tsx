import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface PlatformChartProps {
  data: Array<{
    plataforma: string;
    gastos: number;
    cliques: number;
    leads: number;
  }>;
}

export const PlatformChart = ({ data }: PlatformChartProps) => {
  return (
    <Card className="p-6 shadow-elegant">
      <h3 className="text-lg font-semibold mb-6">Desempenho por Plataforma</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="plataforma" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "var(--shadow-md)"
            }}
          />
          <Legend />
          <Bar 
            dataKey="gastos" 
            fill="hsl(var(--destructive))" 
            radius={[8, 8, 0, 0]}
            name="Gastos"
          />
          <Bar 
            dataKey="cliques" 
            fill="hsl(var(--primary))" 
            radius={[8, 8, 0, 0]}
            name="Cliques"
          />
          <Bar 
            dataKey="leads" 
            fill="hsl(var(--accent))" 
            radius={[8, 8, 0, 0]}
            name="Leads"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
