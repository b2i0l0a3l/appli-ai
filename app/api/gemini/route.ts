import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { createRequire } from "module";
import { extractText } from "unpdf";
import { geminiResponse } from "@/lib/prompts";

const require = createRequire(import.meta.url);

const ai = new GoogleGenAI({});


async function extractTextFromBase64(base64String: string): Promise<string> {
  try {
    const rawBase64 = base64String.includes(",")
      ? base64String.split(",")[1]
      : base64String;

    const buffer = Buffer.from(rawBase64, "base64");
    const { text } = await extractText(new Uint8Array(buffer), {
      mergePages: true,
    });
    return text.trim();
  } catch (error) {
    console.warn("PDF extraction failed:", error);
    return "";
  }
}



export async function POST(req: Request): Promise<NextResponse<geminiResponse | { error: string }>> {
  try {
    const { prompt, payload } = await req.json();

    if (!prompt || !payload) {
      return NextResponse.json({ error: "Prompt and payload are required" }, { status: 400 });
    }

    let cvText = "";
    if (payload.file) {
      cvText = await extractTextFromBase64(payload.file);
    }


    const body = `${prompt}
CV Text: ${cvText || "(No readable CV text found)"}
Job URL: ${payload.job_url || ""}
Job Description: ${payload.job_description || ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: body,
    }); 

    const text = response.text || "";
    let parsed: geminiResponse;

    try {
      const clean = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", text);
      return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 });
    }
    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
