import { Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";
import { DiffLine } from "@/components/ui/diff-line";
import { caller } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const roast = await caller.roast.getById({ id });

  if (!roast) {
    return notFound();
  }

  // Formatting diff for the UI (the AI returns raw string, but our DiffLine expects formatted line)
  // Our AI prompt says suggestedFix is just the code. 
  // We'll show the original vs suggested.
  
  return (
    <main className="min-h-screen bg-bg-page pt-20 px-4 sm:px-10 lg:px-20 pb-20">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        {/* Score Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full">
          <ScoreRing score={roast.score} max={10} className="shrink-0" />

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-red shrink-0" />
              <span className="text-accent-red font-mono text-[13px] font-medium">
                verdict: {roast.verdict}
              </span>
            </div>

            <h1 className="text-text-primary font-mono text-[20px] leading-[1.5] w-full max-w-[700px]">
              {roast.roastQuote}
            </h1>

            <div className="flex items-center gap-4 text-text-tertiary font-mono text-[12px]">
              <span>lang: {roast.language}</span>
              <span>·</span>
              <span>{roast.lineCount} lines</span>
            </div>

            <div className="mt-2">
              <Button
                variant="secondary"
                size="default"
                className="gap-2 text-[12px] h-9"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Result
              </Button>
            </div>
          </div>
        </section>

        <hr className="border-t border-border-primary w-full" />

        {/* Submitted Code Section */}
        <section className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-mono text-[14px] font-bold">
              //
            </span>
            <h2 className="text-text-primary font-mono text-[14px] font-bold">
              your_submission
            </h2>
          </div>
          <CodeBlock className="w-full">
            <CodeBlockContent
              code={roast.code}
              lang={roast.language}
            />
          </CodeBlock>
        </section>

        <hr className="border-t border-border-primary w-full" />

        {/* Analysis Section */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-mono text-[14px] font-bold">
              //
            </span>
            <h2 className="text-text-primary font-mono text-[14px] font-bold">
              detailed_analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {roast.analysisItems.map((issue) => (
              <div
                key={issue.id}
                className="flex flex-col gap-3 p-5 border border-border-primary bg-bg-page/50"
              >
                <div className="text-text-primary font-mono text-[14px] font-bold">
                  {issue.title}
                </div>
                <div className="text-text-secondary font-mono text-[13px] leading-relaxed">
                  {issue.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-border-primary w-full" />

        {/* Diff Section */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-mono text-[14px] font-bold">
              //
            </span>
            <h2 className="text-text-primary font-mono text-[14px] font-bold">
              suggested_fix
            </h2>
          </div>

          <CodeBlock className="w-full">
            <CodeBlockContent
              code={roast.suggestedFix ?? ""}
              lang={roast.language}
            />
          </CodeBlock>
        </section>
      </div>
    </main>
  );
}
