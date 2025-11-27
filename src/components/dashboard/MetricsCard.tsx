import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary"
}: MetricsCardProps) => {
  const changeColor = changeType === "positive" 
    ? "text-accent" 
    : changeType === "negative" 
    ? "text-destructive" 
    : "text-muted-foreground";

  return (
    <Card className="p-6 shadow-elegant transition-smooth hover:shadow-lg hover:translate-y-[-2px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          {change && (
            <p className={`text-sm font-medium ${changeColor}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`flex-shrink-0 p-3 rounded-lg bg-secondary/50 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};
