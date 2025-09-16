import { TooltipButton } from "@/components/TooltipButton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";

export const StudyGroupFilters = () => {
  const recommendedGroups = [
    { name: "Conversação Diária", members: 89, level: "Intermediário" },
    { name: "TOEFL Prep 2024", members: 234, level: "Avançado" },
    { name: "Business English Pro", members: 178, level: "Avançado" }
  ];

  const activeGroups = [
    { name: "Grammar Masters", members: 89, avatar: "📚" },
    { name: "Speaking Club", members: 156, avatar: "💬" },
    { name: "IELTS Warriors", members: 298, avatar: "🎯" }
  ];

  return (
    <div className="space-y-6">
      {/* New Groups Button */}
      <TooltipButton 
        className="w-full bg-gradient-primary hover:opacity-90 text-white"
        action="criar"
        tooltipText="Criar um novo grupo de estudo"
      >
        <Plus className="w-4 h-4 mr-2" />
        Novos Grupos
      </TooltipButton>

      {/* Quick Filters */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filtros Rápidos
        </h3>
        <div className="space-y-2">
          <TooltipButton 
            variant="ghost" 
            className="w-full justify-start text-sm" 
            size="sm"
            action="filtrar"
            tooltipText="Ver meus grupos de estudo"
          >
            Meus Grupos
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            className="w-full justify-start text-sm" 
            size="sm"
            action="filtrar"
            tooltipText="Ver grupos recomendados para você"
          >
            Grupos Recomendados
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            className="w-full justify-start text-sm" 
            size="sm"
            action="filtrar"
            tooltipText="Ver grupos mais populares"
          >
            Grupos Populares
          </TooltipButton>
        </div>
      </Card>

      {/* Filter by Level */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Filtrar por Nível</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-sm">Iniciante</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-sm">Intermediário</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-sm">Avançado</span>
          </div>
        </div>
      </Card>

      {/* Recommended Groups */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Grupos Recomendados</h3>
        <div className="space-y-3">
          {recommendedGroups.map((group, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer">
              <div>
                <p className="text-sm font-medium">{group.name}</p>
                <p className="text-xs text-muted-foreground">{group.members} membros</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {group.level}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Most Active Groups */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Grupos Mais Ativos</h3>
        <div className="space-y-3">
          {activeGroups.map((group, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center text-sm">
                {group.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{group.name}</p>
                <p className="text-xs text-muted-foreground">{group.members} membros</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};