import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipButton } from "@/components/TooltipButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Users, BarChart3, Calendar } from "lucide-react";

const topUsers = [
  { position: 1, name: "Marcus Silva", points: "2,450", avatar: "/placeholder.svg" },
  { position: 2, name: "Ana Carolina", points: "2,180", avatar: "/placeholder.svg" },
  { position: 3, name: "Rafael Costa", points: "1,920", avatar: "/placeholder.svg" }
];

const quickStats = [
  { label: "Usuários Ativos", value: "1,234", icon: Users, color: "text-primary" },
  { label: "Atividades Hoje", value: "456", icon: Calendar, color: "text-success" },
  { label: "Conquistas", value: "89", icon: Trophy, color: "text-warning" }
];

const activeGroups = [
  { name: "Grammar Masters", members: "2.3k", level: "A2", color: "bg-primary/10 text-primary" },
  { name: "Speaking Club", members: "1.8k", level: "B1", color: "bg-success/10 text-success" },
  { name: "IELTS Warriors", members: "1.5k", level: "C1", color: "bg-warning/10 text-warning" }
];

export const RankingFilters = () => {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filtros de Ranking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Período</label>
            <Select defaultValue="esta-semana">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="esta-semana">Esta Semana</SelectItem>
                <SelectItem value="este-mes">Este Mês</SelectItem>
                <SelectItem value="este-ano">Este Ano</SelectItem>
                <SelectItem value="todos">Todos os Tempos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Categoria</label>
            <Select defaultValue="todas">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Categorias</SelectItem>
                <SelectItem value="grammar">Gramática</SelectItem>
                <SelectItem value="vocabulary">Vocabulário</SelectItem>
                <SelectItem value="speaking">Conversação</SelectItem>
                <SelectItem value="writing">Escrita</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Visualização</label>
            <div className="flex gap-2">
              <TooltipButton 
                variant="default" 
                size="sm" 
                className="flex-1"
                action="visualizar"
                tooltipText="Mudar para visualização básica"
              >
                Básica
              </TooltipButton>
              <TooltipButton 
                variant="outline" 
                size="sm" 
                className="flex-1"
                action="visualizar"
                tooltipText="Mudar para visualização em grade"
              >
                Grade
              </TooltipButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 da Semana */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-4 w-4 text-warning" />
            Top 3 da Semana
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topUsers.map((user) => (
            <div key={user.position} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-primary/10">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-warning text-warning-foreground text-xs font-bold">
                {user.position}
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.points} pts</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-4 w-4 text-primary" />
            Estatísticas Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-sm font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Grupos Mais Ativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-success" />
            Grupos Mais Ativos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeGroups.map((group, index) => (
            <div key={group.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${group.color}`}>
                {group.level}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{group.name}</p>
                <p className="text-xs text-muted-foreground">{group.members} membros</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};