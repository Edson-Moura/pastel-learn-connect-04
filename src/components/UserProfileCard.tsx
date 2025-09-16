import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const UserProfileCard = () => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Avatar className="w-16 h-16 mx-auto mb-4">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
            V
          </AvatarFallback>
        </Avatar>
        
        <h3 className="font-semibold text-foreground mb-1">Você</h3>
        <Badge variant="outline" className="mb-3">Posição #15 esta semana</Badge>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">4.230</p>
            <p className="text-xs text-muted-foreground">Pontuação</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">72%</p>
            <p className="text-xs text-muted-foreground">Progresso</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Atividades</span>
            <span className="font-medium">18</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Streak</span>
            <span className="font-medium text-warning">7 dias</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Próximo nível</span>
            <span className="font-medium text-primary">72%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};