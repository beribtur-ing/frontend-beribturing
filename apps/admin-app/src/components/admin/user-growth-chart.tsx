

import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { mockAnalyticsData } from "../../lib/mock-data"

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader title="User Growth" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockAnalyticsData.userGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#2e7d32" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
