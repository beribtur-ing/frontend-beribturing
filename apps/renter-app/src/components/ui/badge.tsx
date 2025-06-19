import * as React from "react"
import { Chip, ChipProps, styled } from "@mui/material"

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}>(({ theme, variant = 'default' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '9999px',
  padding: theme.spacing(0.5, 1.25),
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: 1,
  transition: theme.transitions.create(['background-color', 'color', 'border-color']),
  border: '1px solid transparent',
  
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
  
  // Variant styles
  ...(variant === 'default' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  
  ...(variant === 'secondary' && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  }),
  
  ...(variant === 'destructive' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  
  ...(variant === 'outline' && {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  
  // Override MUI chip styles
  '& .MuiChip-label': {
    padding: 0,
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
}))

export interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ variant = 'default', children, ...props }: BadgeProps) {
  return (
    <StyledChip 
      variant={variant}
      label={children}
      size="small"
      {...props}
    />
  )
}

// For backward compatibility
export const badgeVariants = () => ""

export { Badge }
