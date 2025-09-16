import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MessageSquare } from "lucide-react";

export const GroupStats = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold text-foreground mb-4">Estatísticas dos Grupos</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">Total de Grupos</span>
          </div>
          <span className="text-lg font-bold text-primary">89</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <span className="text-sm font-medium">Membros Ativos</span>
          </div>
          <span className="text-lg font-bold text-success">2,455</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="text-sm font-medium">Atividades Hoje</span>
          </div>
          <span className="text-lg font-bold text-accent-foreground">156</span>
        </div>
      </div>
    </Card>
  );
};