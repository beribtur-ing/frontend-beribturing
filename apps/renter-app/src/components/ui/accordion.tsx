
import * as React from "react"
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import {ChevronDown} from "lucide-react"

import {cn} from "../../lib/utils"

interface AccordionProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
}

const Accordion = ({ children, className, ...props }: AccordionProps) => (
  <div className={cn("w-full", className)} {...props}>
    {children}
  </div>
)

interface AccordionItemProps {
  children: React.ReactNode
  value: string
  className?: string
}

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ className, children, value, ...props }, ref) => (
  <MuiAccordion
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  >
    {children}
  </MuiAccordion>
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <AccordionSummary
    ref={ref}
    expandIcon={<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
      className
    )}
    {...props}
  >
    <Typography>{children}</Typography>
  </AccordionSummary>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <AccordionDetails
    ref={ref}
    className={cn("overflow-hidden text-sm transition-all pb-4 pt-0", className)}
    {...props}
  >
    {children}
  </AccordionDetails>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
