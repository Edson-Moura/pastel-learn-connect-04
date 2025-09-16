import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useButtonTooltip } from '@/hooks/use-button-tooltip';

interface TooltipButtonProps extends ButtonProps {
  tooltipText?: string;
  action?: string;
  customTooltipMessage?: string;
  showTooltip?: boolean;
}

export const TooltipButton = React.forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ tooltipText, action, customTooltipMessage, showTooltip = true, onClick, children, ...props }, ref) => {
    const { showTooltip: showActionTooltip } = useButtonTooltip();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }
      
      // Mostra tooltip após a ação se showTooltip estiver habilitado
      if (showTooltip) {
        if (action) {
          showActionTooltip(action, customTooltipMessage);
        } else if (tooltipText) {
          // Se não tiver action, tenta inferir da tooltipText
          showActionTooltip(tooltipText, customTooltipMessage);
        } else if (typeof children === 'string') {
          // Se não tiver nem action nem tooltipText, tenta inferir do texto do botão
          showActionTooltip(children, customTooltipMessage);
        }
      }
    };

    const button = (
      <Button ref={ref} onClick={handleClick} {...props}>
        {children}
      </Button>
    );

    // Se não tiver tooltipText, retorna apenas o botão
    if (!tooltipText) {
      return button;
    }

    // Se tiver tooltipText, envolve com Tooltip
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TooltipButton.displayName = 'TooltipButton';