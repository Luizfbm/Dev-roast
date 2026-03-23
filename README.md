# DevRoast 🚀

> **Paste your code. Get roasted.**

DevRoast is an AI-powered code roasting platform. Users submit code snippets to receive brutal (or honest) critiques, bad practice analysis, and "shame scores." It features a global leaderboard for the most "shameful" code and generates shareable opengraph images for social media.

---

## ✨ Features

- **🔥 AI Code Roasting:** Get a "shame score" and a detailed, witty critique of your code.
- **🏆 Shame Leaderboard:** See the worst code snippets ranked globally.
- **🖼️ Shareable Results:** Automatically generated opengraph images for sharing your roast results on social media.
- **⚡ Server-Side Syntax Highlighting:** Powered by **Shiki** with Zero-bundle-size on the client.
- **✨ Animated Metrics:** Smooth number transitions using **NumberFlow**.
- **🎨 Modern Terminal UI:** Clean, glassmorphic design built with high-fidelity components.

---

## 🏗️ Architecture & Patterns

DevRoast follows a **Server-first Philosophy**, leveraging React 19 and Next.js 16 (App Router) features to minimize client-side JavaScript.

### 1. Hybrid Rendering Strategy
We use the **Prefetch + Hydration** pattern for optimal performance:
- **Server:** Data is prefetched using tRPC in Server Components.
- **Client:** Data is hydrated into TanStack React Query cache, ensuring instant UI rendering without loading states for existing data.

### 2. End-to-End Type Safety
Full type safety from the database (Drizzle) through the API (tRPC) to the React components.

### 3. Component Composition
Atomic and feature components use named exports for high flexibility and clear semantic structure:
- `src/components/ui`: Primitive headless components (built with Base UI).
- `src/app/components`: Feature-specific domain components.

---

## 🛠️ Technical Stack

### Core
- **Framework:** [Next.js 16.2](https://nextjs.org/) (App Router)
- **Runtime:** [React 19](https://react.dev/)
- **Language:** TypeScript

### API & Data
- **Backend API:** [tRPC v11](https://trpc.io/)
- **State Management:** [TanStack React Query v5](https://tanstack.com/query)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL (with `pg` & `postgres.js`)

### AI & Logic
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/)
- **LLM Providers:** OpenAI / Google Gemini
- **Syntax Highlighting:** [Shiki](https://shiki.style/) (implemented as Server Component)

### UI & Styling
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/) (using `@theme` directive)
- **Headless UI:** [Base UI](https://base-ui.com/)
- **Variations:** [Tailwind Variants](https://www.tailwind-variants.org/)
- **Animations:** [@number-flow/react](https://number-flow.barvian.answers.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Organization

```text
src/
├── app/              # App Router pages, layouts, and feature components
├── components/       # UI Core (Atomic/Primitive components)
│   └── ui/           # Headless & unstyled primitives
├── db/               # Drizzle schema, migrations, and seeds
├── lib/              # Core logic & third-party integrations (AI, Shiki)
├── server/           # Backend-only logic & tRPC procedures
├── trpc/             # tRPC infrastructure (routers, contexts, clients)
└── utils/            # Shared helper functions (cn, clsx, etc.)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (optional, for local DB)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Setup Environment Variables:
   ```bash
   cp .env.example .env
   ```
   *Note: Add your `DATABASE_URL` and `OPENAI_API_KEY` (or other AI provider).*

4. Setup Database:
   ```bash
   pnpm db:push   # Push schema to DB
   pnpm db:seed   # Optional: Populate with sample data
   ```

### Development

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 🧹 Quality Control

We use **Biome** for lightning-fast linting and formatting.

```bash
pnpm lint    # Check for issues
pnpm format  # Auto-format files
```

---

## 🎨 Design System

The design is synchronized with `design.pen` using the **Pencil MCP**. All design tokens are managed via Tailwind v4's native CSS variables in `src/app/globals.css`.

---

*Made with ☕ and honest (brutal) feedback.*
