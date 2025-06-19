import * as React from "react"
import { Tooltip as MUITooltip, TooltipProps as MUITooltipProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledTooltip = styled(MUITooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    fontSize: '12px',
    padding: '6px 8px',
    borderRadius: '4px',
    maxWidth: '300px',
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.grey[900],
  },
}))

export interface TooltipProps extends Omit<MUITooltipProps, 'title'> {
  children: React.ReactElement
  content?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  delayDuration?: number
}

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

const Tooltip = ({ 
  children, 
  content, 
  side = 'top', 
  sideOffset = 4, 
  delayDuration = 700,
  ...props 
}: TooltipProps) => {
  if (!content) {
    return children
  }

  return (
    <StyledTooltip
      title={content}
      placement={side}
      arrow
      enterDelay={delayDuration}
      {...props}
    >
      {children}
    </StyledTooltip>
  )
}

const TooltipTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement; asChild?: boolean }>(
  ({ children, asChild }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { ref })
    }
    return children
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<HTMLDivElement, { 
  children: React.ReactNode
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}>(({ children, className }, ref) => (
  <div ref={ref} className={className}>
    {children}
  </div>
))
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }