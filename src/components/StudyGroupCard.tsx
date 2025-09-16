import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Star } from "lucide-react";

interface StudyGroup {
  id: number;
  title: string;
  description: string;
  members: number;
  isVeryActive: boolean;
  tags: string[];
  category: string;
  categoryColor: string;
  icon: string;
}

interface StudyGroupCardProps {
  group: StudyGroup;
}

export const StudyGroupCard = ({ group }: StudyGroupCardProps) => {
  return (
    <Card className="p-6 hover:shadow-soft transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${group.categoryColor}`}>
          {group.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{group.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{group.members} membros</span>
                </div>
                {group.isVeryActive && (
                  <div className="flex items-center space-x-1 text-success">
                    <Star className="w-4 h-4" />
                    <span>Muito ativo</span>
                  </div>
                )}
                <Badge variant="outline" className="text-xs">
                  {group.category}
                </Badge>
              </div>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 text-white">
              Participar
            </Button>
          </div>

          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {group.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1 hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};