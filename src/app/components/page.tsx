import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
  const variants = [
    "roast",
    "primary",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ] as const;
  const sizes = ["sm", "default", "lg", "icon"] as const;

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-20 font-sans">
      <header className="mb-12 border-b border-border pb-6">
        <h1 className="text-4xl font-bold font-mono tracking-tighter mb-2">
          UI Kit / Components
        </h1>
        <p className="text-muted-foreground">
          Biblioteca de componentes visuais do projeto Dev-roast.
        </p>
      </header>

      <main className="space-y-16">
        {/* Button Section */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold font-mono underline decoration-primary decoration-4 underline-offset-4">
              Buttons
            </h2>
            <p className="text-sm text-muted-foreground">
              Componente de botão flexível com suporte a variantes e tamanhos.
            </p>
          </div>

          <div className="grid gap-12">
            {/* Variants */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                {variants.map((v) => (
                  <div key={v} className="flex flex-col items-center gap-2">
                    <Button variant={v}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </Button>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-6 items-end">
                {sizes.map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <Button variant="roast" size={s}>
                      {s === "icon" ? "★" : `Size ${s}`}
                    </Button>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Combined / States */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                States
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="roast">Normal</Button>
                <Button variant="roast" disabled>
                  Disabled
                </Button>
                <Button variant="outline" className="opacity-70">
                  Hover (Manual)
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
