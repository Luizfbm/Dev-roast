import hljs from "highlight.js";
import { useMemo } from "react";

const SUBSET = [
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
];

export function useLanguageDetection(code: string, manualLang?: string) {
  const detectedLang = useMemo(() => {
    // If user selected a specific language, use it.
    if (manualLang && manualLang !== "auto") {
      return manualLang;
    }

    // Don't detect on very short strings to avoid flickering or wrong detection
    if (code.trim().length < 4) {
      return "javascript";
    }

    try {
      const result = hljs.highlightAuto(code, SUBSET);
      return result.language || "javascript";
    } catch (e) {
      return "javascript";
    }
  }, [code, manualLang]);

  return detectedLang;
}
