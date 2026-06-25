"use client";
import React, { useState } from "react";
import { Lightbulb, Check, X, Sparkles, Loader2, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCoverLetterStore } from "../../store/coverLetter-store";
import { toast } from "sonner";

interface Suggestion {
  id: string;
  type: "improvement" | "vocabulary" | "structure";
  title: string;
  priority: "high" | "medium" | "low";
  originalText?: string;
  suggestionText: string;
  explanation: string;
}

export default function SuggestionSection() {
  const content = useCoverLetterStore((state) => state.content);
  const jobTitle = useCoverLetterStore((state) => state.jobTitle);
  const companyName = useCoverLetterStore((state) => state.companyName);

  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const fetchSuggestions = async () => {
    if (!content || content.replace(/<[^>]*>/g, "").trim().length < 10) {
      toast.error("Cover letter content is too short to analyze!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, jobTitle, companyName }),
      });

      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      setSuggestions(data);
      setHasAnalyzed(true);
      toast.success(`Analysis complete! Found ${data.length} suggestions.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze cover letter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeSuggestion = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };

  const applySuggestion = (suggestion: Suggestion) => {
    if (!suggestion.originalText || !suggestion.suggestionText) return;
    const event = new CustomEvent("apply-suggestion", {
      detail: {
        originalText: suggestion.originalText,
        suggestionText: suggestion.suggestionText,
      },
    });
    document.dispatchEvent(event);
    removeSuggestion(suggestion.id);
  };

  if (!hasAnalyzed && suggestions.length === 0) {
    return (
      <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm overflow-hidden">
        <CardHeader className="px-6 py-4 border-b border-border/40 bg-muted/20 flex flex-row items-center justify-between">
          <CardTitle className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Get Tailored Suggestions</p>
            <p className="text-xs text-muted-foreground max-w-[240px] mx-auto">
              Let Gemini analyze your cover letter and suggest vocabulary, metrics, or structural improvements.
            </p>
          </div>
          <Button 
            onClick={fetchSuggestions} 
            disabled={isLoading}
            className="w-full bg-linear-to-tr from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-semibold cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Letter...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Cover Letter
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm overflow-hidden">
        <CardHeader className="px-6 py-4 border-b border-border/40 bg-muted/20 flex flex-row items-center justify-between">
          <CardTitle className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <Lightbulb className="h-4 w-4 text-emerald-500" />
            AI Suggestions
          </CardTitle>
          <Button 
            onClick={fetchSuggestions} 
            disabled={isLoading}
            size="sm"
            variant="outline"
            className="h-8 text-xs font-semibold cursor-pointer"
          >
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
            Re-Analyze
          </Button>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <Check className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Everything looks perfect!</p>
            <p className="text-xs text-muted-foreground">Your cover letter matches all best practices and standard guidelines.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-border/40 bg-muted/20 flex flex-row items-center justify-between">
        <CardTitle className="font-semibold text-foreground flex items-center gap-2 text-sm">
          <Lightbulb className="h-4 w-4 text-amber-500 animate-pulse" />
          AI Suggestions
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-bold tracking-wider uppercase bg-background px-2 py-0.5">
            {suggestions.length} Alerts
          </Badge>
          <Button 
            onClick={fetchSuggestions} 
            disabled={isLoading}
            size="sm"
            variant="outline"
            className="h-7 px-2 text-[10px] font-semibold cursor-pointer"
          >
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-4 border rounded-lg transition-all duration-300 relative bg-background/50 hover:bg-background/80 ${
              suggestion.priority === "high"
                ? "border-l-4 border-l-red-500 border-border/60"
                : suggestion.priority === "medium"
                ? "border-l-4 border-l-amber-500 border-border/60"
                : "border-l-4 border-l-blue-500 border-border/60"
            }`}
          >
            <button
              onClick={() => removeSuggestion(suggestion.id)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold ${
                suggestion.priority === "high"
                  ? "text-red-600 dark:text-red-400"
                  : suggestion.priority === "medium"
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-blue-600 dark:text-blue-400"
              }`}>
                {suggestion.title}
              </span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-semibold text-muted-foreground uppercase">
                {suggestion.priority} Priority
              </span>
            </div>

            {suggestion.originalText && (
              <div className="mb-2 p-2 bg-muted/20 rounded border border-border/30 text-xs text-muted-foreground italic">
                &quot;{suggestion.originalText}&quot;
              </div>
            )}

            <p className="text-xs text-foreground mb-3 leading-relaxed">
              {suggestion.explanation}
            </p>

            <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Suggested alternative:</span>
                {suggestion.originalText && (
                  <Button 
                    onClick={() => applySuggestion(suggestion)}
                    size="sm"
                    variant="link"
                    className="h-auto p-0 text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    Apply Changes
                  </Button>
                )}
              </div>
              <p className="text-xs font-medium text-foreground bg-muted/30 p-2 rounded border border-dashed border-border/60">
                {suggestion.suggestionText}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}