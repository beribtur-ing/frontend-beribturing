
import * as React from "react"
import { Divider } from "@mui/material"

import {cn} from "../../lib/utils"

interface SeparatorProps {
  className?: string
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<
  HTMLDivElement,
  SeparatorProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <Divider
      ref={ref}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
