
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  customColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  label, 
  variant = 'contained', 
  size = 'medium', 
  customColor = 'primary',
  ...props 
}) => {
  return (
    <Button 
      variant={variant} 
      size={size} 
      color={customColor}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;