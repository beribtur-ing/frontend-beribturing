

import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { mockAnalyticsData } from "../../lib/mock-data"

export function RevenueChart() {
  return (
    <Card>
      <CardHeader title="Monthly Revenue" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockAnalyticsData.revenue}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
