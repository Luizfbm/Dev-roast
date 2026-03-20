"use server";

import { generateObject } from "ai";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { analysisItems, roasts } from "@/db/schema";
import { model } from "@/lib/ai";
import { ROAST_SYSTEM_PROMPT } from "@/lib/prompts/roast-prompt";

export async function submitRoastAction(
  code: string,
  language: string,
  isRoastMode: boolean,
) {
  try {
    // 1. Calculate line count
    const lineCount = code.split("\n").length;

    // 2. Generate Roast via AI SDK
    const { object } = await generateObject({
      model,
      system: ROAST_SYSTEM_PROMPT,
      prompt: `Language: ${language}\nCode:\n${code}`,
      schema: z.object({
        score: z.number().min(0).max(10),
        verdict: z.enum([
          "needs_serious_help",
          "rough_around_edges",
          "decent_code",
          "solid_work",
          "exceptional",
        ]),
        roastQuote: z.string(),
        analysisItems: z.array(
          z.object({
            severity: z.enum(["critical", "warning", "good"]),
            title: z.string(),
            description: z.string(),
          }),
        ),
        suggestedFix: z.string(),
      }),
    });

    // 3. Save to Database using a transaction
    const result = await db.transaction(async (tx) => {
      const [insertedRoast] = await tx
        .insert(roasts)
        .values({
          code,
          language,
          lineCount,
          roastMode: isRoastMode,
          score: object.score,
          verdict: object.verdict,
          roastQuote: object.roastQuote,
          suggestedFix: object.suggestedFix,
        })
        .returning();

      if (object.analysisItems.length > 0) {
        await tx.insert(analysisItems).values(
          object.analysisItems.map((item, index) => ({
            roastId: insertedRoast.id,
            severity: item.severity,
            title: item.title,
            description: item.description,
            order: index,
          })),
        );
      }

      return insertedRoast;
    });

    return { success: true, id: result.id };
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
      .orderBy(asc(roasts.score))
      .limit(10);
    return results;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return [];
  }
}

export async function getRoastById(id: string) {
  try {
    const [roast] = await db.select().from(roasts).where(eq(roasts.id, id));

    if (!roast) return null;

    const items = await db
      .select()
      .from(analysisItems)
      .where(eq(analysisItems.roastId, id))
      .orderBy(asc(analysisItems.order));

    return { ...roast, analysisItems: items };
  } catch (error) {
    console.error("Failed to fetch roast by id:", error);
    return null;
  }
}
