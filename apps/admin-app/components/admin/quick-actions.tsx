import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, AlertTriangle, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <Button key={index} variant={action.variant} className="w-full justify-start h-auto p-4" asChild>
            <Link href={action.href}>
              <action.icon className="mr-3 h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs opacity-70">{action.description}</div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
