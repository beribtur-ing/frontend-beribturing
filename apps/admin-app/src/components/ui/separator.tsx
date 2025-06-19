

import * as React from "react"
import { Divider, DividerProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  flexShrink: 0,
}))

export interface SeparatorProps extends Omit<DividerProps, 'orientation'> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <StyledDivider
      ref={ref}
      orientation={orientation}
      className={className}
      role={decorative ? "presentation" : "separator"}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
