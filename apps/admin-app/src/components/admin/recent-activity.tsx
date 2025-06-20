import { Card, CardContent, CardHeader, Chip, Avatar, Typography, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"

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
  const getChipColor = (type: string) => {
    switch (type) {
      case "rental":
        return "primary";
      case "listing":
        return "secondary";
      case "cancellation":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader title="Recent Activity" />
      <CardContent>
        <List>
          {recentActivities.map((activity) => (
            <ListItem key={activity.id} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <Typography component="span" fontWeight="medium">
                      {activity.user}
                    </Typography>{" "}
                    {activity.action}{" "}
                    <Typography component="span" fontWeight="medium">
                      {activity.item}
                    </Typography>
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                }
              />
              <Chip
                label={activity.type}
                color={getChipColor(activity.type)}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
