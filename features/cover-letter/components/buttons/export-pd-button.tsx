"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useCoverLetterStore } from "../../store/coverLetter-store";

export default function ExportPdButton() {
  const content = useCoverLetterStore((state) => state.content);
  const jobTitle = useCoverLetterStore((state) => state.jobTitle);

  function exportToPdf() {
    if (!content) return;

    const title = jobTitle
      ? `${jobTitle.replace(/\s+/g, "_")}_Cover_Letter`
      : "Cover_Letter";

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>${title}</title>
<style>
  @page { size: A4; margin: 20mm; }
  body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #1f2937; }
  p { margin: 0 0 1em; }
</style>
</head><body>${content}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <Button onClick={exportToPdf} variant="outline" className="gap-2 cursor-pointer">
      <Download className="h-4 w-4" />
      Export PDF
    </Button>
  );
}