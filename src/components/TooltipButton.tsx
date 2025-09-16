import React from "react";
import { Button } from "@/components/ui/button";
import { useActivityToast } from "@/hooks/use-activity-toast";

interface TooltipButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  activityName?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  asChild?: boolean;
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({
  children,
  onClick,
  activityName,
  variant = "default",
  size = "default",
  className,
  asChild,
  ...props
}) => {
  const { showActivityToast } = useActivityToast();

  const handleClick = () => {
    if (activityName) {
      showActivityToast(activityName, true);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};