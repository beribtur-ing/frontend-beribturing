

import * as React from "react"
import { Tabs as MUITabs, Tab, TabPanel, Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledTabs = styled(MUITabs)(({ theme }) => ({
  minHeight: 40,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  minHeight: 40,
  padding: '6px 12px',
  margin: '0 2px',
  borderRadius: '4px',
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  '&.Mui-selected': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const StyledTabPanel = styled(Box)(({ theme }) => ({
  marginTop: '8px',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}))

export interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onValueChange, children, className, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(value || '')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setActiveTab(newValue)
      onValueChange?.(newValue)
    }

    return (
      <div ref={ref} className={className} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { value: activeTab, onChange: handleChange })
          }
          return child
        })}
      </div>
    )
  }
)
Tabs.displayName = "Tabs"

export interface TabsListProps {
  children: React.ReactNode
  className?: string
  value?: string
  onChange?: (event: React.SyntheticEvent, value: string) => void
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, value, onChange, ...props }, ref) => (
    <StyledTabs
      ref={ref}
      value={value}
      onChange={onChange}
      className={className}
      variant="scrollable"
      scrollButtons="auto"
      {...props}
    >
      {children}
    </StyledTabs>
  )
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className, disabled, ...props }, ref) => (
    <StyledTab
      ref={ref}
      value={value}
      label={children}
      disabled={disabled}
      className={className}
      {...props}
    />
  )
)
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className, ...props }, ref) => (
    <StyledTabPanel
      ref={ref}
      role="tabpanel"
      className={className}
      {...props}
    >
      {children}
    </StyledTabPanel>
  )
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
