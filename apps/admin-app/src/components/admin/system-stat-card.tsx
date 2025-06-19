import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface SystemStatCardProps {
  title: string
  value: string
  icon: LucideIcon
  description: string
  trend: string
  variant?: "default" | "warning" | "info"
}

export function SystemStatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
}: SystemStatCardProps) {
  const getColor = () => {
    switch (variant) {
      case 'warning': return 'warning.main'
      case 'info': return 'info.main'
      default: return 'text.secondary'
    }
  }

  const getTrendColor = () => {
    switch (variant) {
      case 'warning': return 'warning.main'
      case 'info': return 'info.main'
      default: return 'success.main'
    }
  }

  return (
    <Card>
      <CardHeader 
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}
        title={
          <Typography variant="body2" component="div">
            {title}
          </Typography>
        }
        action={
          <Icon size={16} color={getColor()} />
        }
      />
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {description}
        </Typography>
        <Typography variant="caption" sx={{ color: getTrendColor(), mt: 0.5 }} display="block">
          {trend}
        </Typography>
      </CardContent>
    </Card>
  )
}
