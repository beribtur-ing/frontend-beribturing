import * as React from "react"
import { Menu, MenuItem, MenuList, Divider, ListItemIcon, ListItemText, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../../lib/utils"

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    minWidth: '128px',
    padding: '4px',
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: '4px',
  padding: '6px 8px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
}))

interface ContextMenuProps {
  children: React.ReactNode
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  return <>{children}</>
}

interface ContextMenuTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const ContextMenuTrigger = React.forwardRef<HTMLElement, ContextMenuTriggerProps>(
  ({ children, asChild }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { ref })
    }
    return children
  }
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

const ContextMenuGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>

const ContextMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

const ContextMenuSub = ({ children }: { children: React.ReactNode }) => <>{children}</>

const ContextMenuRadioGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>

interface ContextMenuSubTriggerProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
}

const ContextMenuSubTrigger = React.forwardRef<HTMLLIElement, ContextMenuSubTriggerProps>(
  ({ className, inset, children }, ref) => (
    <StyledMenuItem
      ref={ref}
      className={cn(inset && "pl-8", className)}
    >
      {children}
      <ListItemIcon sx={{ minWidth: 'auto', ml: 'auto' }}>
        <ChevronRight className="h-4 w-4" />
      </ListItemIcon>
    </StyledMenuItem>
  )
)
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

interface ContextMenuSubContentProps {
  children: React.ReactNode
  className?: string
}

const ContextMenuSubContent = React.forwardRef<HTMLUListElement, ContextMenuSubContentProps>(
  ({ className, children }, ref) => (
    <MenuList ref={ref} className={className}>
      {children}
    </MenuList>
  )
)
ContextMenuSubContent.displayName = "ContextMenuSubContent"

interface ContextMenuContentProps {
  children: React.ReactNode
  className?: string
  open?: boolean
  onClose?: () => void
  anchorEl?: HTMLElement | null
}

const ContextMenuContent = React.forwardRef<HTMLUListElement, ContextMenuContentProps>(
  ({ className, children, open = false, onClose, anchorEl }, ref) => (
    <StyledMenu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <MenuList ref={ref} className={className}>
        {children}
      </MenuList>
    </StyledMenu>
  )
)
ContextMenuContent.displayName = "ContextMenuContent"

interface ContextMenuItemProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
  disabled?: boolean
  onClick?: () => void
}

const ContextMenuItem = React.forwardRef<HTMLLIElement, ContextMenuItemProps>(
  ({ className, inset, children, disabled, onClick }, ref) => (
    <StyledMenuItem
      ref={ref}
      className={cn(inset && "pl-8", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledMenuItem>
  )
)
ContextMenuItem.displayName = "ContextMenuItem"

interface ContextMenuCheckboxItemProps {
  children: React.ReactNode
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const ContextMenuCheckboxItem = React.forwardRef<HTMLLIElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange }, ref) => (
    <StyledMenuItem
      ref={ref}
      className={cn("pl-8", className)}
      onClick={() => onCheckedChange?.(!checked)}
    >
      <Box sx={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', width: 14, height: 14 }}>
        {checked && <Check className="h-4 w-4" />}
      </Box>
      {children}
    </StyledMenuItem>
  )
)
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

interface ContextMenuRadioItemProps {
  children: React.ReactNode
  className?: string
  value: string
  checked?: boolean
  onSelect?: (value: string) => void
}

const ContextMenuRadioItem = React.forwardRef<HTMLLIElement, ContextMenuRadioItemProps>(
  ({ className, children, value, checked, onSelect }, ref) => (
    <StyledMenuItem
      ref={ref}
      className={cn("pl-8", className)}
      onClick={() => onSelect?.(value)}
    >
      <Box sx={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', width: 14, height: 14 }}>
        {checked && <Circle className="h-2 w-2 fill-current" />}
      </Box>
      {children}
    </StyledMenuItem>
  )
)
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

interface ContextMenuLabelProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
}

const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ className, inset, children }, ref) => (
    <Box
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    >
      {children}
    </Box>
  )
)
ContextMenuLabel.displayName = "ContextMenuLabel"

const ContextMenuSeparator = React.forwardRef<HTMLHRElement, { className?: string }>(
  ({ className }, ref) => (
    <Divider ref={ref} className={cn("my-1", className)} />
  )
)
ContextMenuSeparator.displayName = "ContextMenuSeparator"

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}