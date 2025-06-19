
import * as React from "react"
import { Box } from "@mui/material"

import {cn} from "../../lib/utils"

interface AspectRatioProps {
  ratio?: number
  children: React.ReactNode
  className?: string
}

const AspectRatio = React.forwardRef<
  HTMLDivElement,
  AspectRatioProps
>(({ ratio = 1, children, className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn("relative w-full", className)}
    sx={{
      aspectRatio: ratio,
      overflow: 'hidden',
    }}
    {...props}
  >
    {children}
  </Box>
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
