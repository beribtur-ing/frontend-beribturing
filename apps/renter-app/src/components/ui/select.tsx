
import * as React from "react"
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  ListSubheader,
  Divider,
} from "@mui/material"
import {Check, ChevronDown, ChevronUp} from "lucide-react"

import {cn} from "../../lib/utils"

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

const Select = ({ children, value, onValueChange, defaultValue }: SelectProps) => {
  return (
    <FormControl fullWidth>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value,
            onChange: (e: any) => onValueChange?.(e.target.value),
            defaultValue,
          })
        }
        return child
      })}
    </FormControl>
  )
}

const SelectGroup = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

interface SelectValueProps {
  placeholder?: string
  className?: string
}

const SelectValue = ({ placeholder, className }: SelectValueProps) => (
  <span className={cn("text-muted-foreground", className)}>
    {placeholder}
  </span>
)

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
  value?: string
  onChange?: (event: any) => void
  defaultValue?: string
}

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  SelectTriggerProps
>(({ className, children, value, onChange, defaultValue, ...props }, ref) => (
  <MuiSelect
    ref={ref}
    value={value || defaultValue || ''}
    onChange={onChange}
    displayEmpty
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    IconComponent={() => <ChevronDown className="h-4 w-4 opacity-50" />}
    {...props}
  >
    {children}
  </MuiSelect>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </div>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </div>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ListSubheader
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

interface SelectItemProps {
  className?: string
  children: React.ReactNode
  value: string
}

const SelectItem = React.forwardRef<
  HTMLLIElement,
  SelectItemProps
>(({ className, children, value, ...props }, ref) => (
  <MenuItem
    ref={ref}
    value={value}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </span>
    {children}
  </MenuItem>
))
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <Divider
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
