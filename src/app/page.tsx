import { CodeEditor } from "@/app/components/code-editor";
import {
  TableRow,
  TableRowCode,
  TableRowLang,
  TableRowRank,
  TableRowScore,
} from "@/components/ui/table-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LEADERBOARD_DATA = [
  {
    rank: "#1",
    score: "1.2",
    code: "function add(a, b) { var result = a + b; return result; } // lol",
    lang: "javascript",
  },
  {
    rank: "#2",
    score: "2.1",
    code: "SELECT * FROM users WHERE id = '" + "' + userId + '",
    lang: "sql",
  },
  {
    rank: "#3",
    score: "3.0",
    code: "i = 0; while True: i += 1; print(i) # no exit condition",
    lang: "python",
  },
];

export default function HomePage() {
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
        <div className="flex items-center gap-6 text-text-tertiary text-[12px] font-mono">
          <span>2,847 codes roasted</span>
          <span>·</span>
          <span>avg score: 4.2/10</span>
        </div>

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
            {LEADERBOARD_DATA.map((row) => (
              <TableRow key={row.rank}>
                <TableRowRank>{row.rank}</TableRowRank>
                <TableRowScore>{row.score}</TableRowScore>
                <TableRowCode>{row.code}</TableRowCode>
                <TableRowLang>{row.lang}</TableRowLang>
              </TableRow>
            ))}
          </div>

          {/* Footer hint */}
          <div className="flex justify-center">
            <p className="text-text-tertiary text-[12px] font-mono">
              showing top 3 of 2,847 ·{" "}
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
