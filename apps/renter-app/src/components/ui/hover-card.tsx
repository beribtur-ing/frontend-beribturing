import * as React from "react"
import { Popover, PopoverProps, Box } from "@mui/material"
import { styled } from "@mui/material/styles"

import { cn } from "../../lib/utils"

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    maxWidth: '256px',
    padding: '16px',
    zIndex: 50,
  },
}))

interface HoverCardProps {
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
}

const HoverCard = ({ children, openDelay = 700, closeDelay = 300 }: HoverCardProps) => {
  return <>{children}</>
}

interface HoverCardTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ children, asChild }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { ref })
    }
    return children
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

interface HoverCardContentProps {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
  anchorEl?: HTMLElement | null
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ 
    className, 
    children, 
    align = "center", 
    side = "bottom", 
    sideOffset = 4, 
    open = false,
    onOpenChange,
    anchorEl,
    ...props 
  }, ref) => {
    const [anchorOrigin, transformOrigin] = React.useMemo(() => {
      const origins = {
        top: {
          anchor: { vertical: 'top' as const, horizontal: align === 'start' ? 'left' as const : align === 'end' ? 'right' as const : 'center' as const },
          transform: { vertical: 'bottom' as const, horizontal: align === 'start' ? 'left' as const : align === 'end' ? 'right' as const : 'center' as const }
        },
        bottom: {
          anchor: { vertical: 'bottom' as const, horizontal: align === 'start' ? 'left' as const : align === 'end' ? 'right' as const : 'center' as const },
          transform: { vertical: 'top' as const, horizontal: align === 'start' ? 'left' as const : align === 'end' ? 'right' as const : 'center' as const }
        },
        left: {
          anchor: { vertical: align === 'start' ? 'top' as const : align === 'end' ? 'bottom' as const : 'center' as const, horizontal: 'left' as const },
          transform: { vertical: align === 'start' ? 'top' as const : align === 'end' ? 'bottom' as const : 'center' as const, horizontal: 'right' as const }
        },
        right: {
          anchor: { vertical: align === 'start' ? 'top' as const : align === 'end' ? 'bottom' as const : 'center' as const, horizontal: 'right' as const },
          transform: { vertical: align === 'start' ? 'top' as const : align === 'end' ? 'bottom' as const : 'center' as const, horizontal: 'left' as const }
        }
      }
      return [origins[side].anchor, origins[side].transform]
    }, [side, align])

    return (
      <StyledPopover
        open={open}
        anchorEl={anchorEl}
        onClose={() => onOpenChange?.(false)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        disableRestoreFocus
      >
        <Box ref={ref} className={className} {...props}>
          {children}
        </Box>
      </StyledPopover>
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }