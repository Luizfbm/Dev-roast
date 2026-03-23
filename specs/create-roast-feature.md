# Specification: Create Roast Feature

## 1. Objective
Implement the core functionality of the DevRoast application: allowing users to submit code snippets, receive an AI-generated roast (analysis) powered by Google Gemini, and navigate to the result page. This feature must strictly adhere to the Server-First philosophy, utilizing tRPC for database operations and server-side logic while keeping the frontend client minimal.

## 2. Requirements
- **Inputs:** Users provide code content, select a programming language, and optionally toggle a "Sarcastic Mode" (`roastMode`).
- **Processing:** The backend uses the official `@google/genai` SDK with the `gemini-1.5-flash` model to analyze the code based on the selected mode. The AI must return structured JSON matching the database schema.
- **Exclusions:** The "Share Roast" functionality will not be implemented in this phase.
- **Architectural constraint:** Processing must happen synchronously via a tRPC mutation (Option 1).

## 3. Architecture & Data Flow
1. **Frontend Request:**
   - The `<CodeEditor />` (Client Component) gathers `code`, `language`, and `roastMode`.
   - On submission, it triggers a `createRoast` tRPC mutation.
   - The UI enters a loading state (spinner/disabling button) while waiting.
2. **Backend Processing (tRPC `createRoast` Router):**
   - Validates input via Zod.
   - Constructs a detailed prompt depending on `roastMode` (sarcastic vs. constructive).
   - Calls Gemini API enforcing `responseMimeType: "application/json"` mapped to the expected output properties (`score`, `verdict`, `title`, `suggestedFix`, and an array of `analysisItems`).
3. **Database Insertion (Drizzle ORM):**
   - Parses the JSON response.
   - Inserts the generated roast into the `roasts` table.
   - Inserts the associated analysis insights into the `analysis_items` table (within a transaction if possible).
4. **Redirection:**
   - The tRPC router returns the newly created `roast.id` to the frontend.
   - `<CodeEditor />` utilizes `next/navigation useRouter().push('/roasts/' + id)` to redirect the user.

## 4. UI/UX Changes
- Update the `<CodeEditor />` to map the actual values to the Drizzle/tRPC types.
- Update the mock responses in the front-end to utilize the actual tRPC results.

## 5. Implementation Steps
1. Install `@google/genai` SDK.
2. Create the `create` procedure in `src/trpc/routers/roast.ts`.
3. Construct the Google Gemini generation pipeline and prompt engineering.
4. Set up database inserts using Drizzle `db.transaction`.
5. Connect `<CodeEditor />` button action to the mutation and handle Next.js redirection.

## 6. Testing Plan
- Enter a short, obviously broken valid code snippet in the app.
- Turn ON `roastMode`. Submit.
- Verify the DB populates correctly with sarcastic analysis issues.
- Verify that redirection lands exactly on the matching results page without visual glitches.
