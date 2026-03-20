# DevRoast - Agent Guide 🤖

## 🎯 Tech Stack
- **Next.js 16.2 (App Router)** & **React 19**
- **Tailwind CSS v4** (Directly in `globals.css` via `@theme`)
- **Shiki** (Server-side syntax highlighting)
- **Base UI** (Headless primitives)
- **Tailwind Variants (TV)** (Style & variance management)
- **Biome** (Linting & Formatting)

## 🏗️ Architecture Patterns

### Component Composition
Always use **named exports** for sub-components instead of a single object (e.g., `<CardTitle />` not `<Card.Title />`).
- **Primitivos:** `src/components/ui`
- **Componentes do App:** `src/app/components`

### Styling (Tailwind v4)
- **Zero Config:** All design tokens live in `src/app/globals.css` under the `@theme` directive.
- **Dynamic Classes:** Always use `clsx` and `tailwind-merge` (via `tv()` or `cn()`) for dynamic classes.
- **Disabled State:** Use `enabled:hover:` for button hover effects.

### Server-first Philosophy
- Render syntax highlighting (Shiki) as a **Server Component** (`async`) to minimize client-side JS.
- Keep components as Server Components by default; use `"use client"` only for interactivity.

## 🧹 Workflow
- **Lint/Format:** `pnpm lint` and `pnpm format` (Powered by Biome).
- **Design:** Synchronized with `design.pen` via Pencil MCP.
