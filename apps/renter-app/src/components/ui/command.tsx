import * as React from "react"
import { Autocomplete, TextField, Box, List, ListItem, ListItemText, Divider, Dialog } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Search } from "lucide-react"

import { cn } from "../../lib/utils"

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
  },
  '& .MuiAutocomplete-listbox': {
    maxHeight: '400px',
    padding: 0,
  },
}))

const Command = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )}
      {...props}
    />
  )
)
Command.displayName = "Command"

interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const CommandDialog = ({ open = false, onOpenChange, children }: CommandDialogProps) => {
  return (
    <Dialog open={open} onClose={() => onOpenChange?.(false)} maxWidth="sm" fullWidth>
      <Command className="mx-auto max-w-sm">
        {children}
      </Command>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLInputElement>>(
  ({ className, placeholder, ...props }, ref) => (
    <Box className="flex items-center border-b px-3" sx={{ svg: { minWidth: 16, height: 16 } }}>
      <Search />
      <TextField
        ref={ref}
        variant="standard"
        placeholder={placeholder}
        className={cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)}
        InputProps={{
          disableUnderline: true,
        }}
        {...props}
      />
    </Box>
  )
)
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
)
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <Box
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
    />
  )
)
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { heading?: React.ReactNode }>(
  ({ className, heading, children, ...props }, ref) => (
    <Box ref={ref} className={cn("overflow-hidden p-1 text-foreground", className)} {...props}>
      {heading && (
        <Box className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </Box>
      )}
      <List disablePadding>
        {children}
      </List>
    </Box>
  )
)
CommandGroup.displayName = "CommandGroup"

const CommandSeparator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <Divider ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
  )
)
CommandSeparator.displayName = "CommandSeparator"

const CommandItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <ListItem
      ref={ref}
      button
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
)
CommandItem.displayName = "CommandItem"

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
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
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}