import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface TrendChartProps {
  data: Array<{
    date: string;
    gastos: number;
    leads: number;
    oportunidades: number;
  }>;
}

export const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <Card className="p-6 shadow-elegant">
      <h3 className="text-lg font-semibold mb-6">Tendências ao Longo do Tempo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
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
          <Line 
            type="monotone" 
            dataKey="gastos" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={2}
            name="Gastos"
            dot={{ fill: "hsl(var(--destructive))", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="leads" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            name="Leads"
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="oportunidades" 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            name="Oportunidades"
            dot={{ fill: "hsl(var(--accent))", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
