import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipButton } from "@/components/TooltipButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, TrendingUp, Users, Target, BarChart3, Activity } from "lucide-react";

const rankings = [
  {
    position: 1,
    name: "Marcus Silva",
    points: 2450,
    subtitle: "Participou de 16 atividades esta semana",
    avatar: "/placeholder.svg",
    badges: ["Streak 7 dias"],
    progress: 85,
    trend: "up"
  },
  {
    position: 2,
    name: "Ana Carolina",
    points: 2180,
    subtitle: "Participou de 12 atividades esta semana",
    avatar: "/placeholder.svg",
    badges: ["Top Semanal"],
    progress: 75,
    trend: "up"
  },
  {
    position: 3,
    name: "Rafael Costa",
    points: 1920,
    subtitle: "Participou de 10 atividades esta semana",
    avatar: "/placeholder.svg",
    badges: ["3º Lugar"],
    progress: 68,
    trend: "up"
  },
  {
    position: 4,
    name: "Juliana Santos",
    points: 1650,
    subtitle: "Participou de 8 atividades esta semana",
    avatar: "/placeholder.svg",
    badges: ["Gramática"],
    progress: 55,
    trend: "up"
  },
  {
    position: 5,
    name: "Pedro Oliveira",
    points: 1480,
    subtitle: "Participou de 7 atividades esta semana",
    avatar: "/placeholder.svg",
    badges: ["Vocabulário"],
    progress: 48,
    trend: "down"
  },
  {
    position: 6,
    name: "Camila Ferreira",
    points: 1320,
    subtitle: "Participou de 6 atividades esta semana",
    avatar: "/placeholder.svg",
    badges: ["Speaking"],
    progress: 42,
    trend: "up"
  }
];

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Trophy className="h-5 w-5 text-warning" />;
    case 2:
      return <Medal className="h-5 w-5 text-muted-foreground" />;
    case 3:
      return <Award className="h-5 w-5 text-warning" />;
    default:
      return <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">{position}</div>;
  }
};

export const UserRankingList = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Rankings e Classificações</CardTitle>
          <div className="flex gap-2">
            <TooltipButton 
              variant="outline" 
              size="sm"
              action="exportar"
              tooltipText="Exportar dados do ranking"
            >
              Exportar
            </TooltipButton>
            <TooltipButton 
              variant="outline" 
              size="sm"
              action="atualizar"
              tooltipText="Atualizar ranking atual"
            >
              Atualizar
            </TooltipButton>
            <TooltipButton 
              variant="outline" 
              size="sm"
              action="ver"
              tooltipText="Ver seu perfil no ranking"
            >
              Seu Perfil
            </TooltipButton>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <TooltipButton 
            variant="default" 
            size="sm" 
            className="bg-primary/10 text-primary hover:bg-primary/20"
            action="ver"
            tooltipText="Ver top pontuações do ranking"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Top Pontuações
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            size="sm"
            action="ver"
            tooltipText="Ver grupos mais ativos"
          >
            <Users className="h-4 w-4 mr-2" />
            Grupos Ativos
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            size="sm"
            action="ver"
            tooltipText="Ver conquistas disponíveis"
          >
            <Target className="h-4 w-4 mr-2" />
            Conquistas
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            size="sm"
            action="ver"
            tooltipText="Ver pontuações detalhadas"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Pontuações
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            size="sm"
            action="ver"
            tooltipText="Ver progresso individual"
          >
            <Activity className="h-4 w-4 mr-2" />
            Progresso
          </TooltipButton>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {rankings.map((user) => (
          <div
            key={user.position}
            className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-center min-w-0">
              {getRankIcon(user.position)}
            </div>

            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                {user.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{user.subtitle}</p>
              <div className="flex items-center gap-2">
                <Progress value={user.progress} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground">{user.progress}%</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <span className="text-lg font-bold text-primary">
                  {user.points.toLocaleString()}
                </span>
                <TrendingUp className={`h-4 w-4 ${user.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
              </div>
              <p className="text-sm text-muted-foreground">pontos</p>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <TooltipButton 
            variant="outline"
            action="carregar"
            tooltipText="Carregar mais usuários no ranking"
          >
            Ver Mais Rankings →
          </TooltipButton>
        </div>
      </CardContent>
    </Card>
  );
};