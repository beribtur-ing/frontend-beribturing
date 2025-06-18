import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback } from "../ui/avatar"

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "completed rental",
    item: "Professional Camera Kit",
    time: "2 hours ago",
    type: "rental",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "listed new property",
    item: "Drone with 4K Camera",
    time: "4 hours ago",
    type: "listing",
  },
  {
    id: 3,
    user: "Bob Wilson",
    action: "cancelled booking",
    item: "Mountain Bike",
    time: "6 hours ago",
    type: "cancellation",
  },
  {
    id: 4,
    user: "Alice Johnson",
    action: "received payment",
    item: "Power Drill Set",
    time: "8 hours ago",
    type: "payment",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                <span className="font-medium">{activity.item}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge
              variant={
                activity.type === "rental"
                  ? "default"
                  : activity.type === "listing"
                    ? "secondary"
                    : activity.type === "cancellation"
                      ? "destructive"
                      : "outline"
              }
            >
              {activity.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
