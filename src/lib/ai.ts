import { createOpenAI } from "@ai-sdk/openai";

// Agnostic AI setup
// You can easily swap 'openai' with 'anthropic', 'google', etc.
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Using a cost-effective but capable model as default
export const model = openai("gpt-4o-mini");
