import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipButton } from "@/components/TooltipButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, TrendingUp, Clock, Plus, Search, BookOpen, MessageCircle, Lightbulb, Globe, Award, Calendar, BarChart3, UserPlus } from "lucide-react";

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "grammar", name: "Gramática", icon: BookOpen, color: "bg-blue-100 text-blue-600", posts: 324, topics: 23 },
    { id: "conversation", name: "Conversação", icon: MessageCircle, color: "bg-green-100 text-green-600", posts: 189, topics: 18 },
    { id: "vocabulary", name: "Vocabulário", icon: Lightbulb, color: "bg-purple-100 text-purple-600", posts: 156, topics: 14 },
    { id: "general", name: "Dúvidas Gerais", icon: Globe, color: "bg-orange-100 text-orange-600", posts: 98, topics: 15 },
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: "Como usar corretamente os tempos verbais em inglês?",
      author: "Ana Carolina",
      avatar: "/src/assets/default-avatar.png",
      category: "Gramática",
      categoryColor: "bg-blue-100 text-blue-600",
      replies: 12,
      views: 234,
      lastActivity: "2 minutos",
      tags: ["gramática", "tempos verbais"],
      content: "Estou com dificuldades para entender quando usar Present Perfect e quando usar Simple Past. Alguém pode me ajudar com exemplos práticos?"
    },
    {
      id: 2,
      title: "Dicas para melhorar a pronúncia do 'th'",
      author: "Roberto Silva",
      avatar: "/src/assets/default-avatar.png",
      category: "Pronúncia",
      categoryColor: "bg-green-100 text-green-600",
      replies: 28,
      views: 445,
      lastActivity: "12 minutos",
      tags: ["pronúncia", "fonética"],
      content: "Tenho muita dificuldade com a pronúncia do 'th' em palavras como 'think', 'thought', 'three'. Vocês têm alguma técnica que funciona?"
    },
    {
      id: 3,
      title: "Palavras mais confusas em inglês para brasileiros",
      author: "Mariana Oliveira",
      avatar: "/src/assets/default-avatar.png",
      category: "Vocabulário",
      categoryColor: "bg-purple-100 text-purple-600",
      replies: 45,
      views: 789,
      lastActivity: "25 minutos",
      tags: ["vocabulário", "confusão"],
      content: "Venho criar uma lista das palavras que mais confundem nós brasileiros! Ex: simple não significa 'simples' ou 'currently'..."
    },
    {
      id: 4,
      title: "Preparação para entrevistas de emprego em inglês",
      author: "Prof. James Miller",
      avatar: "/src/assets/default-avatar.png",
      category: "Carreira",
      categoryColor: "bg-orange-100 text-orange-600",
      replies: 67,
      views: 1124,
      lastActivity: "1 hora",
      tags: ["carreira", "entrevista"],
      content: "Compartilho aqui algumas dicas essenciais para se sair bem em entrevistas de emprego em inglês. Vamos discutir as perguntas mais comuns!"
    },
  ];

  const topUsers = [
    { name: "Prof. Anderson", posts: 423, level: "Expert", avatar: "/src/assets/default-avatar.png" },
    { name: "Marina Silva", posts: 312, level: "Avançado", avatar: "/src/assets/default-avatar.png" },
    { name: "Carlos Mendes", posts: 298, level: "Intermediário", avatar: "/src/assets/default-avatar.png" },
  ];

  const forumStats = [
    { label: "Total de Tópicos", value: "1,247", icon: MessageSquare, color: "text-primary" },
    { label: "Respostas Hoje", value: "89", icon: TrendingUp, color: "text-success" },
    { label: "Usuários Online", value: "234", icon: Users, color: "text-warning" },
  ];

  const upcomingEvents = [
    { title: "Q&A Session", date: "Hoje às 20h", type: "Live" },
    { title: "Grammar Workshop", date: "Amanhã às 15h", type: "Workshop" },
  ];

  const popularTags = ["gramática", "pronúncia", "conversação", "dúvidas", "vocabulário", "tempos verbais"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <TooltipButton 
                  className="w-full bg-gradient-primary text-white hover:opacity-90"
                  action="criar"
                  tooltipText="Criar uma nova discussão no fórum"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Discussão
                </TooltipButton>
              </CardHeader>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Filtros Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                  </TabsList>
                  <div className="mt-3 space-y-2">
                    <TooltipButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      action="filtrar"
                      tooltipText="Ver discussões não respondidas"
                    >
                      Não Respondidos
                    </TooltipButton>
                    <TooltipButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      action="filtrar"
                      tooltipText="Ver discussões mais populares"
                    >
                      Mais Populares
                    </TooltipButton>
                    <TooltipButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      action="filtrar"
                      tooltipText="Ver discussões recentes"
                    >
                      Recentes
                    </TooltipButton>
                    <TooltipButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      action="filtrar"
                      tooltipText="Ver discussões resolvidas"
                    >
                      Resolvidos
                    </TooltipButton>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  Tópicos Populares
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Como usar "used to"?</p>
                  <p className="text-muted-foreground">Ana • 45 respostas</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Diferença entre "make" e "do"</p>
                  <p className="text-muted-foreground">João • 32 respostas</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Pronúncia do "th" em inglês</p>
                  <p className="text-muted-foreground">Maria • 28 respostas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Usuários Mais Ativos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.posts} posts • {user.level}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Fóruns de Discussão</h1>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por Atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activity">Mais Recente</SelectItem>
                  <SelectItem value="popular">Mais Popular</SelectItem>
                  <SelectItem value="answers">Mais Respostas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.id} className="shadow-soft hover:shadow-glow transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.topics} tópicos hoje</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{category.posts}</p>
                          <p className="text-xs text-muted-foreground">posts hoje</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Discussion Filter */}
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">Gramática</Badge>
              <Badge variant="outline" className="cursor-pointer">Conversação</Badge>
              <Badge variant="outline" className="cursor-pointer">Vocabulário</Badge>
            </div>

            {/* Recent Discussions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Discussões Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <div key={discussion.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={discussion.avatar} />
                        <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>Por {discussion.author}</span>
                          <span>•</span>
                          <span>há {discussion.lastActivity}</span>
                          <Badge className={discussion.categoryColor} variant="outline">
                            {discussion.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {discussion.views}
                          </span>
                          <div className="flex gap-1">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <TooltipButton 
                    variant="outline"
                    action="carregar"
                    tooltipText="Carregar mais discussões do fórum"
                  >
                    Carregar Mais Discussões
                    <Plus className="w-4 h-4 ml-2" />
                  </TooltipButton>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  <CardTitle className="text-lg">Busca Avançada</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Filtrar tópicos..." />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grammar">Gramática</SelectItem>
                    <SelectItem value="conversation">Conversação</SelectItem>
                    <SelectItem value="vocabulary">Vocabulário</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Último mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mês</SelectItem>
                  </SelectContent>
                </Select>
                <TooltipButton 
                  className="w-full"
                  action="buscar"
                  tooltipText="Realizar busca avançada no fórum"
                >
                  Buscar
                </TooltipButton>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Estatísticas do Fórum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {forumStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-sm">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-lg">{stat.value}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Tags Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Eventos do Fórum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-primary pl-3">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forum;