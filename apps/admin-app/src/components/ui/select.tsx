import * as React from "react"
import { FormControl, Select as MUISelect, MenuItem, InputLabel, Box, Chip } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ChevronDown, Check } from "lucide-react"

const StyledSelect = styled(MUISelect)(({ theme }) => ({
  height: 40,
  fontSize: '14px',
  '& .MuiSelect-select': {
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },
  '&.Mui-disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '14px',
  padding: '8px 12px',
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  disabled?: boolean
  placeholder?: string
  className?: string
}

const Select = ({ value, onValueChange, children, disabled, placeholder, className }: SelectProps) => {
  const handleChange = (event: any) => {
    onValueChange?.(event.target.value)
  }

  return (
    <FormControl fullWidth disabled={disabled} className={className}>
      <StyledSelect
        value={value || ''}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        IconComponent={ChevronDown}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {children}
      </StyledSelect>
    </FormControl>
  )
}

const SelectGroup = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
SelectGroup.displayName = "SelectGroup"

const SelectValue = React.forwardRef<HTMLSpanElement, { placeholder?: string; className?: string }>(
  ({ placeholder, className }, ref) => (
    <span ref={ref} className={className}>
      {placeholder}
    </span>
  )
)
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={className} />
  )
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={className} />
  )
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; position?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
)
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <InputLabel ref={ref} className={className} sx={{ fontSize: '14px', fontWeight: 500 }}>
      {children}
    </InputLabel>
  )
)
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<HTMLLIElement, { value: string; children: React.ReactNode; className?: string }>(
  ({ value, children, className }, ref) => (
    <StyledMenuItem ref={ref} value={value} className={className}>
      {children}
    </StyledMenuItem>
  )
)
SelectItem.displayName = "SelectItem"

const SelectItemText = React.forwardRef<HTMLSpanElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
)
SelectItemText.displayName = "SelectItemText"

const SelectItemIndicator = React.forwardRef<HTMLSpanElement, { children?: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <span ref={ref} className={className}>
      {children || <Check size={16} />}
    </span>
  )
)
SelectItemIndicator.displayName = "SelectItemIndicator"

const SelectSeparator = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <Box ref={ref} className={className} sx={{ borderTop: '1px solid', borderColor: 'divider', margin: '4px 0' }} />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectLabel,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectSeparator,
}