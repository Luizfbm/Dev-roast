import { asc, count } from "drizzle-orm";
import Link from "next/link";
import { CodeEditor } from "@/app/components/code-editor";
import { Button } from "@/components/ui/button";
import {
  TableRow,
  TableRowCode,
  TableRowLang,
  TableRowRank,
  TableRowScore,
} from "@/components/ui/table-row";
import { db } from "@/db";
import { roasts } from "@/db/schema";
import { HomeStats } from "@/app/components/home-stats";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const leaderboardData = await db
    .select()
    .from(roasts)
    .orderBy(asc(roasts.score))
    .limit(3);

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
        <div className="flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">//</span>
              <h2 className="text-sm font-bold text-text-primary">
                shame_leaderboard
              </h2>
            </div>
            <Link href="/leaderboard">
              <Button variant="link" size="xs">
                $ view_all &gt;&gt;
              </Button>
            </Link>
          </div>

          {/* Subtitle */}
          <p className="text-text-tertiary text-[13px] font-mono -mt-2">
            // the worst code on the internet, ranked by shame
          </p>

          {/* Table */}
          <div className="border border-border-primary w-full">
            {/* Table Header */}
            <div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border-primary">
              <span className="w-[50px] text-text-tertiary text-xs font-mono">
                rank
              </span>
              <span className="w-[70px] text-text-tertiary text-xs font-mono">
                score
              </span>
              <span className="flex-1 text-text-tertiary text-xs font-mono">
                code
              </span>
              <span className="w-[100px] text-text-tertiary text-xs font-mono text-right">
                lang
              </span>
            </div>

            {/* Rows */}
            {leaderboardData.map((row, index) => (
              <TableRow key={row.id}>
                <TableRowRank>#{index + 1}</TableRowRank>
                <TableRowScore>{row.score.toFixed(1)}</TableRowScore>
                <TableRowCode>{row.code}</TableRowCode>
                <TableRowLang>{row.language}</TableRowLang>
              </TableRow>
            ))}
          </div>

          {/* Footer hint */}
          <div className="flex justify-center">
            <p className="text-text-tertiary text-[12px] font-mono">
              showing top 3 ·{" "}
              <Link
                href="/leaderboard"
                className="hover:text-text-secondary transition-colors"
              >
                view full leaderboard &gt;&gt;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
