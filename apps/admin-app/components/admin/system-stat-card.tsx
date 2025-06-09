import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={cn(
            "h-4 w-4",
            variant === "warning" && "text-orange-500",
            variant === "info" && "text-blue-500",
            variant === "default" && "text-muted-foreground",
          )}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p
          className={cn(
            "text-xs mt-1",
            variant === "warning" && "text-orange-600",
            variant === "info" && "text-blue-600",
            variant === "default" && "text-green-600",
          )}
        >
          {trend}
        </p>
      </CardContent>
    </Card>
  )
}
