import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Sofia Martinez",
    action: "completou o desafio",
    target: "30 Days Vocabulary",
    timeAgo: "há 15 minutos",
    type: "achievement",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    user: "Lucas Chen",
    action: "criou um novo post",
    target: "Dicas de Pronúncia",
    timeAgo: "há 30 minutos",
    type: "post",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    user: "Maria Santos",
    action: "entrou no grupo",
    target: "Advanced Grammar",
    timeAgo: "há 1 hora",
    type: "group",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    user: "João Silva",
    action: "alcançou nível",
    target: "Intermediate",
    timeAgo: "há 2 horas",
    type: "level",
    avatar: "/placeholder.svg"
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return '🏆';
    case 'post':
      return '📝';
    case 'group':
      return '👥';
    case 'level':
      return '⭐';
    default:
      return '💫';
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'bg-warning/10 text-warning-foreground';
    case 'post':
      return 'bg-primary/10 text-primary-foreground';
    case 'group':
      return 'bg-success/10 text-success-foreground';
    case 'level':
      return 'bg-accent/10 text-accent-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const CommunityActivity = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Atividades Recentes da Comunidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center border-2 border-background">
                  <span className="text-xs">{getActivityIcon(activity.type)}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium text-primary">{activity.user}</span>
                  <span className="text-muted-foreground"> {activity.action} </span>
                  <span className="font-medium">"{activity.target}"</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timeAgo}</p>
              </div>

              <Badge variant="secondary" className={getActivityColor(activity.type)}>
                <CheckCircle className="h-3 w-3 mr-1" />
                Concluído
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-center">
          <p className="text-white font-medium mb-2">Participe da comunidade!</p>
          <p className="text-white/80 text-sm">
            Compartilhe seu progresso e inspire outros estudantes 🌟
          </p>
        </div>
      </CardContent>
    </Card>
  );
};