import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { Navbar, NavLink, NavLogo } from "@/components/ui/navbar";
import { ScoreRing } from "@/components/ui/score-ring";
import { TableRow } from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";

export default function ComponentsPage() {
  const exampleCode = `function calculateTotal(items) {
  var total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

  return (
    <div className="min-h-screen bg-bg-page text-text-primary pb-20 font-mono">
      <Navbar>
        <NavLogo>
          <span className="text-accent-green font-bold text-xl mr-2">
            {">"}
          </span>
          <span className="font-medium text-[18px]">devroast</span>
        </NavLogo>
        <div className="flex items-center gap-8">
          <NavLink>leaderboard</NavLink>
          <Button variant="secondary" size="sm">
            Login
          </Button>
        </div>
      </Navbar>

      <div className="max-w-6xl mx-auto p-8 md:p-20 space-y-20">
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-bold text-lg">{"//"}</span>
            <h1 className="text-lg font-bold">component_library</h1>
          </div>
          <p className="text-text-secondary font-sans">
            Biblioteca de componentes visuais sincronizada 100% com o Pencil.
          </p>
        </header>

        <main className="space-y-[60px]">
          {/* Typography */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">typography</h2>
            </div>
            <div className="space-y-5">
              <h3 className="text-4xl font-bold font-mono">
                paste your code. get roasted.
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-accent-green font-bold text-sm">
                  {"//"}
                </span>
                <span className="text-sm font-bold font-mono">
                  detailed_analysis
                </span>
              </div>
              <p className="text-sm text-text-secondary font-mono">
                description text sample
              </p>
              <p className="text-xs text-text-tertiary font-mono">
                lang: javascript · 7 lines
              </p>
              <p className="text-[13px] text-[#FFC799] font-mono">
                function calculateTotal()
              </p>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">buttons</h2>
            </div>
            <div className="flex flex-wrap gap-4 items-end">
              <Button variant="primary">$ roast_my_code</Button>
              <Button variant="secondary" size="sm">
                $ share_roast
              </Button>
              <Button variant="link" size="xs">
                $ view_all {">>"}
              </Button>
            </div>
          </section>

          {/* Toggle */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">toggle</h2>
            </div>
            <div className="flex gap-8">
              <Toggle label="roast mode" defaultChecked />
              <Toggle label="roast mode" />
            </div>
          </section>

          {/* Badges */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">badge_status</h2>
            </div>
            <div className="flex flex-wrap gap-6">
              <Badge variant="destructive">critical</Badge>
              <Badge variant="warning">warning</Badge>
              <Badge variant="success">good</Badge>
              <Badge variant="destructive">needs_serious_help</Badge>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">cards</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="max-w-[480px]">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive" hideDot={false}>
                    critical
                  </Badge>
                </div>
                <h3 className="text-[13px] font-normal font-mono">
                  using var instead of const/let
                </h3>
                <p className="text-[12px] text-text-secondary leading-[1.5] font-mono">
                  the var keyword is function-scoped rather than block-scoped,
                  which can lead to unexpected behavior and bugs. modern
                  javascript uses const for immutable bindings and let for
                  mutable ones.
                </p>
              </Card>
            </div>
          </section>

          {/* Code Blocks */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">code_block</h2>
            </div>
            <CodeBlock
              code={exampleCode}
              filename="calculate.js"
              className="max-w-xl"
            />
          </section>

          {/* Diff Lines */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">diff_line</h2>
            </div>
            <div className="border border-border-primary overflow-hidden max-w-xl">
              <DiffLine variant="removed" code="var total = 0;" />
              <DiffLine variant="added" code="const total = 0;" />
              <DiffLine
                variant="context"
                code="for (let i = 0; i < items.length; i++) {"
              />
            </div>
          </section>

          {/* Table Row */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">table_row</h2>
            </div>
            <div className="border-t border-border-primary">
              <TableRow
                rank="#1"
                score="2.1"
                code="function calculateTotal(items) { var total = 0; ..."
                lang="javascript"
              />
              <TableRow
                rank="#2"
                score="4.5"
                code="const roast = (code) => analyze(code)..."
                lang="typescript"
              />
            </div>
          </section>

          {/* Navbar */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">navbar</h2>
            </div>
            <div className="border border-border-primary overflow-hidden">
              <Navbar>
                <NavLogo>
                  <span className="text-accent-green font-bold text-xl mr-2">
                    {">"}
                  </span>
                  <span className="font-medium text-[18px]">devroast</span>
                </NavLogo>
                <div className="flex items-center gap-8">
                  <NavLink>leaderboard</NavLink>
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </div>
              </Navbar>
            </div>
          </section>

          {/* Score Ring */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {"//"}
              </span>
              <h2 className="text-sm font-bold font-mono">score_ring</h2>
            </div>
            <div className="flex gap-12 items-center">
              <ScoreRing score={3.5} max={10} />
              <ScoreRing score={8.2} max={10} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
