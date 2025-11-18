import { useEffect, useState } from "react";
import { Shield, CheckCircle2, AlertTriangle, Users, RefreshCw } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchSheetData, processDataForCharts, ExtintorData } from "@/lib/googleSheets";

const Index = () => {
  const [data, setData] = useState<ExtintorData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const sheetData = await fetchSheetData();
      setData(sheetData);
      toast({
        title: "Dados atualizados",
        description: "Dashboard atualizado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível buscar os dados da planilha.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const conformes = data.filter(item => item.SITUAÇÃO === "Conforme").length;
  const naoConformes = data.filter(item => item.SITUAÇÃO === "Não Conforme").length;
  const totalExtintores = data.length;
  const percentualConformidade = totalExtintores > 0 
    ? ((conformes / totalExtintores) * 100).toFixed(1) 
    : "0";

  const { situacaoData, tipoData, equipeData } = processDataForCharts(data);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Dashboard de Extintores
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitoramento e controle de conformidade
                </p>
              </div>
            </div>
            <Button onClick={loadData} size="lg" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Extintores"
            value={totalExtintores}
            icon={Shield}
            description="Equipamentos cadastrados"
          />
          <StatsCard
            title="Conformes"
            value={conformes}
            icon={CheckCircle2}
            description="Equipamentos aprovados"
          />
          <StatsCard
            title="Não Conformes"
            value={naoConformes}
            icon={AlertTriangle}
            description="Requerem atenção"
          />
          <StatsCard
            title="Taxa de Conformidade"
            value={`${percentualConformidade}%`}
            icon={Users}
            description="Índice de aprovação"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DonutChart
            title="Status de Conformidade"
            data={situacaoData}
            description="Distribuição por situação"
          />
          <DonutChart
            title="Tipos de Extintores"
            data={tipoData}
            description="Distribuição por tipo"
          />
          <DonutChart
            title="Distribuição por Equipe"
            data={equipeData}
            description="Responsabilidade das equipes"
          />
        </div>

        {/* Data Table */}
        <DataTable data={data} />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dashboard de Extintores © 2025 - Dados atualizados em tempo real
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
