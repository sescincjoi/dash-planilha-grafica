export interface ExtintorData {
  "Nº": number;
  "Local": string;
  "Descrição": string;
  "Tipo Kg": string;
  "MESMO TIPO DA PLANTA?": string;
  "SUBSTITUTO": string;
  "Kg": string;
  "SITUAÇÃO": string;
  "Não conformidade": string;
  "Observação": string;
  "2º Nível": string;
  "3º Nível": number;
  "Equipe": string;
  "Responsável": string;
  "DATA/HORA": string;
}

// Para uso futuro - integração com Google Sheets API
export const fetchSheetData = async (): Promise<ExtintorData[]> => {
  // Mock data for development - substitua pela chamada real à API do Google Sheets
  const mockData: ExtintorData[] = [
    {
      "Nº": 1,
      "Local": "RÁDIO",
      "Descrição": "Rádio",
      "Tipo Kg": "PQS ABC 6kg",
      "MESMO TIPO DA PLANTA?": "Sim",
      "SUBSTITUTO": "-",
      "Kg": "-",
      "SITUAÇÃO": "Conforme",
      "Não conformidade": "-",
      "Observação": "-",
      "2º Nível": "05/26",
      "3º Nível": 2029,
      "Equipe": "Delta",
      "Responsável": "Jorge",
      "DATA/HORA": "23/09/25 22:55"
    },
    {
      "Nº": 2,
      "Local": "RECEPÇÃO",
      "Descrição": "Recepção Principal",
      "Tipo Kg": "PQS ABC 4kg",
      "MESMO TIPO DA PLANTA?": "Sim",
      "SUBSTITUTO": "-",
      "Kg": "-",
      "SITUAÇÃO": "Conforme",
      "Não conformidade": "-",
      "Observação": "-",
      "2º Nível": "06/26",
      "3º Nível": 2029,
      "Equipe": "Alpha",
      "Responsável": "Maria",
      "DATA/HORA": "23/09/25 14:30"
    },
    {
      "Nº": 3,
      "Local": "ALMOXARIFADO",
      "Descrição": "Almoxarifado Geral",
      "Tipo Kg": "PQS ABC 6kg",
      "MESMO TIPO DA PLANTA?": "Não",
      "SUBSTITUTO": "PQS ABC 8kg",
      "Kg": "8",
      "SITUAÇÃO": "Não Conforme",
      "Não conformidade": "Tipo incorreto",
      "Observação": "Necessita substituição",
      "2º Nível": "04/26",
      "3º Nível": 2028,
      "Equipe": "Beta",
      "Responsável": "Carlos",
      "DATA/HORA": "22/09/25 10:15"
    },
    {
      "Nº": 4,
      "Local": "ESCRITÓRIO",
      "Descrição": "Escritório Administrativo",
      "Tipo Kg": "CO2 6kg",
      "MESMO TIPO DA PLANTA?": "Sim",
      "SUBSTITUTO": "-",
      "Kg": "-",
      "SITUAÇÃO": "Conforme",
      "Não conformidade": "-",
      "Observação": "-",
      "2º Nível": "07/26",
      "3º Nível": 2029,
      "Equipe": "Alpha",
      "Responsável": "Ana",
      "DATA/HORA": "23/09/25 16:45"
    },
    {
      "Nº": 5,
      "Local": "GARAGEM",
      "Descrição": "Garagem Veículos",
      "Tipo Kg": "PQS ABC 12kg",
      "MESMO TIPO DA PLANTA?": "Sim",
      "SUBSTITUTO": "-",
      "Kg": "-",
      "SITUAÇÃO": "Conforme",
      "Não conformidade": "-",
      "Observação": "-",
      "2º Nível": "05/26",
      "3º Nível": 2029,
      "Equipe": "Delta",
      "Responsável": "Pedro",
      "DATA/HORA": "21/09/25 09:20"
    }
  ];

  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockData;
};

// Função para processar dados para gráficos
export const processDataForCharts = (data: ExtintorData[]) => {
  // Distribuição por situação
  const situacaoCount = data.reduce((acc, item) => {
    const situacao = item.SITUAÇÃO;
    acc[situacao] = (acc[situacao] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const situacaoData = Object.entries(situacaoCount).map(([name, value]) => ({
    name,
    value,
    fill: name === "Conforme" ? "hsl(var(--success))" : "hsl(var(--destructive))"
  }));

  // Distribuição por tipo de extintor
  const tipoCount = data.reduce((acc, item) => {
    const tipo = item["Tipo Kg"];
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tipoData = Object.entries(tipoCount).map(([name, value], index) => ({
    name,
    value,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`
  }));

  // Distribuição por equipe
  const equipeCount = data.reduce((acc, item) => {
    const equipe = item.Equipe;
    acc[equipe] = (acc[equipe] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const equipeData = Object.entries(equipeCount).map(([name, value], index) => ({
    name,
    value,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`
  }));

  return {
    situacaoData,
    tipoData,
    equipeData
  };
};
