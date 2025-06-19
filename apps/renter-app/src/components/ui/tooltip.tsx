
import * as React from "react"
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from "@mui/material"

import {cn} from "../../lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

interface TooltipProps {
  children: React.ReactNode
}

const Tooltip = ({ children }: TooltipProps) => <>{children}</>

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, ...props }, ref) => (
  React.cloneElement(children as React.ReactElement, { ref, ...props })
))
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
  sideOffset?: number
}

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null)
  
  return (
    <MuiTooltip
      title={children}
      placement="top"
      arrow
      classes={{
        tooltip: cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          className
        ),
      }}
      {...props}
    >
      <span ref={ref}>{children}</span>
    </MuiTooltip>
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
