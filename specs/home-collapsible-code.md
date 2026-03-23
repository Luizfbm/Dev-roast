# Home Leaderboard Collapsible Code

## 1. Objective
Refactor the "Shame Leaderboard" on the Homepage to display the code snippets using `CodeBlock` with Shiki syntax highlighting, and implement a collapsible "Show more/Show less" interaction using `@base-ui/react` to prevent long codes from stretching the page.

## 2. Interface (UI)
- The table rows currently truncating at 3 lines will be replaced by a custom Client Component `<HomeLeaderboardRow />`.
- Initially, the row should show a maximum height (e.g., 100px) with `overflow-hidden`.
- A `<button>` or trigger from `@base-ui/react` `Collapsible` will toggle the full view of the code block.
- The syntax highlighting will be provided by `CodeBlockContent`.

## 3. Architecture & Logic
- **Constraint**: `CodeBlockContent` with Shiki runs Exclusively on the Server (Async RSC).
- **Current Flow**: We are fetching data via React Query `useSuspenseQueries` in a Client Component. This prevents us from mounting `CodeBlockContent` over the data.
- **Solution**: We will refator the Data Fetching to occur purely in the `HomeLeaderboard` (RSC) using `caller.leaderboard.list()` and `caller.roast.getStats()`. 
- **Suspense Mechanism**: Since `HomeLeaderboard` becomes `async` and does the fetch directly on the Server, the `<Suspense>` wrapper in `page.tsx` will inherently trigger the `<HomeLeaderboardSkeleton>` during the streaming, fulfilling the UX requirement smoothly.
- **Data Passing**: The RSC will map over the data and pass the populated `<CodeBlockContent />` as `children` into the Client Component `<HomeLeaderboardRow />`.

## 4. Implementation Step-by-Step
1. Delete `src/app/components/home-leaderboard-client.tsx` since we move data logic to the Server.
2. Create `src/app/components/home-leaderboard-row.tsx` (Client Component) utilizing `@base-ui/react`'s `Collapsible` root to wrap the `children` (Code HTML) with a toggle button.
3. Overwrite `src/app/components/home-leaderboard.tsx` to handle the data fetching via `caller`, mapping the UI, and rendering the new rows.
4. Verify the UI expansion gracefully on the browser.
