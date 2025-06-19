import * as React from "react"
import { TextField, TextFieldProps, styled } from "@mui/material"

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '2.5rem',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    fontSize: '0.875rem',
    
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    
    '&:hover fieldset': {
      borderColor: theme.palette.action.hover,
    },
    
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.5),
    fontSize: '0.875rem',
    
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    
    '&[type="file"]': {
      border: 0,
      backgroundColor: 'transparent',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
  },
  
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  
  '@media (min-width: 768px)': {
    '& .MuiInputBase-input': {
      fontSize: '0.875rem',
    },
  },
}))

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <StyledTextField
        variant="outlined"
        type={type}
        inputRef={ref}
        fullWidth
        size="small"
        {...props}
        sx={{
          width: '100%',
          ...props.sx,
        }}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
