

import * as React from "react"
import { Dialog as MUIDialog, DialogTitle as MUIDialogTitle, DialogContent as MUIDialogContent, DialogActions, IconButton, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { X } from "lucide-react"

const StyledDialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    maxWidth: '512px',
    width: '100%',
    margin: '16px',
  },
}))

const StyledDialogContent = styled(MUIDialogContent)(({ theme }) => ({
  padding: '24px',
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

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const handleClose = () => {
    onOpenChange?.(false)
  }

  return (
    <StyledDialog
      open={open || false}
      onClose={handleClose}
      maxWidth={false}
    >
      {children}
    </StyledDialog>
  )
}

const DialogTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement; asChild?: boolean }>(({ children, asChild }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ref })
  }
  return children
})
DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

const DialogClose = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <CloseButton ref={ref} className={className}>
    {children}
  </CloseButton>
))
DialogClose.displayName = "DialogClose"

const DialogOverlay = React.forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => (
  <div ref={ref} className={className} />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <StyledDialogContent ref={ref} className={className}>
    {children}
    <CloseButton>
      <X size={16} />
      <span className="sr-only">Close</span>
    </CloseButton>
  </StyledDialogContent>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <Box ref={ref} className={className} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: { xs: 'center', sm: 'left' } }} {...props}>
    {children}
  </Box>
))
DialogHeader.displayName = "DialogHeader"

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <DialogActions ref={ref} className={className} sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 1 }} {...props}>
    {children}
  </DialogActions>
))
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<HTMLHeadingElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <MUIDialogTitle ref={ref} className={className} sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1, padding: 0 }}>
    {children}
  </MUIDialogTitle>
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <Box ref={ref} component="p" className={className} sx={{ fontSize: '14px', color: 'text.secondary', margin: 0 }}>
    {children}
  </Box>
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
