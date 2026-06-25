import ApplicationCardSkeleton from "./application-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ApplicationListLoadingSkeleton() {
  return (
    <div className="space-y-8 w-full pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-border/50 bg-card/45 backdrop-blur-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-7 w-12 rounded" />
              </div>
              <Skeleton className="h-11 w-11 rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ApplicationCardSkeleton />
          <ApplicationCardSkeleton />
          <ApplicationCardSkeleton />
          <ApplicationCardSkeleton />
        </div>
      </div>
    </div>
  );
}