"use client";

import { 
  Copy, 
  Download, 

} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoverLetterArea from './cover-letter-area';
import AiSideBar from './ai-sidebar/ai-sidebar';

export function CoverLetterBuilder() {
  


  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Cover Letter Builder</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Refine your professional narrative with precision AI guidance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CoverLetterArea/>
        <AiSideBar/>
      </div>
    </div>
  );
}
