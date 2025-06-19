import * as React from "react"
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from "@mui/material"

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}>(({ theme, variant = 'default', size = 'default' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  whiteSpace: 'nowrap',
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: theme.transitions.create(['background-color', 'color', 'border-color']),
  textTransform: 'none',
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  '& svg': {
    pointerEvents: 'none',
    width: '1rem',
    height: '1rem',
    flexShrink: 0,
  },
  
  // Variant styles
  ...(variant === 'default' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  
  ...(variant === 'destructive' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  
  ...(variant === 'outline' && {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  
  ...(variant === 'secondary' && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  }),
  
  ...(variant === 'ghost' && {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  
  ...(variant === 'link' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
  
  // Size styles
  ...(size === 'default' && {
    height: '2.5rem',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }),
  
  ...(size === 'sm' && {
    height: '2.25rem',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  }),
  
  ...(size === 'lg' && {
    height: '2.75rem',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  }),
  
  ...(size === 'icon' && {
    height: '2.5rem',
    width: '2.5rem',
    padding: 0,
  }),
}))

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        style: {
          ...StyledButton({ theme: {} as any, variant, size }).styles,
          ...children.props.style,
        },
      })
    }
    
    return (
      <StyledButton
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        {children}
      </StyledButton>
    )
  }
)
Button.displayName = "Button"

// For backward compatibility with buttonVariants usage
export const buttonVariants = () => ""

export { Button }
