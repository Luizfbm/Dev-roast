# DevRoast - Agent Guide 🤖

## 🎯 Tech Stack
- **Next.js 16.2 (App Router)** & **React 19**
- **tRPC v11 + TanStack React Query** (End-to-end type-safe APIs)
- **Drizzle ORM** (PostgreSQL Database management)
- **Tailwind CSS v4** (Directly in `globals.css` via `@theme`)
- **Shiki** (Server-side syntax highlighting)
- **Base UI** (Headless primitives)
- **Tailwind Variants (TV)** (Style & variance management)
- **Biome** (Linting & Formatting)
- **NumberFlow** (`@number-flow/react` for animated numbers)

## 🏗️ Architecture Patterns

### Component Composition
Always use **named exports** for sub-components instead of a single object (e.g., `<CardTitle />` not `<Card.Title />`).
- **Primitivos:** `src/components/ui`
- **Componentes do App:** `src/app/components`

### Styling (Tailwind v4)
- **Zero Config:** All design tokens live in `src/app/globals.css` under the `@theme` directive.
- **Dynamic Classes:** Always use `clsx` and `tailwind-merge` (via `tv()` or `cn()`) for dynamic classes.
- **Disabled State:** Use `enabled:hover:` for button hover effects.

### Server-first Philosophy & API (tRPC)
- Render syntax highlighting (Shiki) as a **Server Component** (`async`) to minimize client-side JS.
- Keep components as Server Components by default; use `"use client"` only for interactivity.
- Use **tRPC `createTRPCOptionsProxy`** for prefetching data in React Server Components (`prefetch(trpc.route.queryOptions())`) and `useSuspenseQuery` / `useQuery` via the **tRPC Client** in Client Components.

### 📡 Como Consumir o tRPC no Front-End

Há 3 formas oficiais homologadas de interagir com as rotas/banco no App Router:

#### 1. O Padrão Ouro: Server Prefetch + Hydration
Use este método para entregar páginas rápidas (SEO amigável) e tornar os dados imediatamente disponíveis nos componentes Client. 
**Dica Core:** Para mais de um dado, SEMPRE opte pelo uso do `await Promise.all()` injetando os `prefetch()` dentro, garantindo que o seu backend/banco dispare todas as request queries concorrentemente reduzindo o payload de latência. (Envolva a árvore parente disso com `<Suspense>`).

**No Server Component (`page.tsx`):**
```tsx
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { MeuClientComponent } from "./client-component";

export default async function Page() {
  // Dispare e aguarde seus múltiplos prefetches em paralelo sempre que possivel
  await Promise.all([
    prefetch(trpc.roast.getById.queryOptions({ id: "unq-123" })),
    prefetch(trpc.roast.getStats.queryOptions()),
  ]);

  return (
    // Transfere os Promises/Dados hidratados para os Clients abaixo
    <HydrateClient>
      <MeuClientComponent />
    </HydrateClient>
  );
}
```

#### 2. O Consumo Reativo (Client Components)
O Client busca os dados. E graças ao `HydrateClient` (passo anterior), se o dado já foi pré-buscado no servidor, a UI aparece estantaneamente pronta!

**No Client Component (`client-component.tsx`):**
```tsx
"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function MeuClientComponent() {
  const trpc = useTRPC();
  
  // Como usamos "Suspense", não precisamos checar isLoading. 
  // O React aguarda silenciosamente ou joga o fallback (se ainda buscando).
  const { data } = useSuspenseQuery(trpc.roast.getById.queryOptions({ id: "unq-123" }));

  return <div>{data.roastQuote}</div>;
}
```

#### 3. Leitura Fechada no Servidor (Caller)
Se o componente for puramente de servidor (Ex: MetaTags, rotas protegidas super simples) e a interatividade Client for nula para aquele dado, poupe banda não enviando pelo React Query e chame o banco diretamente através do `caller`:

```tsx
import { caller } from "@/trpc/server";

export async function generateMetadata({ params }) {
  // Ignora a API HTTP inteiramente e aciona as rules/db na veia do backend
  const data = await caller.roast.getById({ id: params.id });
  return { title: data.roastQuote };
}
```

## 🧹 Workflow
- **Spec-First Development:** Before coding new features, ALWAYS create a structured markdown specification in the `specs/` directory (following `specs/AGENTS.md` template) to document requirements, architecture, UI, and steps.
- **Lint/Format:** `pnpm lint` e `pnpm format` (Powered by Biome).
- **Design:** Synchronized with `design.pen` via Pencil MCP.
