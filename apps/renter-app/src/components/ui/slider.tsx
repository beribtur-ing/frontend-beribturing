
import * as React from "react"
import { Slider as MuiSlider } from "@mui/material"

import {cn} from "../../lib/utils"

interface SliderProps {
  value?: number | number[]
  onValueChange?: (value: number | number[]) => void
  defaultValue?: number | number[]
  min?: number
  max?: number
  step?: number
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<
  HTMLDivElement,
  SliderProps
>(({ className, value, onValueChange, defaultValue, ...props }, ref) => (
  <MuiSlider
    ref={ref}
    value={value}
    onChange={(_, newValue) => onValueChange?.(newValue)}
    defaultValue={defaultValue}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  />
))
Slider.displayName = "Slider"

export { Slider }
