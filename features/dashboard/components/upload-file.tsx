"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash2 , FileTextIcon , FileUp} from "lucide-react";
import { Ref, useRef, useState } from "react";
import { toast } from "sonner";
import DashboardCustomHeaderCard from "./dashboardCustomHeaderCard";

export default function UploadFile(){

    const ref =  useRef<HTMLInputElement>(null);
    const [files , setFiles] = useState<File>();
   
    const checkFiles = ()=>{
        if(!ref.current ) return;
        const file : File | undefined = ref.current.files?.[0];
        if(!file) return; 
        const filename = file.name.toLowerCase();
        const allowdExtension = [".pdf",".docx"];
        const isAllowed =   allowdExtension.some(x=> filename.endsWith(x));
        if(!isAllowed){
            toast.error("file type not support!");
            return;
        }
        setFiles(file);
    }
    const removeFile = ()=>{
        if(!ref || !ref.current) return ;
        ref.current.value = '';
        setFiles(undefined);
    }

    
    
    return (
        <div className="flex flex-col gap-y-4">
        <Card className="rounded-lg min-w-[250px] max-h-[350px]  h-full w-full border border-accent">
            <DashboardCustomHeaderCard title="STEP 1: UPLOAD CV" isChecked={!!files}/>
            <UploadFileCardContent checkFiles={checkFiles} ref={ref}/>
        </Card>
            <UploadFileCardFooter files={files} removeFile={removeFile}/>
        </div>
    )
}


function UploadFileCardContent({checkFiles,ref}:{checkFiles: ()=> void,ref : Ref<HTMLInputElement>}){
    return (
        <CardContent className="flex-1 flex ">
            <div className="flex gap-4  w-full flex-col items-center justify-center  border-3 border-accent/90 border-dashed">
                <FileUp size={42}/>
                <h2 className="font-bold ">Drag & Drop Resume</h2>
                <h4>Support PDf, DOCX up to 10MB</h4>
                <Input type="file" maxLength={10} className="w-[60%]"  onChange={checkFiles}  ref={ref} accept=".pdf,.docx"    placeholder="Browse Files" />
            </div>
        </CardContent>
    )
}

function UploadFileCardFooter({files, removeFile}:{files:File|undefined,removeFile :()=>void}){
    return(
        <>
        <div className={cn("justify-between items-center border p-3 bg-accent/30",!files ? "hidden" : "flex")}>
                
                <div className="flex gap-2 items-center">
                    <FileTextIcon  size={24}/>
                    <div className="flex  flex-col ">
                        <h2 className="font-bold text-sm ">{files?.name}</h2>
                        <span className="text-[10px] text-muted-foreground">
                            {(files ? files.size / (1024 * 1024) : 0).toFixed(2)} MB
                        </span>
                    </div>
                </div>
                <Trash2 onClick={removeFile} size={20} className="hover:text-red-500 cursor-pointer"/>
        </div>
        </>
    )
}