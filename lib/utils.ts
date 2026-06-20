import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValidFile({file}:{file:FileList|null}){
    if(!file || file.length === 0) return; 
    const selectedFile = file[0];
    const allowdExtension = [".pdf",".docx"];
    const isAllowed = allowdExtension.some(x=> selectedFile.name.endsWith(x));
    if(!isAllowed){
      return false;
    }
    return true;
}

export const urlPattern   = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/i;