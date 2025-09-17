-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  total_points INTEGER NOT NULL DEFAULT 0,
  monthly_points INTEGER NOT NULL DEFAULT 0,
  ranking_position INTEGER,
  monthly_ranking_position INTEGER,
  study_streak INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study_groups table
CREATE TABLE public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  creator_id UUID NOT NULL,
  member_count INTEGER NOT NULL DEFAULT 1,
  max_members INTEGER DEFAULT 50,
  is_private BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study_group_members table
CREATE TABLE public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create posts table for forum
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE SET NULL,
  views_count INTEGER NOT NULL DEFAULT 0,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activities table
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('study_session', 'post_created', 'group_joined', 'achievement_earned', 'goal_completed')),
  title TEXT NOT NULL,
  description TEXT,
  points_earned INTEGER NOT NULL DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_url TEXT,
  badge_color TEXT NOT NULL DEFAULT '#3B82F6',
  points_reward INTEGER NOT NULL DEFAULT 0,
  requirements JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create goals table
CREATE TABLE public.goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value INTEGER NOT NULL,
  current_value INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'points',
  deadline DATE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_tags table
CREATE TABLE public.post_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- Create study_group_tags table
CREATE TABLE public.study_group_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  UNIQUE(group_id, tag_id)
);

-- Create user_stats table for performance tracking
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  study_minutes INTEGER NOT NULL DEFAULT 0,
  posts_created INTEGER NOT NULL DEFAULT 0,
  activities_completed INTEGER NOT NULL DEFAULT 0,
  points_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for study_groups
CREATE POLICY "Study groups are viewable by everyone" ON public.study_groups
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create study groups" ON public.study_groups
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Group creators can update their groups" ON public.study_groups
  FOR UPDATE USING (auth.uid() = creator_id);

-- Create RLS policies for study_group_members
CREATE POLICY "Group members are viewable by everyone" ON public.study_group_members
  FOR SELECT USING (true);

CREATE POLICY "Users can join groups" ON public.study_group_members
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups" ON public.study_group_members
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for posts
CREATE POLICY "Posts are viewable by everyone" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- Create RLS policies for activities
CREATE POLICY "Users can view their own activities" ON public.activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities" ON public.activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for achievements
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements
  FOR SELECT USING (true);

-- Create RLS policies for user_achievements
CREATE POLICY "User achievements are viewable by everyone" ON public.user_achievements
  FOR SELECT USING (true);

CREATE POLICY "Users can earn achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for goals
CREATE POLICY "Users can view their own goals" ON public.goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" ON public.goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" ON public.goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" ON public.goals
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for tags
CREATE POLICY "Tags are viewable by everyone" ON public.tags
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create tags" ON public.tags
  FOR INSERT TO authenticated WITH CHECK (true);

-- Create RLS policies for post_tags
CREATE POLICY "Post tags are viewable by everyone" ON public.post_tags
  FOR SELECT USING (true);

CREATE POLICY "Post authors can manage post tags" ON public.post_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE posts.id = post_tags.post_id 
      AND posts.author_id = auth.uid()
    )
  );

-- Create RLS policies for study_group_tags
CREATE POLICY "Study group tags are viewable by everyone" ON public.study_group_tags
  FOR SELECT USING (true);

CREATE POLICY "Group creators can manage group tags" ON public.study_group_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.study_groups 
      WHERE study_groups.id = study_group_tags.group_id 
      AND study_groups.creator_id = auth.uid()
    )
  );

-- Create RLS policies for user_stats
CREATE POLICY "Users can view their own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_groups_updated_at
  BEFORE UPDATE ON public.study_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some default achievements
INSERT INTO public.achievements (name, description, icon_url, badge_color, points_reward, requirements) VALUES
  ('Primeiro Post', 'Criou seu primeiro post no fórum', null, '#10B981', 50, '{"posts_created": 1}'),
  ('Estudante Dedicado', 'Completou 7 dias consecutivos de estudo', null, '#3B82F6', 100, '{"study_streak": 7}'),
  ('Líder Comunitário', 'Criou seu primeiro grupo de estudo', null, '#8B5CF6', 150, '{"groups_created": 1}'),
  ('Mentor', 'Ajudou 10 colegas com suas dúvidas', null, '#F59E0B', 200, '{"helps_given": 10}'),
  ('Conhecimento em Alta', 'Alcançou 1000 pontos totais', null, '#EF4444', 500, '{"total_points": 1000}');

-- Insert some default tags
INSERT INTO public.tags (name, color) VALUES
  ('Matemática', '#3B82F6'),
  ('Física', '#10B981'),
  ('Química', '#F59E0B'),
  ('Biologia', '#10B981'),
  ('História', '#8B5CF6'),
  ('Geografia', '#06B6D4'),
  ('Português', '#EF4444'),
  ('Inglês', '#F97316'),
  ('Programação', '#6366F1'),
  ('Vestibular', '#EC4899'),
  ('ENEM', '#84CC16'),
  ('Concurso', '#F59E0B');

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_ranking ON public.profiles(ranking_position);
CREATE INDEX idx_study_group_members_group_id ON public.study_group_members(group_id);
CREATE INDEX idx_study_group_members_user_id ON public.study_group_members(user_id);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_group_id ON public.posts(group_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_activities_user_id ON public.activities(user_id);
CREATE INDEX idx_activities_created_at ON public.activities(created_at DESC);
CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX idx_goals_user_id ON public.goals(user_id);
CREATE INDEX idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX idx_user_stats_date ON public.user_stats(date DESC);