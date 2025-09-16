import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipButton } from "@/components/TooltipButton";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Calendar, Target } from "lucide-react";

export const UserStats = () => {
  return (
    <div className="space-y-6">
      {/* Personal Summary */}
      <Card className="bg-gradient-primary border-0 text-white shadow-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Resumo Pessoal</h3>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              ✨ Ativo
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">127</div>
              <p className="text-sm opacity-90">Posts Hoje</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-accent">89</div>
              <p className="text-sm opacity-90">XP Ganho</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1 text-success">15</div>
              <p className="text-sm opacity-90">Posição</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1 text-warning">7</div>
              <p className="text-sm opacity-90">Sequência</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-90">Progresso Semanal</span>
              <span className="text-sm font-semibold">65%</span>
            </div>
            <Progress value={65} className="h-2 bg-white/20" />
          </div>

          <TooltipButton 
            variant="secondary" 
            className="w-full mt-4 bg-white/20 hover:bg-white/30 border-0 text-white"
            action="ver"
            tooltipText="Abrir estatísticas detalhadas"
          >
            Ver Estatísticas Completas
          </TooltipButton>
        </CardContent>
      </Card>

      {/* Important Notifications */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm">Notificações Importantes</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary-soft rounded-lg animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Novo desafio disponível</p>
                <p className="text-xs text-muted-foreground">
                  Participe do "30 Days Vocabulary Challenge"
                </p>
                <p className="text-xs text-primary mt-1">há 2 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg animate-fade-in">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Meta diária concluída</p>
                <p className="text-xs text-muted-foreground">
                  Você ganhou 50 XP extras!
                </p>
                <p className="text-xs text-success mt-1">há 4 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg animate-fade-in">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Evento ao vivo</p>
                <p className="text-xs text-muted-foreground">
                  Aula de conversação às 19h hoje
                </p>
                <p className="text-xs text-accent mt-1">em 3 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};