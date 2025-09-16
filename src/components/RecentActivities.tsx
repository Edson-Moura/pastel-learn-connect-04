import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MessageCircle, Trophy } from "lucide-react";

const activities = [
  {
    title: "Exercício de Gramática",
    time: "2h atrás",
    points: "+50 pts",
    icon: BookOpen,
    color: "text-primary"
  },
  {
    title: "Sessão de Speaking",
    time: "4h atrás",
    points: "+75 pts",
    icon: MessageCircle,
    color: "text-success"
  },
  {
    title: "Conquista Desbloqueada",
    time: "1 dia atrás",
    points: "+100 pts",
    icon: Trophy,
    color: "text-warning"
  }
];

export const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BookOpen className="h-4 w-4 text-success" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {activity.points}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};