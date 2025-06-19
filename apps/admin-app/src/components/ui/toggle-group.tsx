

import * as React from "react";
import { ToggleButtonGroup, ToggleButton, ToggleButtonGroupProps, styled } from "@mui/material";
import { toggleVariants } from "./toggle";

type ToggleVariant = 'default' | 'outline';
type ToggleSize = 'default' | 'sm' | 'lg';

interface ToggleGroupContextType {
  size?: ToggleSize;
  variant?: ToggleVariant;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextType>({
  size: "default",
  variant: "default",
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(0.5),
}));

const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'toggleSize',
})<{ variant?: ToggleVariant; toggleSize?: ToggleSize }>(({ theme, variant, toggleSize }) => ({
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

interface ToggleGroupProps extends Omit<ToggleButtonGroupProps, 'size'> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant = 'default', size = 'default', type = 'single', value, onValueChange, onChange, children, ...props }, ref) => {
    const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | string[]) => {
      if (type === 'single') {
        onValueChange?.(newValue as string);
      } else {
        onValueChange?.(newValue as string[]);
      }
      onChange?.(event, newValue);
    };

    return (
      <ToggleGroupContext.Provider value={{ variant, size }}>
        <StyledToggleButtonGroup
          ref={ref}
          className={className}
          exclusive={type === 'single'}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {children}
        </StyledToggleButtonGroup>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps {
  value: string;
  children: React.ReactNode;
  variant?: ToggleVariant;
  size?: ToggleSize;
  className?: string;
  disabled?: boolean;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, variant, size, value, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);

    return (
      <StyledToggleButton
        ref={ref}
        className={className}
        variant={context.variant || variant}
        toggleSize={context.size || size}
        value={value}
        {...props}
      >
        {children}
      </StyledToggleButton>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
