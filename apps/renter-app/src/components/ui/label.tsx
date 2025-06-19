
import * as React from "react"
import { FormLabel, FormLabelProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledLabel = styled(FormLabel)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1,
  color: theme.palette.text.primary,
  '&.Mui-disabled': {
    cursor: 'not-allowed',
    opacity: 0.7,
  },
}))

export interface LabelProps extends FormLabelProps {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, ...props }, ref) => (
    <StyledLabel
      ref={ref}
      component="label"
      {...props}
    >
      {children}
    </StyledLabel>
  )
)
Label.displayName = "Label"

export { Label }
