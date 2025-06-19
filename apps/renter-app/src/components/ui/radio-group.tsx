
import * as React from "react"
import {
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import {Circle} from "lucide-react"

import {cn} from "../../lib/utils"

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  className?: string
  children: React.ReactNode
}

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(({ className, value, onValueChange, defaultValue, children, ...props }, ref) => {
  return (
    <MuiRadioGroup
      ref={ref}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      defaultValue={defaultValue}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {children}
    </MuiRadioGroup>
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps {
  value: string
  id?: string
  className?: string
  disabled?: boolean
}

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(({ className, value, ...props }, ref) => {
  return (
    <Radio
      ref={ref}
      value={value}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      icon={<Circle className="h-2.5 w-2.5" />}
      checkedIcon={<Circle className="h-2.5 w-2.5 fill-current text-current" />}
      {...props}
    />
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
