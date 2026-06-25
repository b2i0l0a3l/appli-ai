"use client";

import CoverLetterArea from './cover-letter-area';
import AiSideBar from './ai-sidebar/ai-sidebar';
import CopyButton from './buttons/copy-button';
import ExportPdButton from './buttons/export-pd-button';
import ExistingCoverLetterArea from './existing-cover-letter-area';

export function CoverLetterBuilder({ id }: { id?: string }) {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Cover Letter Builder</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {id 
              ? "Refine your professional narrative with precision AI guidance."
              : "Select a cover letter to view and edit, or generate a new one from the dashboard."}
          </p>
        </div>
        {id && (
          <div className="flex gap-2">
            <CopyButton />
            <ExportPdButton />
          </div>
        )}
      </div>
      
      {id ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ExistingCoverLetterArea id={id} />
          <AiSideBar />
        </div>
      ) : (
        <CoverLetterArea />
      )}
    </div>
  );
}
