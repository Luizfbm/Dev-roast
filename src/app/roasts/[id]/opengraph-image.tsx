import { ImageResponse } from "@takumi-rs/image-response";
import { caller } from "@/trpc/server";

export const alt = "DevRoast - AI Code Analysis Result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    const roastData = await caller.roast.getById({ id });

    if (!roastData) {
      return new Response("Not Found", { status: 404 });
    }

    // Color mapping based on score
    // Matches screenshot: 3.5 -> needs_serious_help -> Red marker, Amber score
    const getScoreColor = (score: number) => {
      if (score <= 3.5) return "#FBBF24"; // Amber-400
      if (score <= 6) return "#EAB308"; // Yellow-500
      if (score <= 8) return "#22C55E"; // Green-500
      return "#10B981"; // Emerald-500
    };

    const getVerdictColor = (verdict: string) => {
      switch (verdict) {
        case "needs_serious_help":
          return "#EF4444"; // Red-500
        case "rough_around_edges":
          return "#F59E0B"; // Amber-500
        case "decent_code":
          return "#EAB308"; // Yellow-500
        case "solid_work":
          return "#22C55E"; // Green-500
        case "exceptional":
          return "#10B981"; // Emerald-500
        default:
          return "#A1A1AA"; // Zinc-400
      }
    };

    const scoreColor = getScoreColor(roastData.score);
    const verdictColor = getVerdictColor(roastData.verdict);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            fontFamily: "Geist Mono",
            padding: "80px",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#22C55E", fontSize: "20px" }}>&gt; devroast</span>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "24px",
            }}
          >
            {/* Score Display */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "160px",
                  fontWeight: 800,
                  color: scoreColor,
                  lineHeight: 1,
                }}
              >
                {roastData.score.toFixed(1)}
              </span>
              <span
                style={{
                  fontSize: "48px",
                  color: "#71717A",
                  fontWeight: 500,
                }}
              >
                /10
              </span>
            </div>

            {/* Verdict Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: verdictColor,
                }}
              />
              <span
                style={{
                  color: verdictColor,
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {roastData.verdict.replace(/_/g, " ")}
              </span>
            </div>

            {/* Lang Metadata */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#71717A",
                fontSize: "16px",
                marginTop: "4px",
              }}
            >
              <span>lang: {roastData.language}</span>
              <span>·</span>
              <span>{roastData.lineCount} lines</span>
            </div>
          </div>

          {/* Quote Section */}
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              maxWidth: "800px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "24px",
                fontStyle: "italic",
                lineHeight: 1.4,
              }}
            >
              &ldquo;{roastData.roastQuote}&rdquo;
            </span>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
