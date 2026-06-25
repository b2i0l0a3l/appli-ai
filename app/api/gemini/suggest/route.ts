import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({});

function getPrompt(jobTitle: string, companyName: string, content: string){
return `You are an expert resume and cover letter reviewer.
Analyze the following cover letter content for a candidate applying for the position of "${jobTitle || "the role"}" at "${companyName || "the company"}".
Identify areas where the cover letter can be improved, specifically focusing on:
1. "improvement" (e.g. adding metrics, using active verbs instead of passive, showing achievements)
2. "vocabulary" (e.g. replacing clichés or overused words)
3. "structure" (e.g. missing salutation, improper paragraph length, missing contact info)

Return a JSON array of suggestions. If the cover letter is already excellent and needs no improvements, return an empty array [].
Each suggestion in the array MUST follow this JSON schema exactly:
{
  "id": "a unique string id",
  "type": "improvement" | "vocabulary" | "structure",
  "title": "A short, catchy title (e.g. 'Impact Boost', 'Cliché Word Alert', 'Stronger Call to Action')",
  "priority": "high" | "medium" | "low",
  "originalText": "The exact snippet from the cover letter that needs improvement (optional, leave empty/omitted if it applies to structure or overall letter. If provided, make sure it matches the letter text EXACTLY, case-sensitive, including any spacing, so it can be replaced)",
  "suggestionText": "The improved alternative phrasing or exact text suggestion",
  "explanation": "A short explanation of why this change should be made and its benefit."
}

Do NOT return any markdown formatting like \`\`\`json. Return ONLY the raw JSON array.

Cover Letter Content:
${content}`;
}

export async function POST(req: Request) {
  try {
    const { content, jobTitle, companyName } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const prompt = getPrompt(jobTitle, companyName, content);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "[]";
    let parsed = [];

    try {
      const clean = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error("Failed to parse JSON from AI suggest response:", text);
      return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Error in suggestion endpoint:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
