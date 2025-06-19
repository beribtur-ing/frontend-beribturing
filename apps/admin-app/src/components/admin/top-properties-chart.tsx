

import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { mockAnalyticsData } from "../../lib/mock-data"

export function TopPropertiesChart() {
  return (
    <Card>
      <CardHeader title="Top Earning Properties" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockAnalyticsData.topProperties} layout="horizontal">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="earnings" fill="#ed6c02" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
