import * as React from "react"
import { Drawer, Box, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import { X } from "lucide-react"

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    maxWidth: '400px',
    width: '100%',
  },
}))

const StyledSheetContent = styled(Box)(({ theme }) => ({
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '16px',
  top: '16px',
  padding: '4px',
  borderRadius: '4px',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}))

export interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  const handleClose = () => {
    onOpenChange?.(false)
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SheetTrigger) {
          return React.cloneElement(child, { 
            onClick: () => onOpenChange?.(true) 
          })
        }
        if (React.isValidElement(child) && child.type === SheetContent) {
          return (
            <StyledDrawer
              anchor="right"
              open={open || false}
              onClose={handleClose}
            >
              {child}
            </StyledDrawer>
          )
        }
        return child
      })}
    </>
  )
}

const SheetTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement; asChild?: boolean; onClick?: () => void }>(
  ({ children, asChild, onClick }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { 
        ref,
        onClick: (event: React.MouseEvent) => {
          onClick?.()
          children.props.onClick?.(event)
        }
      })
    }
    return React.cloneElement(children, { ref, onClick })
  }
)
SheetTrigger.displayName = "SheetTrigger"

const SheetClose = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; className?: string; onClick?: () => void }>(
  ({ children, className, onClick }, ref) => (
    <CloseButton ref={ref} className={className} onClick={onClick}>
      {children}
    </CloseButton>
  )
)
SheetClose.displayName = "SheetClose"

const SheetPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

const SheetOverlay = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={className} />
  )
)
SheetOverlay.displayName = "SheetOverlay"

export interface SheetContentProps {
  children: React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, className, side = 'right' }, ref) => (
    <StyledSheetContent ref={ref} className={className}>
      {children}
      <CloseButton>
        <X size={16} />
        <span className="sr-only">Close</span>
      </CloseButton>
    </StyledSheetContent>
  )
)
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Box ref={ref} className={className} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, marginBottom: 3 }}>
      {children}
    </Box>
  )
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Box ref={ref} className={className} sx={{ display: 'flex', gap: 1, marginTop: 'auto', justifyContent: 'flex-end' }}>
      {children}
    </Box>
  )
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<HTMLHeadingElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <h2 ref={ref} className={className} style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1, margin: 0 }}>
      {children}
    </h2>
  )
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<HTMLParagraphElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <p ref={ref} className={className} style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
      {children}
    </p>
  )
)
SheetDescription.displayName = "SheetDescription"

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}