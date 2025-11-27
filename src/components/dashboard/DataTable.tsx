import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface DataTableProps {
  data: Array<{
    data: string;
    plataforma: string;
    gasto: number;
    leads: number;
    oportunidades: number;
  }>;
}

export const DataTable = ({ data }: DataTableProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("all");
  
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

  const calculateCPO = (gasto: number, oportunidades: number) => {
    if (oportunidades === 0) return '-';
    return formatCurrency(gasto / oportunidades);
  };

  const uniqueDates = Array.from(new Set(data.map(item => item.data))).sort();
  
  const filteredData = selectedDate === "all" 
    ? data 
    : data.filter(item => item.data === selectedDate);

  return (
    <Card className="p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Dados Detalhados</h3>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione a data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as datas</SelectItem>
              {uniqueDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead className="text-right">Gasto</TableHead>
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">CPL</TableHead>
              <TableHead className="text-right">Oportunidades</TableHead>
              <TableHead className="text-right">CPO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
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
                <TableCell className="text-right font-semibold text-primary">
                  {row.leads}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {calculateCPL(row.gasto, row.leads)}
                </TableCell>
                <TableCell className="text-right font-semibold text-accent">
                  {row.oportunidades}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {calculateCPO(row.gasto, row.oportunidades)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};