import { CodeEditor } from "@/app/components/code-editor";
import { HomeStats } from "@/app/components/home-stats";
import { HomeLeaderboard } from "@/app/components/home-leaderboard";
import { HomeLeaderboardSkeleton } from "@/app/components/home-leaderboard-skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-bg-page">
      <div className="max-w-[960px] mx-auto px-10 pt-20 pb-16 flex flex-col gap-8 items-center">
        {/* Hero Title */}
        <div className="flex flex-col gap-3 w-[780px]">
          <div className="flex items-center gap-3">
            <span className="text-accent-green font-bold text-[36px] leading-none">
              $
            </span>
            <h1 className="text-[36px] font-bold leading-none text-text-primary">
              paste your code. get roasted.
            </h1>
          </div>
          <p className="text-text-secondary text-sm font-mono">
            // drop your code below and we&apos;ll rate it — brutally honest or
            full roast mode
          </p>
        </div>

        {/* Code Editor */}
        <CodeEditor />

        {/* Footer Stats */}
        <HomeStats />

        {/* Spacer */}
        <div className="h-8" />

        {/* Leaderboard Preview */}
        <Suspense fallback={<HomeLeaderboardSkeleton />}>
          <HomeLeaderboard />
        </Suspense>
      </div>
    </main>
  );
}
