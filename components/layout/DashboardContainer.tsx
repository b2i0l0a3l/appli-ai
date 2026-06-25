import { cn } from "@/lib/utils";

export default function DashboardContainer({children, className, title, description}: {
    children: React.ReactNode,
    title: string,
    description: string,
    className?: string,
}) {
  return (
    <div className="w-full h-full px-6 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={cn("", className)}>
        {children}
      </div>
    </div>
  );
}