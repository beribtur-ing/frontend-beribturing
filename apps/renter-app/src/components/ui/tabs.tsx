
import * as React from "react"
import { Tabs as MuiTabs, Tab, TabPanel, Box } from "@mui/material"

import {cn} from "../../lib/utils"

interface TabsProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  orientation?: "horizontal" | "vertical"
}

const Tabs = ({ children, value, onValueChange, defaultValue, orientation = "horizontal" }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue || '')
  
  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value)
    }
  }, [value])
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
    onValueChange?.(newValue)
  }
  
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value: activeTab,
            onChange: handleChange,
            orientation,
          })
        }
        return child
      })}
    </div>
  )
}

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onChange?: (event: React.SyntheticEvent, newValue: string) => void
    orientation?: "horizontal" | "vertical"
  }
>(({ className, children, value, onChange, orientation, ...props }, ref) => (
  <MuiTabs
    ref={ref}
    value={value}
    onChange={onChange}
    orientation={orientation}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </MuiTabs>
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, value, children, ...props }, ref) => (
  <Tab
    ref={ref}
    value={value}
    label={children}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsContent = React.forwardRef<
  HTMLDivElement,
  TabsContentProps
>(({ className, value, children, ...props }, ref) => (
  <Box
    ref={ref}
    role="tabpanel"
    id={`tabpanel-${value}`}
    aria-labelledby={`tab-${value}`}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
  </Box>
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
