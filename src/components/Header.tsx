import { Bell, MessageCircle, Search, User } from "lucide-react";
import { TooltipButton } from "@/components/TooltipButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useNavigationToast } from "@/hooks/use-navigation-toast";
import defaultAvatar from "@/assets/default-avatar.png";
import logoEscola from "@/assets/logo-escola.png";

export const Header = () => {
  const { showFeatureToast } = useNavigationToast();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logoEscola} alt="Logo Comunidade EnglishOne" className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-primary leading-tight">Comunidade</span>
            <span className="font-bold text-lg text-primary leading-tight">EnglishOne</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <TooltipButton 
            variant="ghost" 
            className="text-foreground hover:text-primary" 
            asChild
            showTooltip={false}
          >
            <Link to="/">Início</Link>
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            className="text-foreground hover:text-primary" 
            asChild
            showTooltip={false}
          >
            <Link to="/forum">Fóruns</Link>
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            className="text-foreground hover:text-primary" 
            asChild
            showTooltip={false}
          >
            <Link to="/study-groups">Grupos</Link>
          </TooltipButton>
          <TooltipButton 
            variant="ghost" 
            className="text-foreground hover:text-primary" 
            asChild
            showTooltip={false}
          >
            <Link to="/ranking">Ranking</Link>
          </TooltipButton>
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar discussões, usuários..."
              className="pl-10 bg-muted/50 border-muted focus:bg-background"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <TooltipButton 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => showFeatureToast('Notificações', 'enter')}
            showTooltip={false}
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </TooltipButton>
          
          <TooltipButton 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => showFeatureToast('Mensagens', 'enter')}
            showTooltip={false}
          >
            <MessageCircle className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
              2
            </Badge>
          </TooltipButton>

          <TooltipButton
            variant="ghost"
            size="sm"
            className="p-0"
            asChild
            showTooltip={false}
          >
            <Link to="/profile">
              <Avatar className="w-8 h-8">
                <AvatarImage src={defaultAvatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </TooltipButton>
        </div>
      </div>
    </header>
  );
};