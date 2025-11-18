import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExtintorData } from "@/lib/googleSheets";

interface DataTableProps {
  data: ExtintorData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Detalhamento dos Extintores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Nº</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data/Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item["Nº"]} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item["Nº"]}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.Local}</div>
                      <div className="text-xs text-muted-foreground">{item.Descrição}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item["Tipo Kg"]}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.SITUAÇÃO === "Conforme" ? "default" : "destructive"}
                      className={item.SITUAÇÃO === "Conforme" ? "bg-success hover:bg-success/90" : ""}
                    >
                      {item.SITUAÇÃO}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.Equipe}</TableCell>
                  <TableCell>{item.Responsável}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item["DATA/HORA"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
