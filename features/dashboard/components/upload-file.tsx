"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash2, FileTextIcon, FileUp, CheckCircle2 } from "lucide-react";
import React, { ChangeEvent, Ref, useRef } from "react";
import { toast } from "sonner";
import { useApplicationStore } from "../store/applicationStore";

type EventChange = ChangeEvent<HTMLInputElement>;

export default function UploadFile() {
  const ref = useRef<HTMLInputElement>(null);
  const setFiles = useApplicationStore((state) => state.setFile);
  const files = useApplicationStore((state) => state.file);

  const checkFiles = (e: EventChange) => {
    e.preventDefault();
    if (!ref.current) return;
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const filename = selectedFile.name.toLowerCase();
    const allowedExtensions = [".pdf", ".docx"];
    const isAllowed = allowedExtensions.some((x) => filename.endsWith(x));
    if (!isAllowed) {
      toast.error("Only PDF and DOCX files are supported.");
      if (ref.current) ref.current.value = "";
      return;
    }
    setFiles(selectedFile);
  };

  const removeFile = () => {
    if (!ref.current) return;
    ref.current.value = "";
    setFiles(undefined);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <Card
        className={cn(
          "relative min-w-[250px] h-[280px] border-2 border-dashed transition-all duration-200",
          files
            ? "border-primary/50 bg-primary/5"
            : "border-border hover:border-primary/40 hover:bg-accent/30"
        )}
      >
        <div className="absolute top-3 right-3">
          {files ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              Step 1
            </span>
          )}
        </div>

        <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
              files ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            <FileUp className="h-7 w-7" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-foreground">Upload your CV</h3>
            <p className="mt-1 text-xs text-muted-foreground">PDF or DOCX, up to 10MB</p>
          </div>
          <Input
            lang="en"
            type="file"
            ref={ref}
            maxLength={10}
            className="w-full max-w-[200px] cursor-pointer text-xs"
            onChange={(e) => checkFiles(e)}
            accept=".pdf,.docx"
          />
        </CardContent>
      </Card>

      <div
        className={cn(
          "flex items-center justify-between rounded-lg border bg-card p-3 transition-all duration-200",
          !files ? "hidden" : "flex"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileTextIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold truncate max-w-[160px]">{files?.name}</p>
            <p className="text-xs text-muted-foreground">
              {(files ? files.size / (1024 * 1024) : 0).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          onClick={removeFile}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}