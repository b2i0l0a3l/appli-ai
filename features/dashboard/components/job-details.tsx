"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DashboardCustomHeaderCard from "./dashboardCustomHeaderCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { urlPattern } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const JobDetails = ()=>{
    const [isValid,setIsValid] = useState<boolean>(false);
    const [value , setValue] = useState<string>("");
    const [Description , setDescription] = useState<string>("");

    useEffect(()=>{
        if(value === ""){
            return;
        }
        const res = urlPattern.test(value);
        res ? setIsValid(true) : setIsValid(false);
    },[value])

    return (
        <Card className="h-[435px] border border-accent">
           <DashboardCustomHeaderCard title="STEP 2: JOB DESCRIPTION" isChecked={(Description.length > 6) || (value && isValid)} />
           <CardContent className="flex flex-col gap-8">
            <div >
                <Label className="text-xs" htmlFor="jobUrl">Job Posting Url (Optional)</Label>
                <div className="relative">
                <Input  value={value} onChange={(e)=>setValue(e.target.value)} name="jobUrl" placeholder="https://" type="url" className="p-4 translate-y-3 pr-6" />
                {value !=="" && (!isValid ? <X size={12} className="absolute rounded-full bg-red-500 right-2 top-1/2  translate-y-1/2" /> : <Check size={12} className="absolute rounded-full bg-green-500 right-2 top-1/2  translate-y-1/2"/>)}
                </div>
            </div>
             <div className=" h-full flex flex-col gap-3">
                <Label className="text-xs" htmlFor="jobDescription">Paste Job Description</Label>
                <Textarea  value={Description} onChange={(e)=>setDescription(e.target.value)} name="jobDescription" placeholder="Paste the full job requirements here." className=" p-4  pr-6 h-[230px] resize-none" />
            </div>
           </CardContent>
        </Card>
    );
}
export default React.memo(JobDetails);