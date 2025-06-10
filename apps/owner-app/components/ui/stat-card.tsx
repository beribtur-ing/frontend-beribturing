import type React from "react"
interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
}

export function StatCard({ title, value, change, changeType = "neutral", icon }: StatCardProps) {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  }[changeType]

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
          {change && <p className={`text-xs md:text-sm ${changeColor} mt-1`}>{change}</p>}
        </div>
        {icon && <div className="text-blue-600">{icon}</div>}
      </div>
    </div>
  )
}
