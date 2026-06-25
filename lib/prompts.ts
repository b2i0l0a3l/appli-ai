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
  "cover_letter": ""
}

RULES:
- match_score: integer 0-100 based on skills overlap
- cover_letter: formal, max 4 paragraphs, no address block, end with "Mit freundlichen Grüßen" if German
- cover_letter language must match the requested language EXACTLY
- highlight matching skills naturally in cover_letter, do NOT list them
- missing_skills: only important ones, max 5
- strengths and weaknesses: short phrases, max 3 each
- Return ONLY valid JSON, no markdown, no backticks, no explanation

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