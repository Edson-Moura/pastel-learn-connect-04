import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const rankings = [
  {
    position: 1,
    name: "Sophia Martinez",
    xp: 6450,
    avatar: "/placeholder.svg",
    badge: "🥇",
    trend: "up"
  },
  {
    position: 2,
    name: "Lucas Thompson",
    xp: 7890,
    avatar: "/placeholder.svg",
    badge: "🥈",
    trend: "down"
  },
  {
    position: 3,
    name: "Isabella Chen",
    xp: 7120,
    avatar: "/placeholder.svg",
    badge: "🥉",
    trend: "up"
  },
  {
    position: 15,
    name: "Você",
    xp: 4230,
    avatar: "/placeholder.svg",
    badge: "",
    trend: "up",
    isCurrentUser: true
  }
];

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Trophy className="h-4 w-4 text-warning" />;
    case 2:
      return <Medal className="h-4 w-4 text-muted-foreground" />;
    case 3:
      return <Award className="h-4 w-4 text-warning" />;
    default:
      return <span className="text-sm font-medium text-muted-foreground">{position}</span>;
  }
};

export const MonthlyRanking = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="h-5 w-5 text-warning" />
          Ranking Mensal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rankings.map((user) => (
          <div
            key={user.position}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              user.isCurrentUser 
                ? 'bg-primary/10 border border-primary/20' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-center w-8">
              {getRankIcon(user.position)}
            </div>

            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-medium truncate ${
                  user.isCurrentUser ? 'text-primary' : 'text-foreground'
                }`}>
                  {user.name}
                </p>
                {user.badge && <span className="text-sm">{user.badge}</span>}
              </div>
              <p className="text-xs text-muted-foreground">
                {user.xp.toLocaleString()} XP
              </p>
            </div>

            <div className="flex items-center gap-1">
              {user.trend === 'up' ? (
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-success"></div>
              ) : (
                <div className="w-0 h-0 border-l-2 border-r-2 border-t-3 border-l-transparent border-r-transparent border-t-destructive"></div>
              )}
            </div>
          </div>
        ))}

        <div className="mt-4 p-3 bg-gradient-secondary rounded-lg text-center">
          <p className="text-sm font-medium text-secondary-foreground">
            Continue participando para subir no ranking! 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
};