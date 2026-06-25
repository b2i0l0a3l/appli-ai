import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, BriefcaseBusiness, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApplicationCard({
  companyName,
  jobTitle,
  matchScore,
  createdAt,
}: {
  companyName: string;
  jobTitle: string;
  matchScore: number;
  createdAt: string;
}) {
  const score = matchScore ?? 0;
  const scoreColor =
    score >= 80
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 60
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-500 dark:text-red-400";

  const badgeVariant =
    score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive";

  return (
    <Card className="group relative min-w-[260px] overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 hover:border-primary/30">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r transition-opacity duration-300",
          score >= 80
            ? "from-emerald-400 to-teal-500"
            : score >= 60
            ? "from-amber-400 to-orange-400"
            : "from-red-400 to-rose-500"
        )}
      />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate leading-tight">
                {companyName}
              </h3>
            </div>
          </div>
          <Badge variant={badgeVariant} className="shrink-0 text-xs font-bold tabular-nums">
            {score.toFixed(0)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-medium text-foreground/80">{jobTitle}</span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{createdAt}</span>
          </div>
          <div className={cn("flex items-center gap-1 text-xs font-semibold", scoreColor)}>
            <TrendingUp className="h-3 w-3" />
            <span>Match Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
