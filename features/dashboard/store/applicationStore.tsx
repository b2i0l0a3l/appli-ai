import {create} from "zustand"


interface ApplicatoinState {
    file : File|undefined;
    description : string;
    job_url :string;
    setFile : (file:File|undefined)=>void;
    setDescription : (description:string)=>void;
    setJobUrl : (job_url:string)=>void;
    clear : ()=>void;
}
export const useApplicationStore = create<ApplicatoinState>((set)=>({
    file : undefined ,
    description : "",
    job_url : "",
    setFile : (file)=> set(()=>({file})),
    setDescription : (description)=> set(()=>({description})),
    setJobUrl : (job_url)=> set((state)=>({job_url})),
    clear : ()=>set({
        file :undefined,
        description :"",
        job_url :""
    })
}));
