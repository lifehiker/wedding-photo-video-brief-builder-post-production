import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Graceful fallback: return deterministic text unchanged
    return NextResponse.json({ polished: text });
  }

  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional wedding post-production coordinator. Your job is to improve the clarity, formatting, and readability of editor brief documents. Do NOT add information that wasn't in the original text. Do NOT claim to have analyzed footage. Improve tone, fix grammar, improve section headers, and make instructions clearer and more actionable. Return only the improved markdown document.",
        },
        {
          role: "user",
          content: `Please improve this wedding editor brief:\n\n${text}`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const polished = completion.choices[0]?.message?.content ?? text;
    return NextResponse.json({ polished });
  } catch (err) {
    console.error("[AI Polish] Error:", err);
    return NextResponse.json({ polished: text });
  }
}
