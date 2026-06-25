"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { urlPattern } from "@/lib/utils";
import { CheckCircle2, XCircle, Link2, AlignLeft, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useApplicationStore } from "../store/applicationStore";
import { cn } from "@/lib/utils";

const JobDetails = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const value = useApplicationStore((state) => state.job_url);
  const Description = useApplicationStore((state) => state.description);

  useEffect(() => {
    if (value === "") return;
    const res = urlPattern.test(value);
    res ? setIsValid(true) : setIsValid(false);
  }, [value]);

  const isComplete = Description.length > 6 || (!!value && isValid);

  return (
    <Card
      className={cn(
        "border-2 transition-all duration-200",
        isComplete ? "border-primary/50 bg-primary/5" : "border-border"
      )}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h3 className="font-semibold text-foreground text-sm">Job Details</h3>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="h-5 w-5 text-primary" />
          ) : (
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              Step 2
            </span>
          )}
        </div>
      </div>
      <JobCardContent Description={Description} value={value} isValid={isValid} />
    </Card>
  );
};

const JobCardContent = React.memo(
  ({
    value,
    isValid,
    Description,
  }: {
    Description: string;
    value: string;
    isValid: boolean;
  }) => {
    const setDescription = useApplicationStore((state) => state.setDescription);
    const setValue = useApplicationStore((state) => state.setJobUrl);

    return (
      <CardContent className="flex flex-col gap-6 px-5 pb-5">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Job Posting URL
            <span className="ml-1 text-muted-foreground/60 normal-case font-normal">(optional)</span>
          </Label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="jobUrl"
              placeholder="https://jobs.example.com/..."
              type="url"
              className="pl-9 pr-9"
            />
            {value !== "" && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValid ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <AlignLeft className="h-3.5 w-3.5" />
            Job Description
          </Label>
          <Textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            name="jobDescription"
            placeholder="Paste the full job requirements here — the AI will tailor your application to match."
            className="h-[200px] resize-none text-sm leading-relaxed"
          />
        </div>
      </CardContent>
    );
  }
);


export default React.memo(JobDetails);