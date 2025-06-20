import { Card, CardContent, CardHeader, Button, Typography, Box } from "@mui/material"
import { Building2, AlertTriangle, Settings, BarChart3 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const quickActions = [
  {
    title: "Review Pending Properties",
    description: "12 properties awaiting approval",
    icon: Building2,
    href: "/properties?status=pending",
    variant: "default" as const,
  },
  {
    title: "Handle Reports",
    description: "3 new user reports",
    icon: AlertTriangle,
    href: "/reports",
    variant: "destructive" as const,
  },
  {
    title: "View Analytics",
    description: "Check platform performance",
    icon: BarChart3,
    href: "/analytics",
    variant: "secondary" as const,
  },
  {
    title: "System Settings",
    description: "Configure platform settings",
    icon: Settings,
    href: "/settings",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  const location = useLocation()
  const locale = location.pathname.split('/')[1] || 'en'

  return (
    <Card>
      <CardHeader 
        title="Quick Actions"
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {quickActions.map((action, index) => (
            <Button 
              key={index} 
              variant={action.variant === 'destructive' ? 'contained' : action.variant === 'outline' ? 'outlined' : 'contained'}
              color={action.variant === 'destructive' ? 'error' : 'primary'}
              component={Link}
              to={`/${locale}${action.href}`}
              sx={{ 
                justifyContent: 'flex-start', 
                textAlign: 'left',
                py: 2,
                px: 2
              }}
              startIcon={<action.icon size={16} />}
            >
              <Box>
                <Typography variant="body2" fontWeight="medium" display="block">
                  {action.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {action.description}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
