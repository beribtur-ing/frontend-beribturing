
import * as React from "react"
import { LinearProgress } from "@mui/material"

import {cn} from "../../lib/utils"

interface ProgressProps {
  value?: number
  className?: string
}

const Progress = React.forwardRef<
  HTMLDivElement,
  ProgressProps
>(({ className, value, ...props }, ref) => (
  <LinearProgress
    ref={ref}
    variant={value !== undefined ? "determinate" : "indeterminate"}
    value={value}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  />
))
Progress.displayName = "Progress"

export { Progress }
