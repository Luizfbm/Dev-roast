import { Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";
import { DiffLine } from "@/components/ui/diff-line";

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Extract id just in case it's needed later
  const { id } = await params;

  // Mock static data strictly matching the Pencil design
  const MOCK_ROAST = {
    id: id,
    score: 3.5,
    verdict: "needs_serious_help",
    title: `"this code looks like it was written during a power outage... in 2005."`,
    language: "javascript",
    lineCount: 7,
    originalCode: `function calculateTotal(items) {
  var total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`,
    issues: [
      {
        id: "1",
        title: "var keyword usage",
        description:
          "the var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs. modern javascript uses const for immutable bindings and let for mutable ones.",
      },
      {
        id: "2",
        title: "mutable state",
        description:
          "the variable is mutated directly within a standard loop. using functional array methods like .reduce() produces cleaner, less error-prone code without explicit state mutation.",
      },
      {
        id: "3",
        title: "inefficient loop",
        description:
          "evaluating array length on every iteration is less optimal than caching it. although modern engines optimize this, for...of is significantly more readable.",
      },
      {
        id: "4",
        title: "magic numbers",
        description:
          "initializes total with 0 which is fine, but contextually lacks property types or structures. could potentially run into type coercion issues if item.price is not guaranteed to be a number.",
      },
    ],
    diff: [
      { type: "context", text: "  function calculateTotal(items) {" },
      { type: "removed", text: "-   var total = 0;" },
      { type: "removed", text: "-   for (let i = 0; i < items.length; i++) {" },
      { type: "removed", text: "-     total += items[i].price;" },
      { type: "removed", text: "-   }" },
      { type: "removed", text: "-   return total;" },
      { type: "added",   text: "+   return items.reduce((acc, item) => acc + item.price, 0);" },
      { type: "context", text: "  }" },
    ],
  } as const;

  return (
    <main className="min-h-screen bg-bg-page pt-20 px-4 sm:px-10 lg:px-20 pb-20">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        
        {/* Score Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full">
          <ScoreRing score={MOCK_ROAST.score} max={10} className="shrink-0" />
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-red shrink-0" />
              <span className="text-accent-red font-mono text-[13px] font-medium">
                verdict: {MOCK_ROAST.verdict}
              </span>
            </div>
            
            <h1 className="text-text-primary font-mono text-[20px] leading-[1.5] w-full max-w-[700px]">
              {MOCK_ROAST.title}
            </h1>
            
            <div className="flex items-center gap-4 text-text-tertiary font-mono text-[12px]">
              <span>lang: {MOCK_ROAST.language}</span>
              <span>·</span>
              <span>{MOCK_ROAST.lineCount} lines</span>
            </div>
            
            <div className="mt-2">
              <Button variant="secondary" size="md" className="gap-2 text-[12px] h-9">
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
            <CodeBlockContent code={MOCK_ROAST.originalCode} lang={MOCK_ROAST.language} />
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
            {MOCK_ROAST.issues.map((issue) => (
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
          
          <div className="w-full border border-border-primary bg-bg-input overflow-hidden flex flex-col">
            <div className="h-10 border-b border-border-primary flex items-center px-4 shrink-0">
              <span className="text-text-secondary font-mono text-[12px] font-medium">
                your_code.js → improved_code.js
              </span>
            </div>
            <div className="flex flex-col py-1 overflow-x-auto">
              {MOCK_ROAST.diff.map((line, idx) => (
                <DiffLine
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  variant={line.type as "added" | "removed" | "context"}
                  code={line.text.replace(/^[+-]\s/, "")} // Remove explicit +/- from code string as DiffLine handles prefix
                />
              ))}
            </div>
          </div>
        </section>
        
      </div>
    </main>
  );
}
