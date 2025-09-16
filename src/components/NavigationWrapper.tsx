import { useNavigationToast } from '@/hooks/use-navigation-toast';
import { ReactNode } from 'react';

interface NavigationWrapperProps {
  children: ReactNode;
}

export const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
  useNavigationToast();
  
  return <>{children}</>;
};