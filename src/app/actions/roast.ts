"use server";

import { db } from "@/db";
import { roasts } from "@/db/schema";
import { model } from "@/lib/ai";
import { ROAST_SYSTEM_PROMPT } from "@/lib/prompts/roast-prompt";
import { generateObject } from "ai";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";

export async function submitRoastAction(
  code: string,
  language: string,
  isRoastMode: boolean,
) {
  try {
    // 1. Generate Roast via AI SDK
    const { object } = await generateObject({
      model,
      system: ROAST_SYSTEM_PROMPT,
      prompt: `Language: ${language}\n\nCode:\n${code}`,
      schema: z.object({
        score: z.number().min(0).max(10),
        feedback: z.string(),
      }),
    });

    // 2. Save to Database (Anonymous submission)
    const [inserted] = await db
      .insert(roasts)
      .values({
        codeContent: code,
        language: language as any, // Cast to language_enum
        roastScore: object.score,
        roastFeedback: object.feedback,
        isPublic: true, // Visible automatically as requested
      })
      .returning();

    return { success: true, id: inserted.id };
  } catch (error) {
    console.error("Failed to submit roast:", error);
    return { success: false, error: "Failed to generate roast" };
  }
}

export async function getLeaderboardAction() {
  try {
    const results = await db
      .select()
      .from(roasts)
      .where(eq(roasts.isPublic, true))
      .orderBy(desc(roasts.roastScore))
      .limit(10);

    return results;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return [];
  }
}
