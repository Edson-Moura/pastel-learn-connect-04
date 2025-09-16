import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Pronunciation Practice",
    members: 156,
    newPosts: 12,
    category: "Pronúncia",
    color: "bg-primary",
    icon: "🗣️"
  },
  {
    id: 2,
    name: "TOEFL Preparation",
    members: 89,
    newPosts: 8,
    category: "Exames",
    color: "bg-success",
    icon: "📚"
  },
  {
    id: 3,
    name: "English Movies Club",
    members: 234,
    newPosts: 15,
    category: "Entretenimento",
    color: "bg-accent",
    icon: "🎬"
  }
];

export const SuggestedGroups = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="h-5 w-5 text-primary" />
          Grupos Sugeridos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all cursor-pointer group animate-scale-in"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${group.color} rounded-lg flex items-center justify-center text-white`}>
                <span className="text-lg">{group.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {group.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{group.members} membros</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-success">{group.newPosts} novos posts</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {group.category}
              </Badge>
              <Button size="sm" className="h-7 px-3 text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Entrar
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};