import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

export function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4 md:p-6">
        <Box className="flex items-start justify-between">
          <Box className="flex-1">
            <Typography variant="body2" className="text-gray-600 mb-1">
              {title}
            </Typography>
            <Typography variant="h4" className="font-bold text-gray-900 mb-2">
              {value}
            </Typography>
            <Typography variant="caption" className={`text-xs ${getChangeColor()}`}>
              {change}
            </Typography>
          </Box>
          {icon && (
            <Box className="text-gray-400 ml-4">
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}