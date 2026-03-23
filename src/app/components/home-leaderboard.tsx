import { caller } from "@/trpc/server";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { HomeLeaderboardRow } from "./home-leaderboard-row";

export async function HomeLeaderboard() {
  // Chamada de API direto no servidor usando as procedures do tRPC sem overhead HTTP
  const [leaderboardData, statsData] = await Promise.all([
    caller.leaderboard.list({ limit: 3 }),
    caller.roast.getStats(),
  ]);

  return (
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
      <div className="border border-border-primary w-full flex flex-col">
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
          <HomeLeaderboardRow key={row.id} rank={index + 1} row={row}>
            <CodeBlock className="border-none shadow-none bg-transparent rounded-none">
              <CodeBlockContent 
                code={row.code} 
                lang={row.language} 
              />
            </CodeBlock>
          </HomeLeaderboardRow>
        ))}
      </div>

      {/* Footer hint */}
      <div className="flex justify-center items-center gap-1 text-text-tertiary text-[12px] font-mono">
        showing top 3 of <NumberFlow value={statsData.totalRoasts} /> ·{" "}
        <Link
          href="/leaderboard"
          className="hover:text-text-secondary transition-colors"
        >
          view full leaderboard &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
