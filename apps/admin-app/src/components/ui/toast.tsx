import * as React from "react"
import { Snackbar, Alert, AlertTitle, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import { X } from "lucide-react"

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  padding: '16px',
  gap: '16px',
  minWidth: '356px',
  '& .MuiAlert-message': {
    padding: 0,
    width: '100%',
  },
  '& .MuiAlert-action': {
    padding: 0,
    marginRight: 0,
  },
}))

export interface ToastProps {
  open?: boolean
  onClose?: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'destructive'
  children?: React.ReactNode
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ open, onClose, title, description, variant = 'default', children }, ref) => {
    const severity = variant === 'destructive' ? 'error' : 'info'
    
    return (
      <Snackbar
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <StyledAlert
          ref={ref}
          severity={severity}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onClose}
            >
              <X size={16} />
            </IconButton>
          }
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <div>{description}</div>}
          {children}
        </StyledAlert>
      </Snackbar>
    )
  }
)
Toast.displayName = "Toast"

const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

const ToastViewport = React.forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => (
  <div ref={ref} className={className} />
))
ToastViewport.displayName = "ToastViewport"

const ToastAction = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; className?: string; onClick?: () => void }>(
  ({ children, className, onClick }, ref) => (
    <button ref={ref} className={className} onClick={onClick}>
      {children}
    </button>
  )
)
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<HTMLButtonElement, { className?: string; onClick?: () => void }>(
  ({ className, onClick }, ref) => (
    <IconButton ref={ref} className={className} onClick={onClick} size="small">
      <X size={16} />
    </IconButton>
  )
)
ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <AlertTitle ref={ref} className={className}>
      {children}
    </AlertTitle>
  )
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLParagraphElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
ToastDescription.displayName = "ToastDescription"

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}