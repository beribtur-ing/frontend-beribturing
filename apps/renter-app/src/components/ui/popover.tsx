
import * as React from "react"
import { Popover as MuiPopover } from "@mui/material"

import {cn} from "../../lib/utils"

interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover = ({ children, open, onOpenChange }: PopoverProps) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === PopoverContent) {
          return React.cloneElement(child as React.ReactElement<any>, {
            open,
            onClose: () => onOpenChange?.(false),
          })
        }
        return child
      })}
    </div>
  )
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
))
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  align?: "center" | "start" | "end"
  sideOffset?: number
  open?: boolean
  anchorEl?: Element | null
  onClose?: () => void
}

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, children, open, anchorEl, onClose, ...props }, ref) => (
  <MuiPopover
    open={open || false}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: align === 'center' ? 'center' : align === 'start' ? 'left' : 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: align === 'center' ? 'center' : align === 'start' ? 'left' : 'right',
    }}
    PaperProps={{
      className: cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        className
      ),
      ref,
    }}
    {...props}
  >
    {children}
  </MuiPopover>
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
