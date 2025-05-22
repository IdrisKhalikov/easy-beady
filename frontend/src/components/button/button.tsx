import './button.css';
import { ReactNode } from 'react';

type ButtonVariant = 
  | 'save' 
  | 'save-transparent' 
  | 'delete' 
  | 'delete-transparent'
  | 'for-loggin-form';

interface ButtonProps {
  text?: string;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function Button({
  text,
  variant = 'save',
  disabled = false,
  onClick,
  icon,
  ariaLabel,
  className
}: ButtonProps) {
  
  return (
    <button
      className={`button ${variant}${disabled ? ' disabled' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || text || undefined }
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text && <span className="button-text">{text}</span>}
    </button>
  );
}