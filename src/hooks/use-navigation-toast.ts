import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

interface NavigationToastConfig {
  [key: string]: string;
}

const navigationMessages: NavigationToastConfig = {
  '/': 'Você entrou no: Painel Principal',
  '/forum': 'Você entrou nos: Fóruns de Discussão',
  '/study-groups': 'Você entrou nos: Grupos de Estudo',
  '/ranking': 'Você entrou no: Ranking da Comunidade',
};

const exitMessages: NavigationToastConfig = {
  '/': 'Você saiu do: Painel Principal',
  '/forum': 'Você saiu dos: Fóruns de Discussão', 
  '/study-groups': 'Você saiu dos: Grupos de Estudo',
  '/ranking': 'Você saiu do: Ranking da Comunidade',
};

export const useNavigationToast = () => {
  const location = useLocation();
  
  useEffect(() => {
    const message = navigationMessages[location.pathname];
    if (message) {
      toast.success(message, {
        icon: React.createElement(Check, { className: "h-4 w-4" }),
        duration: 3000,
        style: {
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--foreground))',
        },
      });
    }
  }, [location.pathname]);

  const showExitToast = (pathname: string) => {
    const message = exitMessages[pathname];
    if (message) {
      toast(message, {
        duration: 2000,
        style: {
          background: 'hsl(var(--muted))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--muted-foreground))',
        },
      });
    }
  };

  const showFeatureToast = (feature: string, action: 'enter' | 'exit') => {
    const actionText = action === 'enter' ? 'acessou' : 'fechou';
    const message = `Você ${actionText}: ${feature}`;
    
    toast(message, {
      icon: action === 'enter' ? React.createElement(Check, { className: "h-4 w-4" }) : undefined,
      duration: 2500,
      style: {
        background: action === 'enter' ? 'hsl(var(--background))' : 'hsl(var(--muted))',
        border: '1px solid hsl(var(--border))',
        color: action === 'enter' ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
      },
    });
  };

  return { showExitToast, showFeatureToast };
};