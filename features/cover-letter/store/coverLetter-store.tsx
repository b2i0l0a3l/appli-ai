
import {create} from "zustand"

interface coverLetterState{
    content : string;
    setContent : (content:string)=> void;
}

export const useCoverLetterStore = create<coverLetterState>((set)=>({
    content : "",
    setContent : (content: string) => set({content})
}))