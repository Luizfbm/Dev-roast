import { Badge } from "@/components/ui/badge";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { cn } from "@/utils/cn";
import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";

interface LeaderboardEntry {
  id: string;
  rank: number;
  score: number;
  language: string;
  lineCount: number;
  codeSnippet: string;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    score: 1.2,
    language: "javascript",
    lineCount: 3,
    codeSnippet: `eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol`,
  },
  {
    id: "2",
    rank: 2,
    score: 2.5,
    language: "python",
    lineCount: 4,
    codeSnippet: `import os\nos.system("rm -rf /")\n# oops was that important?\nprint("done")`,
  },
  {
    id: "3",
    rank: 3,
    score: 3.8,
    language: "typescript",
    lineCount: 5,
    codeSnippet: `const x: any = "10";\nconst y: any = 5;\n// why bother with types\nconsole.log(x + y);\nconsole.log(x - y);`,
  },
  {
    id: "4",
    rank: 4,
    score: 4.2,
    language: "go",
    lineCount: 4,
    codeSnippet: `func main() {\n  go func() {\n    panic("catch me if you can")\n  }()\n}`,
  },
  {
    id: "5",
    rank: 5,
    score: 5.0,
    language: "rust",
    lineCount: 3,
    codeSnippet: `fn main() {\n  unsafe { *(0x1234 as *mut i32) = 42; }\n}`,
  },
];

export default function LeaderboardPage() {
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
                12,482
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-text-tertiary font-mono text-[10px] uppercase tracking-wider">
                average score
              </span>
              <span className="text-accent-red font-mono text-xl font-bold">
                2.4
              </span>
            </div>
          </div>
        </section>

        {/* Entries */}
        <section className="flex flex-col gap-6">
          {MOCK_LEADERBOARD.map((entry) => (
            <div
              key={entry.id}
              className="group flex flex-col border border-border-primary bg-bg-surface hover:border-accent-green/30 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-accent-green/5"
            >
              {/* Meta Row */}
              <div className="flex items-center justify-between h-12 px-5 border-b border-border-primary bg-bg-surface/50 group-hover:bg-bg-elevated transition-colors">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 min-w-[40px]">
                    <span className="text-text-tertiary font-mono text-xs opacity-50">
                      #
                    </span>
                    <span
                      className={cn(
                        "font-mono text-sm font-bold",
                        entry.rank === 1
                          ? "text-accent-amber"
                          : "text-text-primary",
                      )}
                    >
                      {entry.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-text-tertiary font-mono text-[10px] uppercase tracking-wider">
                      score:
                    </span>
                    <span
                      className={cn(
                        "font-mono text-sm font-bold",
                        entry.score <= 3
                          ? "text-accent-red"
                          : "text-accent-amber",
                      )}
                    >
                      {entry.score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-text-secondary font-mono text-[11px] lowercase">
                      {entry.language}
                    </span>
                    <span className="text-text-tertiary font-mono text-[11px] opacity-60">
                      {entry.lineCount} lines
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-accent-green group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Code Snippet Area */}
              <CodeBlock className="border-none shadow-none bg-transparent border-t border-border-primary rounded-none">
                <CodeBlockContent
                  code={entry.codeSnippet}
                  lang={entry.language}
                />
              </CodeBlock>
            </div>
          ))}
        </section>

        {/* Explore more CTA */}
        <div className="flex justify-center py-10">
          <p className="text-text-tertiary font-mono text-xs animate-pulse">
            // scroll to see more shame
          </p>
        </div>
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
