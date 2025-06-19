
import * as React from "react"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import {type VariantProps} from "class-variance-authority"

import {cn} from "../../lib/utils"
import {toggleVariants} from "./toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

interface ToggleGroupProps {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  ToggleGroupProps
>(({ className, variant, size, children, type, value, onValueChange, ...props }, ref) => (
  <ToggleButtonGroup
    ref={ref}
    exclusive={type === "single"}
    value={value}
    onChange={(e, newValue) => onValueChange?.(newValue)}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleButtonGroup>
))
ToggleGroup.displayName = "ToggleGroup"

interface ToggleGroupItemProps {
  value: string
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, children, variant, size, value, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleButton
      ref={ref}
      value={value}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleButton>
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
