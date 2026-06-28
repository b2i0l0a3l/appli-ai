import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { extractText } from "unpdf";
import { geminiResponse } from "@/lib/prompts";
import Groq from "groq-sdk";

const ai = new GoogleGenAI({});
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

function parseAIResponse(text: string): geminiResponse {
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

async function callGemini(body: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: body,
  });
  return response.text || "";
}

async function callGroq(body: string): Promise<string> {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a helpful career assistant. Always respond with valid JSON only, no markdown fences.",
      },
      { role: "user", content: body },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  });
  return response.choices[0]?.message?.content || "";
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

    let rawText = "";
    let usedProvider = "gemini";

    try {
      rawText = await callGemini(body);
    } catch (geminiError: any) {

      try {
        rawText = await callGroq(body);
        usedProvider = "groq";
      } catch (groqError: any) {
        return NextResponse.json(
          { error: "All AI providers are currently unavailable. Please try again later." },
          { status: 503 }
        );
      }
    }

    let parsed: geminiResponse;
    try {
      parsed = parseAIResponse(rawText);
    } catch (e) {
      console.error(`[AI] Failed to parse JSON from ${usedProvider}:`, rawText);
      return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("[API] Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
