import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <h1 className="text-2xl font-bold font-sans">Component Gallery</h1>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Roast Mode</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button variant="outline" size="xs">
          Extra Small
        </Button>
      </div>
    </div>
  );
}
