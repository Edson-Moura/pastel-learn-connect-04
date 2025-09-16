import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const PerformanceChart = () => {
  // Simple mock chart data - in a real app, you'd use a charting library
  const chartData = [
    { day: "Dom", value: 20 },
    { day: "Seg", value: 35 },
    { day: "Ter", value: 45 },
    { day: "Qua", value: 30 },
    { day: "Qui", value: 55 },
    { day: "Sex", value: 40 },
    { day: "Sáb", value: 25 }
  ];
  
  const maxValue = Math.max(...chartData.map(d => d.value));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4 text-primary" />
          Gráfico de Desempenho
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-end justify-between gap-1">
          {chartData.map((data) => (
            <div key={data.day} className="flex flex-col items-center flex-1">
              <div 
                className="bg-primary/20 w-full rounded-t"
                style={{ height: `${(data.value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground mt-2">{data.day}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm font-medium">Média</p>
            <p className="text-xs text-muted-foreground">35 pts</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Melhor</p>
            <p className="text-xs text-muted-foreground">55 pts</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Total</p>
            <p className="text-xs text-muted-foreground">250 pts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};