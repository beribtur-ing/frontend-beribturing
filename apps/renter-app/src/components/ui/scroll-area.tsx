import * as React from "react"
import { Box, BoxProps } from "@mui/material"
import { styled } from "@mui/material/styles"

import { cn } from "../../lib/utils"

const StyledScrollBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
    border: `1px solid transparent`,
    backgroundClip: 'padding-box',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.action.hover,
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
}))

interface ScrollAreaProps extends BoxProps {
  orientation?: 'vertical' | 'horizontal' | 'both'
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, orientation = 'vertical', ...props }, ref) => {
    const overflowStyle = React.useMemo(() => {
      switch (orientation) {
        case 'horizontal':
          return { overflowX: 'auto' as const, overflowY: 'hidden' as const }
        case 'both':
          return { overflow: 'auto' as const }
        default:
          return { overflowY: 'auto' as const, overflowX: 'hidden' as const }
      }
    }, [orientation])

    return (
      <StyledScrollBox
        ref={ref}
        className={cn("rounded-[inherit]", className)}
        sx={overflowStyle}
        {...props}
      >
        {children}
      </StyledScrollBox>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

// Compatibility component - not needed with CSS scrollbars but kept for API compatibility
const ScrollBar = React.forwardRef<HTMLDivElement, {
  className?: string
  orientation?: 'vertical' | 'horizontal'
}>(({ className, orientation = "vertical" }, ref) => (
  <div ref={ref} className={className} style={{ display: 'none' }} />
))
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }