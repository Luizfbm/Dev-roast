import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const verdictEnum = pgEnum("verdict", [
  "needs_serious_help", // score 0-2
  "rough_around_edges", // score 2.1-4
  "decent_code", // score 4.1-6
  "solid_work", // score 6.1-8
  "exceptional", // score 8.1-10
]);

export const severityEnum = pgEnum("severity", [
  "critical", // red — serious problem
  "warning", // yellow — can be improved
  "good", // green — positive point
]);

export const roasts = pgTable(
  "roasts",
  {
    id: uuid().defaultRandom().primaryKey(),
    code: text().notNull(),
    language: varchar({ length: 50 }).notNull(),
    lineCount: integer().notNull(),
    roastMode: boolean().default(false).notNull(),
    score: real().notNull(),
    verdict: verdictEnum().notNull(),
    roastQuote: text(),
    suggestedFix: text(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("roasts_score_idx").on(table.score)],
);

export const analysisItems = pgTable("analysis_items", {
  id: uuid().defaultRandom().primaryKey(),
  roastId: uuid()
    .references(() => roasts.id, { onDelete: "cascade" })
    .notNull(),
  severity: severityEnum().notNull(),
  title: varchar({ length: 200 }).notNull(),
  description: text().notNull(),
  order: integer().notNull(),
});
