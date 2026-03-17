import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { NavLink, NavLogo, Navbar } from "@/components/ui/navbar";
import { Toggle } from "@/components/ui/toggle";

export default function ComponentsPage() {
  const buttonVariants = [
    "roast",
    "primary",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ] as const;

  const badgeVariants = [
    "default",
    "destructive",
    "warning",
    "success",
  ] as const;

  const exampleCode = `function calculateRoast(code: string) {
  const complexity = analyze(code);
  return complexity > 10 ? "brutal" : "soft";
}`;

  return (
    <div className="min-h-screen bg-bg-page text-text-primary pb-20 font-sans">
      <Navbar>
        <NavLogo>
          <span className="text-accent-green font-bold font-mono text-xl">
            {">"}
          </span>
          <span className="font-mono font-medium text-[18px]">devroast</span>
        </NavLogo>
        <div className="flex items-center gap-8">
          <NavLink>leaderboard</NavLink>
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>
      </Navbar>

      <div className="max-w-6xl mx-auto p-8 md:p-20 space-y-16">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold font-mono tracking-tighter">
            UI Kit / Components
          </h1>
          <p className="text-text-secondary">
            Biblioteca de componentes visuais do projeto Dev-roast.
          </p>
        </header>

        <main className="space-y-16">
          {/* Buttons */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold font-mono underline decoration-accent-green decoration-4 underline-offset-8">
              {/* buttons */}
            </h2>
            <div className="flex flex-wrap gap-4">
              {buttonVariants.map((v) => (
                <Button key={v} variant={v}>
                  {v}
                </Button>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold font-mono underline decoration-accent-green decoration-4 underline-offset-8">
              {/* status_badges */}
            </h2>
            <div className="flex flex-wrap gap-6">
              {badgeVariants.map((v) => (
                <Badge key={v} variant={v}>
                  {v}
                </Badge>
              ))}
            </div>
          </section>

          {/* Toggles */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold font-mono underline decoration-accent-green decoration-4 underline-offset-8">
              {/* toggles */}
            </h2>
            <div className="flex gap-8">
              <Toggle label="roast mode" defaultChecked />
              <Toggle label="roast mode" />
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold font-mono underline decoration-accent-green decoration-4 underline-offset-8">
              {/* cards */}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center gap-2">
                  <span className="text-accent-red font-bold font-mono text-lg">
                    {"//"}
                  </span>
                  <h3 className="font-mono font-bold">Insecure Password</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Your code is using md5 for hashing passwords. That's so 2005.
                  At least use bcrypt or argon2.
                </p>
                <Badge variant="destructive">critical_security_risk</Badge>
              </Card>
              <Card>
                <div className="flex items-center gap-2">
                  <span className="text-accent-amber font-bold font-mono text-lg">
                    {"//"}
                  </span>
                  <h3 className="font-mono font-bold">Unused Variables</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Variables that are declared but never used are just clutter.
                  Clean it up.
                </p>
                <Badge variant="warning">warning</Badge>
              </Card>
            </div>
          </section>

          {/* Code Blocks */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold font-mono underline decoration-accent-green decoration-4 underline-offset-8">
              {/* code_blocks */}
            </h2>
            <CodeBlock
              code={exampleCode}
              filename="roast-engine.ts"
              className="max-w-2xl"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
