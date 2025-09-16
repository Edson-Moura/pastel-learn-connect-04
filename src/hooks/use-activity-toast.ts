import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const useActivityToast = () => {
  const location = useLocation();
  const previousLocation = useRef<string>("");

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousLocation.current;

    // Skip on initial load
    if (previousPath === "") {
      previousLocation.current = currentPath;
      return;
    }

    // Define route messages
    const routeMessages: Record<string, string> = {
      "/": "Bem-vindo ao Dashboard da Comunidade EnglishOne",
      "/forum": "Entrando nos Fóruns de Discussão",
      "/study-groups": "Acessando os Grupos de Estudo",
      "/ranking": "Visualizando o Ranking da Comunidade"
    };

    const exitMessages: Record<string, string> = {
      "/": "Saindo do Dashboard",
      "/forum": "Saindo dos Fóruns",
      "/study-groups": "Saindo dos Grupos de Estudo",
      "/ranking": "Saindo do Ranking"
    };

    // Show exit message for previous route
    if (previousPath && exitMessages[previousPath]) {
      toast({
        title: "Navegação",
        description: exitMessages[previousPath],
        duration: 2000,
      });
    }

    // Show enter message for current route after a small delay
    setTimeout(() => {
      if (routeMessages[currentPath]) {
        toast({
          title: "Navegação",
          description: routeMessages[currentPath],
          duration: 3000,
        });
      }
    }, 300);

    previousLocation.current = currentPath;
  }, [location.pathname]);

  // Function to show custom activity toasts
  const showActivityToast = (activity: string, isEntering: boolean = true) => {
    toast({
      title: isEntering ? "Funcionalidade Ativada" : "Funcionalidade Desativada",
      description: `${isEntering ? "Entrando em" : "Saindo de"}: ${activity}`,
      duration: 2000,
    });
  };

  return { showActivityToast };
};