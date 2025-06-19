
import * as React from "react"
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Box,
  Fade
} from "@mui/material"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../../lib/utils"

// Menu context for sub-menus
type MenuContextType = {
  anchorEl: HTMLElement | null
  setAnchorEl: (el: HTMLElement | null) => void
  open: boolean
}

const MenuContext = React.createContext<MenuContextType | null>(null)

const MenubarMenu = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{}>
>(({ children }, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  return (
    <MenuContext.Provider value={{ anchorEl, setAnchorEl, open }}>
      <Box ref={ref}>{children}</Box>
    </MenuContext.Provider>
  )
})
MenubarMenu.displayName = "MenubarMenu"

const MenubarGroup = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{}>
>(({ children }, ref) => (
  <MenuList ref={ref} dense>
    {children}
  </MenuList>
))
MenubarGroup.displayName = "MenubarGroup"

// For compatibility - no portal needed with MUI
const MenubarPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

const MenubarSub = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{}>
>(({ children }, ref) => (
  <Box ref={ref}>{children}</Box>
))
MenubarSub.displayName = "MenubarSub"

const MenubarRadioGroup = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{}>
>(({ children }, ref) => (
  <MenuList ref={ref} dense>
    {children}
  </MenuList>
))
MenubarRadioGroup.displayName = "MenubarRadioGroup"

const Menubar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <AppBar
    position="static"
    elevation={0}
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  >
    <Toolbar variant="dense" sx={{ minHeight: 40, paddingX: 1 }}>
      {props.children}
    </Toolbar>
  </AppBar>
))
Menubar.displayName = "Menubar"

const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, onClick, ...props }, ref) => {
  const context = React.useContext(MenuContext)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    context?.setAnchorEl(event.currentTarget)
  }

  return (
    <Button
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      onClick={handleClick}
      {...props}
    />
  )
})
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarSubTrigger = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li"> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    <ListItemText>{children}</ListItemText>
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenuItem>
))
MenubarSubTrigger.displayName = "MenubarSubTrigger"

const MenubarSubContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <Menu
    ref={ref}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "left" }}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = "MenubarSubContent"

const MenubarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    align?: "start" | "center" | "end"
    alignOffset?: number
    sideOffset?: number
  }
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => {
    const context = React.useContext(MenuContext)
    
    const handleClose = () => {
      context?.setAnchorEl(null)
    }

    return (
      <Menu
        ref={ref}
        anchorEl={context?.anchorEl}
        open={context?.open || false}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: align === "start" ? "left" : align === "end" ? "right" : "center" }}
        transformOrigin={{ vertical: "top", horizontal: align === "start" ? "left" : align === "end" ? "right" : "center" }}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    )
  }
)
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li"> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li"> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <ListItemIcon sx={{ minWidth: 28 }}>
      {checked && <Check className="h-4 w-4" />}
    </ListItemIcon>
    <ListItemText>{children}</ListItemText>
  </MenuItem>
))
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li"> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <ListItemIcon sx={{ minWidth: 28 }}>
      {checked && <Circle className="h-2 w-2 fill-current" />}
    </ListItemIcon>
    <ListItemText>{children}</ListItemText>
  </MenuItem>
))
MenubarRadioItem.displayName = "MenubarRadioItem"

const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Typography
    component="div"
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<
  HTMLHRElement,
  React.ComponentProps<"hr">
>(({ className, ...props }, ref) => (
  <Divider
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = ({
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
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
