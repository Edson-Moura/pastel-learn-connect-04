import { toast } from 'sonner';
import { Check, Info, AlertCircle, Plus, Search, Eye, Download, Settings, Upload, Edit, Trash2, Heart, Share, MessageCircle, Filter, Zap } from 'lucide-react';
import React from 'react';

interface TooltipConfig {
  [key: string]: {
    icon: typeof Check;
    message: string;
    variant?: 'success' | 'info' | 'warning';
  };
}

// Mapeamento de tipos de botão para ícones e mensagens de tooltip
const buttonTooltips: TooltipConfig = {
  // Ações principais
  'criar': { icon: Plus, message: 'Você criou um novo item', variant: 'success' },
  'adicionar': { icon: Plus, message: 'Item adicionado com sucesso', variant: 'success' },
  'participar': { icon: Check, message: 'Você se juntou com sucesso', variant: 'success' },
  'entrar': { icon: Check, message: 'Você entrou no grupo', variant: 'success' },
  'salvar': { icon: Check, message: 'Dados salvos com sucesso', variant: 'success' },
  
  // Ações de visualização
  'ver': { icon: Eye, message: 'Visualizando conteúdo', variant: 'info' },
  'visualizar': { icon: Eye, message: 'Abrindo visualização', variant: 'info' },
  'carregar': { icon: Info, message: 'Carregando mais itens', variant: 'info' },
  'expandir': { icon: Info, message: 'Expandindo conteúdo', variant: 'info' },
  
  // Ações de busca e filtro
  'buscar': { icon: Search, message: 'Realizando busca', variant: 'info' },
  'pesquisar': { icon: Search, message: 'Pesquisando conteúdo', variant: 'info' },
  'filtrar': { icon: Filter, message: 'Aplicando filtros', variant: 'info' },
  
  // Ações de download/upload
  'exportar': { icon: Download, message: 'Exportando dados', variant: 'success' },
  'baixar': { icon: Download, message: 'Download iniciado', variant: 'success' },
  'upload': { icon: Upload, message: 'Upload realizado', variant: 'success' },
  'enviar': { icon: Upload, message: 'Enviado com sucesso', variant: 'success' },
  
  // Ações de edição
  'editar': { icon: Edit, message: 'Abrindo para edição', variant: 'info' },
  'configurar': { icon: Settings, message: 'Abrindo configurações', variant: 'info' },
  'atualizar': { icon: Zap, message: 'Atualizando dados', variant: 'info' },
  
  // Ações de interação social
  'curtir': { icon: Heart, message: 'Você curtiu este conteúdo', variant: 'success' },
  'compartilhar': { icon: Share, message: 'Compartilhando conteúdo', variant: 'success' },
  'comentar': { icon: MessageCircle, message: 'Abrindo comentários', variant: 'info' },
  'responder': { icon: MessageCircle, message: 'Respondendo mensagem', variant: 'info' },
  
  // Ações de exclusão (warning)
  'deletar': { icon: Trash2, message: 'Item removido', variant: 'warning' },
  'remover': { icon: Trash2, message: 'Removido com sucesso', variant: 'warning' },
  'excluir': { icon: Trash2, message: 'Excluído permanentemente', variant: 'warning' },
  
  // Default
  'default': { icon: Info, message: 'Ação realizada com sucesso', variant: 'info' }
};

export const useButtonTooltip = () => {
  const showTooltip = (action: string, customMessage?: string) => {
    // Normaliza a ação para minúsculo e remove acentos
    const normalizedAction = action.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    
    // Busca a configuração pelo tipo de ação
    let config = buttonTooltips['default'];
    
    // Tenta encontrar uma configuração específica
    for (const [key, value] of Object.entries(buttonTooltips)) {
      if (normalizedAction.includes(key) || key.includes(normalizedAction)) {
        config = value;
        break;
      }
    }
    
    const message = customMessage || config.message;
    const IconComponent = config.icon;
    
    // Estilo baseado no variant
    const styles = {
      success: {
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--success) / 0.3)',
        color: 'hsl(var(--success))',
      },
      info: {
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--primary) / 0.3)',
        color: 'hsl(var(--primary))',
      },
      warning: {
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--warning) / 0.3)',
        color: 'hsl(var(--warning))',
      }
    };
    
    const selectedStyle = styles[config.variant || 'info'];
    
    toast(message, {
      icon: React.createElement(IconComponent, { className: "h-4 w-4" }),
      duration: 2500,
      style: selectedStyle,
    });
  };

  const showCustomTooltip = (message: string, icon?: typeof Check, variant?: 'success' | 'info' | 'warning') => {
    const IconComponent = icon || Info;
    const selectedVariant = variant || 'info';
    
    const styles = {
      success: {
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--success) / 0.3)',
        color: 'hsl(var(--success))',
      },
      info: {
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--primary) / 0.3)',
        color: 'hsl(var(--primary))',
      },
      warning: {
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--warning) / 0.3)',
        color: 'hsl(var(--warning))',
      }
    };
    
    toast(message, {
      icon: React.createElement(IconComponent, { className: "h-4 w-4" }),
      duration: 2500,
      style: styles[selectedVariant],
    });
  };

  return { showTooltip, showCustomTooltip };
};