import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  variant = 'default',
  size = 'default',
  onClick,
  type = 'button',
  className,
}) => {
  console.log("🔘 LoadingButton renderizado - type:", type, "disabled:", disabled || loading);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("🖱️ LoadingButton clicado - type:", type);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onClick={handleClick}
      className={className}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};