import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Camera, Edit, Mail, MapPin, Save, Trophy, User, Users, MessageSquare, Target, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import defaultAvatar from "@/assets/default-avatar.png";

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  total_points: number;
  monthly_points: number;
  ranking_position?: number;
  monthly_ranking_position?: number;
  study_streak: number;
  level: number;
  created_at: string;
}

interface UserStats {
  total_posts: number;
  total_groups: number;
  achievements_count: number;
  active_goals: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    total_posts: 0,
    total_groups: 0,
    achievements_count: 0,
    active_goals: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: "",
    bio: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
    fetchUserStats();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o perfil",
          variant: "destructive",
        });
        return;
      }

      setProfile(profile);
      setEditForm({
        display_name: profile.display_name,
        bio: profile.bio || ""
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Buscar estatísticas do usuário
      const [postsResult, groupsResult, achievementsResult, goalsResult] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact' }).eq('author_id', user.id),
        supabase.from('study_group_members').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('user_achievements').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('goals').select('id', { count: 'exact' }).eq('user_id', user.id).eq('is_completed', false)
      ]);

      setStats({
        total_posts: postsResult.count || 0,
        total_groups: groupsResult.count || 0,
        achievements_count: achievementsResult.count || 0,
        active_goals: goalsResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: editForm.display_name,
          bio: editForm.bio
        })
        .eq('user_id', profile.user_id);

      if (error) throw error;

      setProfile({
        ...profile,
        display_name: editForm.display_name,
        bio: editForm.bio
      });

      setIsEditing(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso!",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getNextLevelPoints = (currentLevel: number) => {
    return currentLevel * 1000; // 1000 pontos por nível
  };

  const getLevelProgress = (points: number, level: number) => {
    const currentLevelMin = (level - 1) * 1000;
    const nextLevelMin = level * 1000;
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Perfil não encontrado</h2>
              <p className="text-muted-foreground text-center mb-4">
                Não foi possível carregar as informações do perfil.
              </p>
              <Button onClick={() => navigate('/')}>Voltar ao início</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar_url || defaultAvatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile.display_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={() => toast({ title: "Em breve", description: "Alteração de avatar em desenvolvimento" })}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.display_name}</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <CalendarDays className="h-4 w-4" />
                      Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "secondary" : "default"}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancelar" : "Editar Perfil"}
                  </Button>
                </div>

                {profile.bio && !isEditing && (
                  <p className="text-muted-foreground mt-3">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Level e Progress */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Nível {profile.level}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {profile.total_points} / {getNextLevelPoints(profile.level)} pontos
                </span>
              </div>
              <Progress 
                value={getLevelProgress(profile.total_points, profile.level)} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <TrendingUp className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{profile.total_points}</p>
                    <p className="text-sm text-muted-foreground">Pontos Totais</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{profile.ranking_position || "N/A"}</p>
                    <p className="text-sm text-muted-foreground">Posição Geral</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <MessageSquare className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total_posts}</p>
                    <p className="text-sm text-muted-foreground">Posts Criados</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Users className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total_groups}</p>
                    <p className="text-sm text-muted-foreground">Grupos Participando</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {stats.achievements_count} conquistas
                    </Badge>
                    <p className="text-muted-foreground mt-2">
                      Continue estudando para desbloquear mais!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Metas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {stats.active_goals} metas ativas
                    </Badge>
                    <p className="text-muted-foreground mt-2">
                      Defina suas metas de estudo!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Detalhadas</CardTitle>
                <CardDescription>
                  Acompanhe seu progresso e performance na comunidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Pontuação</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Pontos Totais:</span>
                        <span className="font-semibold">{profile.total_points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pontos do Mês:</span>
                        <span className="font-semibold">{profile.monthly_points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sequência de Estudo:</span>
                        <span className="font-semibold">{profile.study_streak} dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Participação</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Posts Criados:</span>
                        <span className="font-semibold">{stats.total_posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grupos Participando:</span>
                        <span className="font-semibold">{stats.total_groups}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conquistas:</span>
                        <span className="font-semibold">{stats.achievements_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="display_name">Nome de Exibição</Label>
                      <Input
                        id="display_name"
                        value={editForm.display_name}
                        onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                        placeholder="Seu nome de exibição"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        placeholder="Conte um pouco sobre você..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSaveProfile} 
                        disabled={saving}
                        className="flex-1"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Clique em "Editar Perfil" para alterar suas informações
                    </p>
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;