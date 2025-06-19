import * as React from "react"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Collapse,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  Grow
} from "@mui/material"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

// Context for navigation menu state
type NavigationMenuContextType = {
  activeItem: string | null
  setActiveItem: (item: string | null) => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType | null>(null)

const NavigationMenu = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <Box
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </Box>
    </NavigationMenuContext.Provider>
  )
})
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ children, ...props }, ref) => (
  <ListItem ref={ref} sx={{ width: 'auto', padding: 0 }} {...props}>
    {children}
  </ListItem>
))
NavigationMenuItem.displayName = "NavigationMenuItem"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    value?: string
  }
>(({ className, children, value, onClick, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const isOpen = Boolean(anchorEl) && context?.activeItem === value

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    setAnchorEl(event.currentTarget)
    context?.setActiveItem(value || null)
  }

  return (
    <Button
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      onClick={handleClick}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className={cn(
          "relative top-[1px] ml-1 h-3 w-3 transition duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </Button>
  )
})
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    value?: string
  }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  const isActive = context?.activeItem === value

  return (
    <Box
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
        className
      )}
      sx={{
        display: isActive ? 'block' : 'none',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 50
      }}
      {...props}
    >
      <Paper elevation={3} sx={{ p: 1 }}>
        {children}
      </Paper>
    </Box>
  )
})
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a">
>(({ className, ...props }, ref) => (
  <Button
    component="a"
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), className)}
    {...props}
  />
))
NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  
  const handleClickAway = () => {
    context?.setActiveItem(null)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box 
        ref={ref}
        className={cn("absolute left-0 top-full flex justify-center", className)}
        {...props}
      />
    </ClickAwayListener>
  )
})
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <Box className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </Box>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
