"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useApplicationStore } from "../store/applicationStore";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { convertFileToBase64 } from "@/lib/utils";
import { geminiPrompt, geminiResponse } from "@/lib/prompts";

import { useRouter } from "next/navigation";
import { saveGeneratedApplication } from "@/app/actions/application.actions";

export default function GenerateApplicationButton(){
    const router = useRouter();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const Description = useApplicationStore((state)=>state.description);
    const value = useApplicationStore((state)=>state.job_url);
    const  file = useApplicationStore((state)=>state.file);
    const  clear = useApplicationStore((state)=>state.clear);


    const generate = async ()=>{
      setIsLoading(true);
      if(!file || Description.length < 6){
        setIsLoading(false);
        return toast.error("Please Upload Csv, Pdf, Doc and fill all the fields");
      } 

      try{

        const payload = {
          file :  await convertFileToBase64(file),
          job_url:value,
          job_description:Description, 
        }

        const res = await axios.post("/api/gemini", {
          prompt: geminiPrompt,
          payload: payload,
        });
        
        const geminiResult: geminiResponse = res.data;

        if (!geminiResult) { 
          throw new Error("Invalid response from AI assistant");
        }

        toast.info("AI Analysis complete! Saving to database...");

        const dbRes = await saveGeneratedApplication({
          companyName: geminiResult.job_data?.company || "Unknown Company",
          jobTitle: geminiResult.job_data?.position || "Unknown Position",
          jobDescription: Description,
          language: geminiResult.cover_letter_language_iso || "en",
          matchScore: geminiResult.analysis?.match_score || 0,
          cvData: {
            skills: geminiResult.cv_data?.skills || [],
            projects: geminiResult.cv_data?.projects || [],
            experience: geminiResult.cv_data?.experience || [],
          },
          coverLetterContent: geminiResult.cover_letter || "",
        });

        if (dbRes.success) {
          toast.success("Application created successfully!");
          clear();
          router.push(`/cover-letter/${dbRes.applicationId}`);
        }
 
      }catch(error: any){
        console.error(error);
        const errMsg = error?.response?.data?.error || error?.message || "Failed to generate application";
        toast.error(errMsg);

      }finally{
        setIsLoading(false);
      }
    }
    
    const isDisabled = Description.length < 6 || !file;

    return (
        <div className="flex flex-col items-center gap-3">
          <Button
            disabled={isDisabled || isLoading}
            onClick={generate}
            className="relative px-10 py-6 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            type="button"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing your application...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Application
              </>
            )}
          </Button>
          {isDisabled && !isLoading && (
            <p className="text-xs text-muted-foreground">
              Upload your CV and add a job description to continue
            </p>
          )}
        </div>
    );
}