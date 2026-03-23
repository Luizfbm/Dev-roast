# Leaderboard Page

## 1. Objective
Implement the full Leaderboard page at `/leaderboard` to display up to 20 of the worst code snippets (highest shame). The integration should follow the same server-first principles used in the homepage's Shame Leaderboard.

## 2. Interface (UI)
- The page will reuse the `min-h-screen bg-bg-page` and layout containers (`max-w-[960px] mx-auto`) patterns found in `HomePage`.
- A header indicating "Leaderboard - The worst code on the internet".
- A table or list similar to the Homepage, using the existing `HomeLeaderboardRow` component to display the rank, score, language, and collapsible code block.
- Will display up to 20 items.

## 3. Architecture & Logic
- **Data Fetching:** Pure Server Component `src/app/leaderboard/page.tsx`. Fetch data using `caller.leaderboard.list({ limit: 20 })`. This avoids HTTP overhead.
- **Components:** Reuse the `<HomeLeaderboardRow>` Client Component which handles the `@base-ui/react` Collapsible logic. The Server Component will pass the parsed `<CodeBlockContent />` as children.
- **Loading State:** Utilize `loading.tsx` inside the `/leaderboard` directory to display a skeleton (reusing or extending `HomeLeaderboardSkeleton`) while data fetches.

## 4. Implementation Step-by-Step
1. Create `src/app/leaderboard/loading.tsx` using a skeleton design similar to the homepage leaderboard skeleton.
2. Create `src/app/leaderboard/page.tsx` (Server Component).
3. In `page.tsx`, import `caller` and fetch `caller.leaderboard.list({ limit: 20 })`.
4. Map the results using `HomeLeaderboardRow` and `CodeBlockContent` just like in `src/app/components/home-leaderboard.tsx`.
