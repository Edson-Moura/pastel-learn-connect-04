import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";

const achievements = [
  {
    title: "Streak Master",
    description: "7 dias consecutivos",
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    title: "Conquistador",
    description: "10 exercícios completados",
    icon: Trophy,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Estudioso",
    description: "50 atividades completadas",
    icon: Star,
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
];

export const AchievementsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="h-4 w-4 text-warning" />
          Suas Conquistas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement) => (
          <div key={achievement.title} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-10 h-10 rounded-full ${achievement.bgColor} flex items-center justify-center`}>
              <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{achievement.title}</p>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-gradient-secondary rounded-lg text-center">
          <p className="text-sm font-medium text-secondary-foreground">
            Ver Todas as Conquistas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};