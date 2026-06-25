"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useCoverLetterStore } from "../../store/coverLetter-store";
import { toast } from "sonner";

export default function CopyButton() {
  const content = useCoverLetterStore((state) => state.content);

  function copyToClipboard() {
    if (!content) return;
    navigator.clipboard.writeText(content);
    toast.success("Cover letter copied to clipboard");
  }
  return (
    <Button onClick={copyToClipboard} variant="outline" className="gap-2">
      <Copy className="h-4 w-4" />
      Copy
    </Button>
  );
}
