

import * as React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledAlertDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    maxWidth: '512px',
    width: '100%',
    margin: '16px',
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '24px',
}))

export interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const AlertDialog = ({ open, onOpenChange, children }: AlertDialogProps) => {
  const handleClose = () => {
    onOpenChange?.(false)
  }

  return (
    <StyledAlertDialog
      open={open || false}
      onClose={handleClose}
      maxWidth={false}
    >
      {children}
    </StyledAlertDialog>
  )
}

const AlertDialogTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement; asChild?: boolean }>(({ children, asChild }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ref })
  }
  return children
})
AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

const AlertDialogOverlay = React.forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => (
  <div ref={ref} className={className} />
))
AlertDialogOverlay.displayName = "AlertDialogOverlay"

const AlertDialogContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <StyledDialogContent ref={ref} className={className}>
    {children}
  </StyledDialogContent>
))
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <Box ref={ref} className={className} sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: { xs: 'center', sm: 'left' } }} {...props}>
    {children}
  </Box>
))
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <DialogActions ref={ref} className={className} sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 1, marginTop: 2 }} {...props}>
    {children}
  </DialogActions>
))
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <DialogTitle ref={ref} className={className} sx={{ fontSize: '18px', fontWeight: 600, padding: 0 }}>
    {children}
  </DialogTitle>
))
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <Box ref={ref} component="p" className={className} sx={{ fontSize: '14px', color: 'text.secondary', margin: 0 }}>
    {children}
  </Box>
))
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; className?: string; onClick?: () => void }>(({ children, className, onClick }, ref) => (
  <Button ref={ref} className={className} variant="contained" onClick={onClick}>
    {children}
  </Button>
))
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; className?: string; onClick?: () => void }>(({ children, className, onClick }, ref) => (
  <Button ref={ref} className={className} variant="outlined" onClick={onClick}>
    {children}
  </Button>
))
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
