import * as React from "react"
import { Accordion as MUIAccordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ChevronDown } from "lucide-react"

const StyledAccordion = styled(MUIAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 'auto',
  },
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: 'transparent',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  padding: '16px',
  minHeight: 'auto',
  '&.Mui-expanded': {
    minHeight: 'auto',
  },
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 16px 16px',
  borderTop: `1px solid ${theme.palette.divider}`,
}))

export interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}

const Accordion = ({ type = 'single', collapsible, children, className }: AccordionProps) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { key: index })
        }
        return child
      })}
    </div>
  )
}

export interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
  return (
    <StyledAccordion className={className}>
      {children}
    </StyledAccordion>
  )
}

export interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

const AccordionTrigger = React.forwardRef<HTMLDivElement, AccordionTriggerProps>(
  ({ children, className }, ref) => (
    <StyledAccordionSummary
      ref={ref}
      className={className}
      expandIcon={<ChevronDown size={16} />}
    >
      {children}
    </StyledAccordionSummary>
  )
)
AccordionTrigger.displayName = "AccordionTrigger"

export interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className }, ref) => (
    <StyledAccordionDetails ref={ref} className={className}>
      {children}
    </StyledAccordionDetails>
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }