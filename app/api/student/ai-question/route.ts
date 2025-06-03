// app/api/student/ai-question/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, question } = body;

    if (!fileUrl || !question) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const pdfResp = await fetch(fileUrl);
    const arrayBuffer = await pdfResp.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
  Your name is UniBot. You are an AI assistant that helps university students understand and study their course materials.
  You analyze uploaded PDF files (like lectures or notes) and answer questions based only on the content of those files.
  You must always answer in the same language used in the question.
  If the question is in Arabic, answer in Arabic. If it's in English, answer in English. If the question contains both, respond accordingly.
  Your goal is to simplify complex topics, explain concepts clearly, and assist in academic learning.
`,
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: question },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const text = result.response.text();
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
