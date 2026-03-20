import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Info,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoastById } from "@/app/actions/roast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock, CodeBlockContent, CodeBlockHeader } from "@/components/ui/code-block";

export const dynamic = "force-dynamic";

const SeverityIcon = ({ severity }: { severity: string }) => {
  switch (severity) {
    case "critical":
      return <AlertTriangle className="w-4 h-4 text-accent-red" />;
    case "warning":
      return <Info className="w-4 h-4 text-accent-amber" />;
    case "good":
      return <CheckCircle2 className="w-4 h-4 text-accent-green" />;
    default:
      return null;
  }
};

const VerdictLabel: Record<string, string> = {
  needs_serious_help: "Needs Serious Help",
  rough_around_edges: "Rough Around the Edges",
  decent_code: "Decent Code",
  solid_work: "Solid Work",
  exceptional: "Exceptional",
};

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const roast = await getRoastById(id);

  if (!roast) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-page py-20 px-10">
      <div className="max-w-[780px] mx-auto flex flex-col gap-8">
        {/* Navigation */}
        <Link href="/">
          <Button variant="secondary" size="xs" className="gap-2">
            <ArrowLeft className="w-3 h-3" />$ back_to_editor
          </Button>
        </Link>

        {/* Roast Header Card */}
        <Card className="border-accent-amber/30 bg-accent-amber/5">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <Badge variant="warning" size="lg">
                Score: {roast.score.toFixed(1)}/10
              </Badge>
              <span className="text-text-tertiary text-[11px] font-mono">
                ID: {roast.id.slice(0, 8)}
              </span>
            </div>
          </CardHeader>
          <CardTitle className="text-2xl text-accent-amber capitalize">
            {VerdictLabel[roast.verdict]}
          </CardTitle>
          <CardDescription className="text-text-primary text-base leading-relaxed italic">
            &quot;{roast.roastQuote}&quot;
          </CardDescription>
        </Card>

        {/* Analysis Items */}
        {roast.analysisItems && roast.analysisItems.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-tight">
              // analysis_findings
            </h3>
            <div className="grid gap-3">
              {roast.analysisItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-border-primary bg-bg-surface flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <SeverityIcon severity={item.severity} />
                    <span className="text-xs font-bold text-text-primary uppercase">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-snug">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Block */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">//</span>
              <h2 className="text-sm font-bold text-text-primary">
                original_mess
              </h2>
            </div>
            <Badge variant="default" hideDot>
              {roast.language.toUpperCase()} ({roast.lineCount} lines)
            </Badge>
          </div>
          <CodeBlock className="shadow-xl">
            <CodeBlockHeader />
            <CodeBlockContent code={roast.code} lang={roast.language} />
          </CodeBlock>
        </div>

        {/* Suggested Fix */}
        {roast.suggestedFix && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">//</span>
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-tight">
                suggested_redemption
              </h2>
            </div>
            <CodeBlock className="shadow-xl">
              <CodeBlockHeader />
              <CodeBlockContent code={roast.suggestedFix} lang={roast.language} />
            </CodeBlock>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button variant="primary" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Roast
          </Button>
        </div>
      </div>
    </main>
  );
}
