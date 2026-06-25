import Link from "next/link";

export default function EmptyApplication(){
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center border-2 border-dashed border-border rounded-2xl p-8 bg-card/50 translate-y-4">
             <h3 className="font-semibold text-lg text-foreground">No applications generated yet</h3>
             <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">
               Tailor your CV to a job requirement on the Dashboard to create your first application.
             </p>
             <Link 
               href="/dashboard" 
               className="mt-4 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/95 transition-all shadow-md shadow-primary/10"
             >
               Go to Dashboard
             </Link>
           </div>
    )
}