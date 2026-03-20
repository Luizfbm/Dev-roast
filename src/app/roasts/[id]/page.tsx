import { db } from "@/db";
import { roasts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const roast = await db.query.roasts.findFirst({
    where: eq(roasts.id, id),
  });

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
                Score: {roast.roastScore}/10
              </Badge>
              <span className="text-text-tertiary text-[11px] font-mono">
                ID: {roast.id.slice(0, 8)}
              </span>
            </div>
          </CardHeader>
          <CardTitle className="text-2xl text-accent-amber capitalize">
            {roast.roastScore >= 8
              ? "Atomic Waste Detected"
              : "Technical Debt Alert"}
          </CardTitle>
          <CardDescription className="text-text-primary text-base leading-relaxed italic">
            &quot;{roast.roastFeedback}&quot;
          </CardDescription>
        </Card>

        {/* Code Block Container */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">//</span>
              <h2 className="text-sm font-bold text-text-primary">
                submitted_code
              </h2>
            </div>
            <Badge variant="default" hideDot>
              {roast.language.toUpperCase()}
            </Badge>
          </div>

          <div className="border border-border-primary overflow-hidden shadow-xl">
            <CodeBlock code={roast.codeContent} lang={roast.language} />
          </div>
        </div>

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
