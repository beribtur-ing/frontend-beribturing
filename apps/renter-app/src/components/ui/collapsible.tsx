
import * as React from "react"
import { Collapse, styled } from "@mui/material"

interface CollapsibleProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Collapsible = ({ children, open, onOpenChange }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === CollapsibleTrigger) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: () => handleOpenChange(!isOpen),
            })
          }
          if (child.type === CollapsibleContent) {
            return React.cloneElement(child as React.ReactElement<any>, {
              open: isOpen,
            })
          }
        }
        return child
      })}
    </div>
  )
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
))
CollapsibleTrigger.displayName = "CollapsibleTrigger"

interface CollapsibleContentProps {
  children: React.ReactNode
  open?: boolean
}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children, open, ...props }, ref) => (
  <Collapse in={open} ref={ref} {...props}>
    <div>{children}</div>
  </Collapse>
))
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
