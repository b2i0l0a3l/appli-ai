import { CoverLetterBuilder } from "@/features/cover-letter/components/cover-letter-builder";
import { Suspense } from "react";

export default function CoverLetterPage() {
    return (
      <Suspense fallback={<div className="flex h-full items-center justify-center p-8 text-muted-foreground">Loading Cover Letter Builder...</div>}>
        <CoverLetterBuilder />
      </Suspense>
    );
}