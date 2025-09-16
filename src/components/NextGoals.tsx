import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

const goals = [
  {
    title: "Alcançar Top 10",
    description: "Faltam 5 posições",
    progress: 70,
    color: "bg-primary"
  },
  {
    title: "Streak de 10 dias",
    description: "Faltam 3 dias",
    progress: 90,
    color: "bg-warning"
  },
  {
    title: "1500 pontos",
    description: "Faltam 270 pontos",
    progress: 82,
    color: "bg-success"
  }
];

export const NextGoals = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-4 w-4 text-primary" />
          Próximas Metas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.title} className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{goal.title}</p>
              <span className="text-xs text-muted-foreground">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{goal.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};