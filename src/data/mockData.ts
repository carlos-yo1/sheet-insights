export const mockData = [
  { data: "2024-01-15", plataforma: "Google Ads", gasto: 1500.00, cliques: 320, leads: 45 },
  { data: "2024-01-16", plataforma: "Facebook Ads", gasto: 800.00, cliques: 180, leads: 28 },
  { data: "2024-01-17", plataforma: "Instagram Ads", gasto: 950.00, cliques: 240, leads: 35 },
  { data: "2024-01-18", plataforma: "Google Ads", gasto: 1650.00, cliques: 380, leads: 52 },
  { data: "2024-01-19", plataforma: "LinkedIn Ads", gasto: 2200.00, cliques: 150, leads: 38 },
  { data: "2024-01-20", plataforma: "Facebook Ads", gasto: 750.00, cliques: 165, leads: 22 },
  { data: "2024-01-21", plataforma: "Instagram Ads", gasto: 1100.00, cliques: 290, leads: 41 },
  { data: "2024-01-22", plataforma: "Google Ads", gasto: 1800.00, cliques: 420, leads: 58 },
  { data: "2024-01-23", plataforma: "TikTok Ads", gasto: 600.00, cliques: 350, leads: 31 },
  { data: "2024-01-24", plataforma: "Facebook Ads", gasto: 900.00, cliques: 195, leads: 29 },
  { data: "2024-01-25", plataforma: "Google Ads", gasto: 1700.00, cliques: 395, leads: 55 },
  { data: "2024-01-26", plataforma: "Instagram Ads", gasto: 1050.00, cliques: 270, leads: 38 },
];

export const aggregateByDate = (data: typeof mockData) => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc.find(d => d.date === item.data);
    if (existing) {
      existing.gastos += item.gasto;
      existing.cliques += item.cliques;
      existing.leads += item.leads;
    } else {
      acc.push({
        date: item.data,
        gastos: item.gasto,
        cliques: item.cliques,
        leads: item.leads,
      });
    }
    return acc;
  }, [] as Array<{ date: string; gastos: number; cliques: number; leads: number }>);
  
  return grouped.sort((a, b) => a.date.localeCompare(b.date));
};

export const aggregateByPlatform = (data: typeof mockData) => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc.find(p => p.plataforma === item.plataforma);
    if (existing) {
      existing.gastos += item.gasto;
      existing.cliques += item.cliques;
      existing.leads += item.leads;
    } else {
      acc.push({
        plataforma: item.plataforma,
        gastos: item.gasto,
        cliques: item.cliques,
        leads: item.leads,
      });
    }
    return acc;
  }, [] as Array<{ plataforma: string; gastos: number; cliques: number; leads: number }>);
  
  return grouped.sort((a, b) => b.gastos - a.gastos);
};

export const calculateTotals = (data: typeof mockData) => {
  return data.reduce(
    (acc, item) => ({
      totalGastos: acc.totalGastos + item.gasto,
      totalCliques: acc.totalCliques + item.cliques,
      totalLeads: acc.totalLeads + item.leads,
    }),
    { totalGastos: 0, totalCliques: 0, totalLeads: 0 }
  );
};
