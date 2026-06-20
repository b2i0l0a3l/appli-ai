import {  CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MoreHorizontal } from "lucide-react";

export default function DashboardCustomHeaderCard({title,isChecked = false}:{title:string,isChecked:boolean}){
      return (
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-primary/60 font-bold">{title}</CardTitle> 
                        {isChecked ? <Check className="rounded-full  bg-blue-800" size={20}/> :<MoreHorizontal size={20} className="rounded-full border border-primary"/>}
                    </div>
                </CardHeader> 
        );
    }   