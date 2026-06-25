import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCoverLetter() {
    return (
        <Card className="border border-dashed border-border/70 bg-card/30 p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
          <FileText className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold mb-2">No cover letters generated yet</CardTitle>
        <CardDescription className="text-muted-foreground mb-6 max-w-sm">
          Go to the dashboard to scan a job description and generate your first tailored cover letter.
        </CardDescription>
        <Button asChild>
          <Link href="/dashboard">
            Get Started
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    );
}  