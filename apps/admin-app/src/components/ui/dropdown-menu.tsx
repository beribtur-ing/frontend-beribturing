import * as React from "react"
import { Menu, MenuItem, MenuList, Divider, ListItemIcon, ListItemText } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '6px',
    minWidth: '180px',
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.divider}`,
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '14px',
  padding: '8px 12px',
  minHeight: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
}))

export interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenu = ({ children, open, onOpenChange }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isOpen = open !== undefined ? open : Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    onOpenChange?.(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    onOpenChange?.(false)
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { onClick: handleClick })
        }
        if (React.isValidElement(child) && child.type === DropdownMenuContent) {
          return (
            <StyledMenu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {child.props.children}
            </StyledMenu>
          )
        }
        return child
      })}
    </>
  )
}

const DropdownMenuTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement; asChild?: boolean; onClick?: (event: React.MouseEvent<HTMLElement>) => void }>(
  ({ children, asChild, onClick }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { 
        ref,
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          onClick?.(event)
          children.props.onClick?.(event)
        }
      })
    }
    return React.cloneElement(children, { ref, onClick })
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; sideOffset?: number; align?: 'start' | 'center' | 'end' }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<HTMLLIElement, { children: React.ReactNode; className?: string; disabled?: boolean; onClick?: () => void }>(
  ({ children, className, disabled, onClick }, ref) => (
    <StyledMenuItem ref={ref} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </StyledMenuItem>
  )
)
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<HTMLLIElement, { children: React.ReactNode; className?: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }>(
  ({ children, className, checked, onCheckedChange }, ref) => (
    <StyledMenuItem 
      ref={ref} 
      className={className} 
      onClick={() => onCheckedChange?.(!checked)}
    >
      {children}
    </StyledMenuItem>
  )
)
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<HTMLLIElement, { children: React.ReactNode; className?: string; value: string; checked?: boolean }>(
  ({ children, className, value, checked }, ref) => (
    <StyledMenuItem ref={ref} className={className}>
      {children}
    </StyledMenuItem>
  )
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className} style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#666' }}>
      {children}
    </div>
  )
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<HTMLHRElement, { className?: string }>(
  ({ className }, ref) => (
    <Divider ref={ref} className={className} />
  )
)
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = React.forwardRef<HTMLSpanElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <span ref={ref} className={className} style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.6 }}>
      {children}
    </span>
  )
)
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuGroup = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
DropdownMenuGroup.displayName = "DropdownMenuGroup"

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

const DropdownMenuSub = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
DropdownMenuSub.displayName = "DropdownMenuSub"

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <StyledMenuItem ref={ref} className={className}>
      {children}
    </StyledMenuItem>
  )
)
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; value?: string; onValueChange?: (value: string) => void }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}