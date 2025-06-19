import * as React from "react"
import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledButton = styled(MUIButton)<{
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size: 'default' | 'sm' | 'lg' | 'icon';
}>(({ theme, variant, size }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '14px',
  borderRadius: '6px',
  gap: '8px',
  transition: 'all 0.2s',
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  '& svg': {
    pointerEvents: 'none',
    width: '16px',
    height: '16px',
    flexShrink: 0,
  },
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
  ...(size === 'default' && {
    height: '40px',
    padding: '8px 16px',
  }),
  ...(size === 'sm' && {
    height: '36px',
    padding: '8px 12px',
    borderRadius: '6px',
  }),
  ...(size === 'lg' && {
    height: '44px',
    padding: '8px 32px',
    borderRadius: '6px',
  }),
  ...(size === 'icon' && {
    height: '40px',
    width: '40px',
    padding: 0,
    minWidth: '40px',
  }),
}))

export interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
      } as any)
    }

    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      >
        {children}
      </StyledButton>
    )
  }
)
Button.displayName = "Button"

export { Button }
