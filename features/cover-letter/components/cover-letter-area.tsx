"use client";

import React, { useEffect, useState } from "react";
import { getUserCoverLetters } from "@/app/actions/application.actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Search, Calendar, Briefcase, ChevronRight, AlertCircle, Percent } from "lucide-react";
import Link from "next/link";
import { CoverLetterItem } from "../type/coverLetterItem";
import { toast } from "sonner";
import EmptyCoverLetter from "./default/empty-cover-letter";

 
export default function CoverLetterArea() {
  const [letters, setLetters] = useState<CoverLetterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadLetters() {
      try {
        const data = await getUserCoverLetters();
        setLetters(data as unknown as CoverLetterItem[]);
      } catch (error) {
        toast.error("Failed to load letters");
      } finally {
        setLoading(false);
      }
    }
    loadLetters();
  }, []);

  const filteredLetters = letters.filter(
    (item) =>
      item.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 max-w-md bg-muted/40 p-1.5 rounded-lg border border-border/50">
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border border-border/50 bg-card/45 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (letters.length === 0) {
    return (
     <EmptyCoverLetter />
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by job title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border-border/60 bg-background/50 focus-visible:ring-primary"
        />
      </div>

      {filteredLetters.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl bg-card/10">
          <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">No matches found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLetters.map((item) => {
            const letter = item.generated_letters[0];
            const cleanText = letter?.content ? letter.content.replace(/<[^>]*>/g, " ").trim() : "";
            const wordCount = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
            const score = item.match_score;

            const rawCompany = item.company_name || "";
            let cleanCompany = rawCompany.replace(/\b(Inc\.?|L\.?L\.?C\.?|Ltd\.?|Co\.?|Corporation|Corp\.?|GmbH|S\.?A\.?)\b/gi, "").trim();
            cleanCompany = cleanCompany.replace(/[,.\s-]+$/, "").trim();
            const companyDisplayName = cleanCompany.length > 18 ? cleanCompany.slice(0, 16) + "..." : cleanCompany || rawCompany;

            return (
              <Card key={item.id} className="group border border-border/50 bg-card/40 hover:bg-card/75 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden">
                <div>    
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {item.job_title}
                        </CardTitle>
                        <CardDescription className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mt-1 truncate" title={rawCompany}>
                          <Briefcase className="h-3.5 w-3.5 shrink-0" />
                          {companyDisplayName}
                        </CardDescription>
                      </div>
                      <Badge className={`shrink-0 ${
                        score >= 80 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : score >= 60 
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/20" 
                          : "bg-red-500/10 text-red-600 border-red-500/20"
                      }`} variant="outline">
                        {score}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Updated {new Date(letter?.last_update || item.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Length: <span className="font-semibold text-foreground">{wordCount} words</span>
                    </div>
                  </CardContent>
                </div>
                
                <CardContent className="pt-0 pb-4">
                  <Button asChild className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border-none shadow-none font-medium">
                    <Link href={`/cover-letter/${item.id}`}>
                      Open Letter Builder
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}