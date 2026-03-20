# devroast 🚀

> **Paste your code. Get roasted.**

DevRoast is a modern web application designed to analyze and "roast" code snippets. It provides a brutal (or honest) score and a detailed analysis of code smells, bad practices, and modern alternatives.

## ✨ Features

- **Code Roasting:** Get a "shame score" and a detailed critique of your code.
- **Server-Side Syntax Highlighting:** Powered by **Shiki** with the classic **Vesper** theme.
- **Modern UI:** Clean, terminal-inspired design synchronized with high-fidelity mockups.
- **Shame Leaderboard:** See the worst code snippets ranked by their lack of quality.
- **Responsive Components:** Built with accessibility and performance in mind.

## 🛠️ Technical Stack

- **Core:** [Next.js 16.2](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
  - Utilizes the new `@theme` directive and native CSS variables.
  - No legacy `tailwind.config.js`.
- **Components:**
  - [Tailwind Variants (TV)](https://www.tailwind-variants.org/): For high-performance, type-safe component variations.
  - [Base UI](https://base-ui.com/): Unstyled primitives for accessible interactive elements.
  - [Lucide React](https://lucide.dev/): Crisp, consistent iconography.
- **Code Rendering:** [Shiki](https://shiki.style/) for zero-bundle-size syntax highlighting (Server Component implementation).
- **Tooling:** [Biome](https://biomejs.dev/) for extremely fast linting and formatting.

## 🏗️ Architecture & Patterns

### Atomic & Composite UI
The project follows a **Composition Pattern** with individual named exports for sub-components. This allows for clear, semantic JSX while maintaining high flexibility.

Example of `Card` composition:
```tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

<Card>
  <CardHeader>
    <Badge>Status</Badge>
  </CardHeader>
  <CardTitle>Bad Practice Detected</CardTitle>
  <CardDescription>Description of why this code is bad...</CardDescription>
</Card>
```

### Server vs. Client Components
- **Server Components:** Heavy-lifting tasks like syntax highlighting (via Shiki) are kept on the server to reduce the client-side JavaScript footprint.
- **Client Components:** Only used for interactive primitives like toggles and inputs where necessary.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to see the roast in action.

### Build
```bash
pnpm build
pnpm start
```

## 🧹 Quality Control

We use **Biome** for linting and formatting. It's configured to be strict and fast.

```bash
pnpm lint    # Run check
pnpm format  # Format files
```

---

*Made with ☕ and a bit of salt by the DevRoast team.*
