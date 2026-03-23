import { createTRPCRouter } from "../init";
import { roastRouter } from "./roast";
import { leaderboardRouter } from "./leaderboard";

export const appRouter = createTRPCRouter({
  roast: roastRouter,
  leaderboard: leaderboardRouter,
});

export type AppRouter = typeof appRouter;
