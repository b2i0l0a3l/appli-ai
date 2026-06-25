"use client";
import { useCoverLetterStore } from "../../store/coverLetter-store";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, Sparkles } from "lucide-react";

export default function StatsCard() {
  const content = useCoverLetterStore((state) => state.content);
  const matchScore = useCoverLetterStore((state) => state.matchScore) || 0;
  const companyName = useCoverLetterStore((state) => state.companyName);
  const jobTitle = useCoverLetterStore((state) => state.jobTitle);

  const cleanText = content ? content.replace(/<[^>]*>/g, " ").trim() : "";
  const wordCount = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  
  const readTimeSeconds = Math.round((wordCount / 200) * 60);
  const readTimeStr = readTimeSeconds >= 60 
    ? `${Math.floor(readTimeSeconds / 60)}m ${readTimeSeconds % 60}s` 
    : `${readTimeSeconds}s`;

  const impactVerbs = /\b(led|managed|designed|implemented|developed|reduced|increased|improved|optimized|achieved|built|created|delivered|solved|collaborated|accelerated)\b/gi;
  const metrics = /[\d%]+/g;
  
  const verbMatches = cleanText.match(impactVerbs) || [];
  const metricMatches = cleanText.match(metrics) || [];
  const impactPoints = verbMatches.length + metricMatches.length;

  return (
    <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Job Fit Match</span>
            <span className={`text-2xl font-black ${
              matchScore >= 80 
                ? "text-emerald-600 dark:text-emerald-400" 
                : matchScore >= 60 
                ? "text-amber-600 dark:text-amber-400" 
                : "text-red-500 dark:text-red-400"
            }`}>{matchScore}%</span>
          </div>
          
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                matchScore >= 80 
                  ? "bg-emerald-500" 
                  : matchScore >= 60 
                  ? "bg-amber-500" 
                  : "bg-red-500"
              }`} 
              style={{ width: `${matchScore}%` }}
            />
          </div>
          
          {companyName && jobTitle && (
            <p className="text-[11px] text-muted-foreground/80 mt-2 truncate">
              Target: <span className="font-semibold text-foreground">{jobTitle}</span> at <span className="font-semibold text-foreground">{companyName}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/40">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/30">
            <FileText className="h-4 w-4 text-blue-500 mb-1" />
            <div className="text-sm font-bold text-foreground">{wordCount}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Words</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/30">
            <Clock className="h-4 w-4 text-amber-500 mb-1" />
            <div className="text-sm font-bold text-foreground">{readTimeStr}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Read Time</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/30">
            <Sparkles className="h-4 w-4 text-emerald-500 mb-1" />
            <div className="text-sm font-bold text-foreground">{impactPoints}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Impact</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}