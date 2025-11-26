import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  data: Array<{
    data: string;
    plataforma: string;
    gasto: number;
    cliques: number;
    leads: number;
  }>;
}

export const DataTable = ({ data }: DataTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculateCPL = (gasto: number, leads: number) => {
    if (leads === 0) return '-';
    return formatCurrency(gasto / leads);
  };

  return (
    <Card className="p-6 shadow-elegant">
      <h3 className="text-lg font-semibold mb-6">Dados Detalhados</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead className="text-right">Gasto</TableHead>
              <TableHead className="text-right">Cliques</TableHead>
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">CPL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-secondary/50 transition-smooth">
                <TableCell className="font-medium">{row.data}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {row.plataforma}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-destructive">
                  {formatCurrency(row.gasto)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {row.cliques.toLocaleString('pt-BR')}
                </TableCell>
                <TableCell className="text-right font-semibold text-accent">
                  {row.leads}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {calculateCPL(row.gasto, row.leads)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
