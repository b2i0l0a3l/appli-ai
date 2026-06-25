import { 
  Lightbulb, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuggestionSection(){
    return (
<section className="bg-background border rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-muted/20">
              <h3 className="font-medium text-foreground flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4" />
                Improvement Suggestions
              </h3>
            </div>
            <div className="p-6 space-y-4">
            
              <div className="p-4 bg-muted/30 border-l-4 border-blue-500 rounded-r-md">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Impact Boost</span>
                  <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2 italic">&quot;I led the migration of our legacy monolith...&quot;</p>
                <p className="text-sm text-foreground">Consider adding more specific metrics about the scale of the system you migrated.</p>
                <Button variant="ghost" className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Apply change</Button>
              </div>
              
              <div className="p-4 bg-muted/30 border-l-4 border-muted-foreground rounded-r-md">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-foreground">Vocabulary</span>
                  <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2 italic">&quot;...passionate about building sustainable...&quot;</p>
                <p className="text-sm text-foreground">&quot;Sustainable&quot; is used twice in this section. Try &quot;durable&quot; or &quot;resilient&quot;.</p>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-background text-xs rounded border cursor-pointer hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors">Durable</span>
                  <span className="px-2 py-1 bg-background text-xs rounded border cursor-pointer hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors">Resilient</span>
                </div>
              </div>
            </div>
            
          </section>
    )
}