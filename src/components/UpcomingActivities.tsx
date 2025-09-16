import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export const UpcomingActivities = () => {
  const activities = [
    {
      title: "Grammar Workshop",
      group: "Regras de Ouro",
      time: "15:30",
      participants: 23,
      type: "workshop"
    },
    {
      title: "Speaking Session",
      group: "Amantes da Conversa",
      time: "16:00",
      participants: 45,
      type: "session"
    },
    {
      title: "TOEFL Mock Test",
      group: "TOEFL Masters",
      time: "18:00",
      participants: 12,
      type: "test"
    }
  ];

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-foreground mb-4">Próximas Atividades</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">{activity.group}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{activity.time}</span>
              </div>
              <span>{activity.participants} participantes</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};