import * as React from "react"
import { 
  Card as MuiCard, 
  CardContent as MuiCardContent, 
  CardHeader as MuiCardHeader,
  CardActions,
  Typography,
  styled
} from "@mui/material"

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
}))

const StyledCardHeader = styled(MuiCardHeader)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(3),
}))

const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: 0,
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}))

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  paddingTop: 0,
}))

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MuiCard>>(
  ({ children, ...props }, ref) => (
    <StyledCard ref={ref} {...props}>
      {children}
    </StyledCard>
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <StyledCardHeader 
      ref={ref} 
      {...props}
      title={null}
      subheader={null}
    >
      {children}
    </StyledCardHeader>
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <Typography 
      ref={ref}
      variant="h5"
      component="div"
      sx={{
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: '-0.025em',
      }}
      {...props}
    >
      {children}
    </Typography>
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <Typography 
      ref={ref}
      variant="body2"
      color="text.secondary"
      sx={{ fontSize: '0.875rem' }}
      {...props}
    >
      {children}
    </Typography>
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MuiCardContent>>(
  ({ children, ...props }, ref) => (
    <StyledCardContent ref={ref} {...props}>
      {children}
    </StyledCardContent>
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CardActions>>(
  ({ children, ...props }, ref) => (
    <StyledCardActions ref={ref} {...props}>
      {children}
    </StyledCardActions>
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
