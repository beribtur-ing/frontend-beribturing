

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { mockAnalyticsData } from "../../lib/mock-data"

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function TopPropertiesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Earning Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalyticsData.topProperties} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="earnings" fill="var(--color-earnings)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
