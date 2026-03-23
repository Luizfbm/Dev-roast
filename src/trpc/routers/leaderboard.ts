import { z } from "zod";
import { asc } from "drizzle-orm";
import { roasts } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "../init";

export const leaderboardRouter = createTRPCRouter({
  list: baseProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;

      const entries = await ctx.db
        .select()
        .from(roasts)
        .orderBy(asc(roasts.score))
        .limit(limit)
        .offset(offset);

      return entries;
    }),
});
