import "dotenv/config";
import { faker } from "@faker-js/faker";
import { db } from "./index";
import { roasts, analysisItems } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  const codeSnippets: Record<string, string[]> = {
    javascript: [
      "function checkTrue(val) {\n  if (val === true) {\n    return true;\n  } else {\n    return false;\n  }\n}",
      "let x = 1;\nx = x + 1;\nx = x * 2;\n// why is this not working",
      "const getArray = () => {\n  return new Array(10).fill(0).map((_, i) => i);\n};\n// too much memory?",
      "try {\n  doRiskyThing();\n} catch (e) {\n  console.log(e); // I'll fix this later\n}",
    ],
    typescript: [
      "const isString = (val: any): boolean => {\n  return typeof val === 'string' ? true : false;\n};",
      "type AnyType = any;\nconst doSomething = (data: AnyType) => {\n  console.log(data.missing.property);\n};",
      "interface User {\n  name: string;\n  age: number;\n}\n\n// I don't know what types to use here\nlet user: any = { name: 'Bob', age: 30 };",
    ],
    python: [
      "def is_even(num):\n    if num == 1:\n        return False\n    elif num == 2:\n        return True\n    elif num == 3:\n        return False\n    # ... needs more",
      "my_list = []\nfor i in range(len(my_array)):\n    my_list.append(my_array[i])",
      "x = 0\nwhile x < 10:\n    print(x)\n    x = x + 1\n    if x == 10:\n        break",
    ],
    go: [
      "func isTrue(b bool) bool {\n\tif b == true {\n\t\treturn true\n\t} else {\n\t\treturn false\n\t}\n}",
      "var err error\nif err != nil {\n\tpanic(err)\n}",
      "func makeSlice() []int {\n\ts := make([]int, 0)\n\tfor i := 0; i < 100; i++ {\n\t\ts = append(s, i)\n\t}\n\treturn s\n}",
    ],
    rust: [
      "fn get_five() -> i32 {\n    let x = 5;\n    return x;\n}",
      "let mut s = String::from(\"hello\");\ns.push_str(\", world!\");\n// I am not sure what I'm doing",
      "fn do_something(val: bool) -> bool {\n    if val == true {\n        true\n    } else {\n        false\n    }\n}",
    ],
    java: [
      "public boolean isTrue(boolean b) {\n    if (b == true) {\n        return true;\n    } else {\n        return false;\n    }\n}",
      "try {\n    doSomething();\n} catch (Exception e) {\n    // ignore\n}",
      "String s = \"\";\nfor(int i=0; i<100; i++) {\n    s += i;\n}\nSystem.out.println(s);",
    ],
  };

  const languages = Object.keys(codeSnippets);
  
  const roastQuotes = [
    "My eyes are bleeding.",
    "Did you use Copilot blindly?",
    "This is a war crime against programming.",
    "Please step away from the keyboard.",
    "I would rather read assembly.",
    "LGTM! Just kidding, it's terrible.",
    "A moment of silence for the CPU cycles wasted here.",
    "Was this written by a random number generator?"
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

    const lang = faker.helpers.arrayElement(languages);
    const codeSnippet = faker.helpers.arrayElement(codeSnippets[lang]);
    const lines = codeSnippet.split('\n').length;

    await db.transaction(async (tx) => {
      const [insertedRoast] = await tx
        .insert(roasts)
        .values({
          code: codeSnippet,
          language: lang,
          lineCount: lines,
          roastMode: faker.datatype.boolean(),
          score: score,
          verdict: verdict,
          roastQuote: faker.helpers.arrayElement(roastQuotes),
          suggestedFix: "// Suggested improvement\n// Try writing better code next time.",
        })
        .returning();

      const itemsCount = faker.number.int({ min: 2, max: 4 });
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
