

import * as React from "react";
import { ToggleButton, ToggleButtonProps, styled } from "@mui/material";

const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'toggleSize',
})<{ variant?: 'default' | 'outline'; toggleSize?: 'default' | 'sm' | 'lg' }>(({ theme, variant, toggleSize }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  gap: theme.spacing(1),
  minWidth: toggleSize === 'sm' ? 36 : toggleSize === 'lg' ? 44 : 40,
  height: toggleSize === 'sm' ? 36 : toggleSize === 'lg' ? 44 : 40,
  padding: toggleSize === 'sm' ? theme.spacing(0, 1.25) : toggleSize === 'lg' ? theme.spacing(0, 2.5) : theme.spacing(0, 1.5),
  border: variant === 'outline' ? `1px solid ${theme.palette.divider}` : 'none',
  backgroundColor: variant === 'outline' ? 'transparent' : 'transparent',
  
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  
  '&.Mui-disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  
  '& svg': {
    pointerEvents: 'none',
    width: 16,
    height: 16,
    flexShrink: 0,
  },
}));

interface ToggleProps extends Omit<ToggleButtonProps, 'size'> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant = 'default', size = 'default', pressed, onPressedChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
      const newPressed = !pressed;
      onPressedChange?.(newPressed);
      onChange?.(event, value);
    };

    return (
      <StyledToggleButton
        ref={ref}
        className={className}
        variant={variant}
        toggleSize={size}
        selected={pressed}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Toggle.displayName = "Toggle";

// Export toggleVariants for compatibility with ToggleGroup
const toggleVariants = {
  variant: {
    default: 'default' as const,
    outline: 'outline' as const,
  },
  size: {
    default: 'default' as const,
    sm: 'sm' as const,
    lg: 'lg' as const,
  },
};

export { Toggle, toggleVariants };
