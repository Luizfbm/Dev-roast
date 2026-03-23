import { z } from "zod";
import { count, avg } from "drizzle-orm";
import { roasts, analysisItems, verdictEnum, severityEnum } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "../init";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ROAST_SYSTEM_PROMPT } from "@/server/ai/prompts";

export const roastRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        code: z.string().min(1),
        language: z.string(),
        roastMode: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const prompt = `
        Code Language: ${input.language}
        Roast Mode (Sarcastic): ${input.roastMode}
        Code to analyze:
        ${input.code}

        ${ROAST_SYSTEM_PROMPT}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = JSON.parse(response.text());

      // Validation and parsing of AI output
      const lineCount = input.code.split("\n").length;

      const [roast] = await ctx.db.transaction(async (tx) => {
        const [insertedRoast] = await tx
          .insert(roasts)
          .values({
            code: input.code,
            language: input.language,
            lineCount,
            roastMode: input.roastMode,
            score: data.score,
            verdict: data.verdict,
            roastQuote: data.roastQuote,
            suggestedFix: data.suggestedFix,
          })
          .returning();

        if (data.analysisItems && data.analysisItems.length > 0) {
          await tx.insert(analysisItems).values(
            data.analysisItems.map((item: any, index: number) => ({
              roastId: insertedRoast.id,
              severity: item.severity,
              title: item.title,
              description: item.description,
              order: index,
            }))
          );
        }

        return [insertedRoast];
      });

      return { id: roast.id };
    }),

  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts);

    return {
      totalRoasts: stats.totalRoasts || 0,
      avgScore: stats.avgScore ? Number(stats.avgScore) : 0,
    };
  }),

  getById: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const roast = await ctx.db.query.roasts.findFirst({
        where: (roasts, { eq }) => eq(roasts.id, input.id),
      });

      if (!roast) return null;

      const analysis = await ctx.db.query.analysisItems.findMany({
        where: (items, { eq }) => eq(items.roastId, input.id),
        orderBy: (items, { asc }) => [asc(items.order)],
      });

      return {
        ...roast,
        analysisItems: analysis,
      };
    }),
});
