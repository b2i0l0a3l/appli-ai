export type geminiResponse = {
  cv_data : {
    name: string;
    skills: string[];
    experience: string[];
    projects: string[];
  }
  job_data : {
    company: string;
    position: string;
    required_skills: string[];
  }
  analysis : {
    match_score: number;
    matching_skills: string[];
    missing_skills: string[];
    strengths: string[];
    weaknesses: string[];
  }
  cover_letter: string;
  cover_letter_language_iso : string;
}

export const geminiPrompt = `You are an AI job application assistant.
Given a CV and a job posting, do ALL of the following in ONE response.
Return ONLY this JSON structure, no explanation:

{
  "cv_data": {
    "name": "",
    "skills": [],
    "experience": [],
    "projects": []
  },
  "job_data": {
    "company": "",
    "position": "",
    "required_skills": []
  },
  "analysis": {
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": []
  },
  "cover_letter": "",
  "cover_letter_language_iso : ""
}

RULES:
- match_score: integer 0-100 based on skills overlap
- missing_skills: only important ones, max 5
- strengths and weaknesses: short phrases, max 3 each
- highlight matching skills naturally in cover_letter, do NOT list them
- cover_letter language must match the requested language EXACTLY
- cover_letter MUST be a single HTML string (escaped for JSON) using EXACTLY this structure, with no <html>, <head>, or <body> wrapper:

<p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">[Candidate Name]<br />[Candidate Phone]<br />[Candidate Email]</p>
<p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">[Today's Date written in the cover letter language]</p>
<p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">Hiring Manager<br />[Relevant Department]<br />[Company Name]</p>
<p>[Salutation in the target language, e.g. "Dear Hiring Manager," / "Sehr geehrte Damen und Herren,"]</p>
<p>[Paragraph 1 — introduction and role applied for]</p>
<p>[Paragraph 2 — relevant experience and skills, woven naturally]</p>
<p>[Paragraph 3 — why this company/role, value you bring]</p>
<p>[Closing line, e.g. "Sincerely," / "Mit freundlichen Grüßen"]</p>
<p>[Candidate Name]</p>

- body paragraphs (introduction/experience/closing) must total max 4 <p> tags, not counting the header block and salutation
- do NOT use markdown bold/italics inside the HTML, use plain text only
- if any field (name, phone, email) is missing from the CV, use a bracketed placeholder like [Your Phone Number]
- the entire cover_letter value must be valid JSON-escaped HTML (escape all double quotes as \\" and keep it on as few literal newlines as possible)
- Return ONLY valid JSON, no markdown, no backticks, no explanation
- cover_letter language: write the cover_letter STRICTLY in "{{LANGUAGE}}". This overrides the language of the CV and the Job Posting. Do not infer the language from context — use EXACTLY the language specified in "{{LANGUAGE}}", even if the job posting is in a different language.

CV: {{CV_TEXT}}
Job Posting: {{JOB_TEXT}}
Cover Letter Language: {{LANGUAGE}}.`


export const improvCoverLetterPrompt =   `
Improve this cover letter professionally.
Keep the same structure but make it more compelling.
Return improved text only, no explanation.

Current text: {{CURRENT_TEXT}}
Job: {{JOB_TITLE}} at {{COMPANY}}
Language: {{LANGUAGE}}`