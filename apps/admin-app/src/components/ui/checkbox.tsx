

import * as React from "react"
import { Checkbox as MUICheckbox, CheckboxProps as MUICheckboxProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledCheckbox = styled(MUICheckbox)(({ theme }) => ({
  padding: 0,
  width: '16px',
  height: '16px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
  '&.Mui-disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
    borderRadius: '2px',
  },
}))

export interface CheckboxProps extends Omit<MUICheckboxProps, 'size'> {}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <StyledCheckbox
      ref={ref}
      className={className}
      {...props}
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
