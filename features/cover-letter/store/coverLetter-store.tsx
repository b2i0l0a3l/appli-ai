import { create } from "zustand";

interface CoverLetterState {
  content: string;
  setContent: (content: string) => void;
  matchScore: number;
  setMatchScore: (score: number) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
}

export const useCoverLetterStore = create<CoverLetterState>((set) => ({
  content: "",
  setContent: (content: string) => set({ content }),
  matchScore: 0,
  setMatchScore: (matchScore: number) => set({ matchScore }),
  jobTitle: "",
  setJobTitle: (jobTitle: string) => set({ jobTitle }),
  companyName: "",
  setCompanyName: (companyName: string) => set({ companyName }),
}));