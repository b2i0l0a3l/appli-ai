import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationCardSkeleton() {
  return (
    <Card className="min-w-[260px] overflow-hidden border border-border/60 bg-card transition-all duration-300">
      <Skeleton className="h-0.5 w-full rounded-none" />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded" />
            </div>
          </div>
          <Skeleton className="h-5 w-12 rounded-full shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded" />
          <Skeleton className="h-4 w-36 rounded" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
