import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const languageEnum = pgEnum("language", [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "ruby",
  "java",
  "c",
  "cpp",
  "php",
  "sql",
  "html",
  "css",
  "json",
  "bash",
]);

export const roasts = pgTable("roasts", {
  id: uuid("id").primaryKey().defaultRandom(),
  codeContent: text("code_content").notNull(),
  language: languageEnum("language").notNull(),
  roastScore: integer("roast_score").notNull(), // 0 to 10 scale
  roastFeedback: text("roast_feedback").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
