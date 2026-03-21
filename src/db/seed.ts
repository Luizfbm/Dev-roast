import "dotenv/config";
import { faker } from "@faker-js/faker";
import { db } from "./index";
import { roasts, analysisItems } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  const languages = [
    "typescript",
    "javascript",
    "python",
    "go",
    "rust",
    "java",
  ];
  const verdicts: (
    | "needs_serious_help"
    | "rough_around_edges"
    | "decent_code"
    | "solid_work"
    | "exceptional"
  )[] = [
    "needs_serious_help",
    "rough_around_edges",
    "decent_code",
    "solid_work",
    "exceptional",
  ];

  const severities: ("critical" | "warning" | "good")[] = [
    "critical",
    "warning",
    "good",
  ];

  // Clear existing data (optional, but requested by user to "populate" usually implies fresh or additional)
  // For safety in this tool, we will just ADD 100 roasts.

  for (let i = 0; i < 100; i++) {
    const score = Number.parseFloat(
      faker.number.float({ min: 0, max: 10, fractionDigits: 1 }).toFixed(1),
    );

    // Determine verdict based on score (to match site logic)
    let verdict: (typeof verdicts)[number];
    if (score <= 2) verdict = "needs_serious_help";
    else if (score <= 4) verdict = "rough_around_edges";
    else if (score <= 6) verdict = "decent_code";
    else if (score <= 8) verdict = "solid_work";
    else verdict = "exceptional";

    await db.transaction(async (tx) => {
      const [insertedRoast] = await tx
        .insert(roasts)
        .values({
          code:
            faker.commerce.productDescription() +
            "\n\n" +
            faker.lorem.paragraphs(2),
          language: faker.helpers.arrayElement(languages),
          lineCount: faker.number.int({ min: 10, max: 500 }),
          roastMode: faker.datatype.boolean(),
          score: score,
          verdict: verdict,
          roastQuote: faker.lorem.sentence(),
          suggestedFix: "// Suggested improvement\n" + faker.lorem.paragraph(),
        })
        .returning();

      const itemsCount = faker.number.int({ min: 2, max: 5 });
      const items = Array.from({ length: itemsCount }).map((_, idx) => ({
        roastId: insertedRoast.id,
        severity: faker.helpers.arrayElement(severities),
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        order: idx,
      }));

      await tx.insert(analysisItems).values(items);
    });

    if ((i + 1) % 10 === 0) {
      console.log(`✅ ${i + 1} roasts inserted...`);
    }
  }

  console.log("✨ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});
