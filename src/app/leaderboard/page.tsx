import { caller } from "@/trpc/server";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { LeaderboardRow } from "./leaderboard-row";
import { cacheLife } from "next/cache";

export default async function LeaderboardPage() {
  "use cache";
  cacheLife({ expire: 3600 });

  const [leaderboardData, statsData] = await Promise.all([
    caller.leaderboard.list({ limit: 20 }),
    caller.roast.getStats(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-page">
      <main className="flex-1 flex flex-col gap-10 px-6 py-10 md:px-20 lg:px-32 max-w-7xl mx-auto w-full mt-14">
        {/* Hero Section */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-accent-amber" />
              <h1 className="text-4xl md:text-5xl font-mono font-bold text-text-primary tracking-tighter">
                Shame Leaderboard
              </h1>
            </div>
            <p className="text-text-secondary font-mono text-sm md:text-base italic">
              // the most roasted code on the internet
            </p>
          </div>

          <div className="flex items-center gap-8 border-y border-border-primary/50 py-4 select-none">
            <div className="flex flex-col gap-0.5">
              <span className="text-text-tertiary font-mono text-[10px] uppercase tracking-wider">
                total roasts
              </span>
              <span className="text-text-primary font-mono text-xl font-bold">
                {(statsData?.totalRoasts ?? 0).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-text-tertiary font-mono text-[10px] uppercase tracking-wider">
                average score
              </span>
              <span className="text-accent-red font-mono text-xl font-bold">
                {(statsData?.avgScore ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </section>

        {/* Entries */}
        <section className="flex flex-col gap-6">
          {leaderboardData.map((entry, index) => (
            <LeaderboardRow key={entry.id} rank={index + 1} row={entry}>
              <CodeBlock className="border-none shadow-none bg-transparent border-t border-border-primary rounded-none">
                <CodeBlockContent
                  code={entry.code}
                  lang={entry.language}
                />
              </CodeBlock>
            </LeaderboardRow>
          ))}

          {leaderboardData.length === 0 && (
            <div className="p-8 flex justify-center text-text-tertiary text-sm font-mono border border-border-primary bg-bg-surface">
              // no roasts found yet
            </div>
          )}
        </section>

        {/* Explore more CTA */}
        {leaderboardData.length > 0 && (
          <div className="flex justify-center py-10">
            <p className="text-text-tertiary font-mono text-xs animate-pulse">
              // end of leaderboard
            </p>
          </div>
        )}
      </main>

      {/* Footer link to home */}
      <footer className="py-12 border-t border-border-primary flex justify-center bg-bg-surface/20">
        <Link
          href="/"
          className="px-8 py-3 bg-bg-input border border-border-primary text-text-secondary font-mono text-sm hover:text-accent-green hover:border-accent-green transition-all"
        >
          _submit your code for roasting
        </Link>
      </footer>
    </div>
  );
}
