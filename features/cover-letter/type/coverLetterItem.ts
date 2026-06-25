export interface CoverLetterItem {
  id: string;
  job_title: string;
  company_name: string;
  match_score: number;
  created_at: Date;
  generated_letters: {
    id: string;
    content: string | null;
    language: string | null;
    last_update: Date;
  }[];
}
