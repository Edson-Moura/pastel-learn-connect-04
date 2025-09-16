import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipButton } from "@/components/TooltipButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, TrendingUp } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Como melhorar o listening em inglês",
    author: "Carlos Eduardo",
    authorAvatar: "/placeholder.svg",
    views: "2.4k",
    likes: 156,
    comments: 43,
    timeAgo: "2h",
    category: "Dicas"
  },
  {
    id: 2,
    title: "Phrasal Verbs essenciais para o dia a dia",
    author: "Marina Oliveira",
    authorAvatar: "/placeholder.svg",
    views: "1.8k",
    likes: 124,
    comments: 67,
    timeAgo: "4h",
    category: "Gramática"
  },
  {
    id: 3,
    title: "Dicas para entrevistas em inglês",
    author: "Prof. James Miller",
    authorAvatar: "/placeholder.svg",
    views: "1.6k",
    likes: 98,
    comments: 29,
    timeAgo: "6h",
    category: "Profissional"
  },
  {
    id: 4,
    title: "Expressões idiomáticas mais usadas",
    author: "Beatriz Costa",
    authorAvatar: "/placeholder.svg",
    views: "1.2k",
    likes: 87,
    comments: 34,
    timeAgo: "8h",
    category: "Vocabulário"
  }
];

export const PopularPosts = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-destructive" />
          Posts Mais Populares da Semana
        </CardTitle>
        <TooltipButton 
          variant="outline" 
          size="sm"
          action="ver"
          tooltipText="Ver todos os posts populares"
        >
          Ver todos
        </TooltipButton>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow cursor-pointer group animate-fade-in"
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">Por {post.author}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.views} visualizações</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};