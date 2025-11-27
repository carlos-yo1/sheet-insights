export const mockData = [
  { data: "2024-01-15", plataforma: "Google Ads", gasto: 1500.00, leads: 45, oportunidades: 12 },
  { data: "2024-01-16", plataforma: "Facebook Ads", gasto: 800.00, leads: 28, oportunidades: 8 },
  { data: "2024-01-17", plataforma: "Instagram Ads", gasto: 950.00, leads: 35, oportunidades: 10 },
  { data: "2024-01-18", plataforma: "Google Ads", gasto: 1650.00, leads: 52, oportunidades: 15 },
  { data: "2024-01-19", plataforma: "LinkedIn Ads", gasto: 2200.00, leads: 38, oportunidades: 14 },
  { data: "2024-01-20", plataforma: "Facebook Ads", gasto: 750.00, leads: 22, oportunidades: 6 },
  { data: "2024-01-21", plataforma: "Instagram Ads", gasto: 1100.00, leads: 41, oportunidades: 11 },
  { data: "2024-01-22", plataforma: "Google Ads", gasto: 1800.00, leads: 58, oportunidades: 16 },
  { data: "2024-01-23", plataforma: "TikTok Ads", gasto: 600.00, leads: 31, oportunidades: 9 },
  { data: "2024-01-24", plataforma: "Facebook Ads", gasto: 900.00, leads: 29, oportunidades: 7 },
  { data: "2024-01-25", plataforma: "Google Ads", gasto: 1700.00, leads: 55, oportunidades: 16 },
  { data: "2024-01-26", plataforma: "Instagram Ads", gasto: 1050.00, leads: 38, oportunidades: 10 },
];

export const aggregateByDate = (data: typeof mockData) => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc.find(d => d.date === item.data);
    if (existing) {
      existing.gastos += item.gasto;
      existing.leads += item.leads;
      existing.oportunidades += item.oportunidades;
    } else {
      acc.push({
        date: item.data,
        gastos: item.gasto,
        leads: item.leads,
        oportunidades: item.oportunidades,
      });
    }
    return acc;
  }, [] as Array<{ date: string; gastos: number; leads: number; oportunidades: number }>);
  
  return grouped.sort((a, b) => a.date.localeCompare(b.date));
};

export const aggregateByPlatform = (data: typeof mockData) => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc.find(p => p.plataforma === item.plataforma);
    if (existing) {
      existing.gastos += item.gasto;
      existing.leads += item.leads;
      existing.oportunidades += item.oportunidades;
    } else {
      acc.push({
        plataforma: item.plataforma,
        gastos: item.gasto,
        leads: item.leads,
        oportunidades: item.oportunidades,
      });
    }
    return acc;
  }, [] as Array<{ plataforma: string; gastos: number; leads: number; oportunidades: number }>);
  
  return grouped.sort((a, b) => b.gastos - a.gastos);
};

export const calculateTotals = (data: typeof mockData) => {
  return data.reduce(
    (acc, item) => ({
      totalGastos: acc.totalGastos + item.gasto,
      totalLeads: acc.totalLeads + item.leads,
      totalOportunidades: acc.totalOportunidades + item.oportunidades,
    }),
    { totalGastos: 0, totalLeads: 0, totalOportunidades: 0 }
  );
};
