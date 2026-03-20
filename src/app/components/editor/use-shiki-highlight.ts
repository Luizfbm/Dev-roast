import { useEffect, useState } from "react";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import bash from "shiki/langs/bash.mjs";
import c from "shiki/langs/c.mjs";
import cpp from "shiki/langs/cpp.mjs";
import css from "shiki/langs/css.mjs";
import go from "shiki/langs/go.mjs";
import html from "shiki/langs/html.mjs";
import javaLang from "shiki/langs/java.mjs";
// Standard languages to load
import js from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import php from "shiki/langs/php.mjs";
import py from "shiki/langs/python.mjs";
import ruby from "shiki/langs/ruby.mjs";
import rust from "shiki/langs/rust.mjs";
import sql from "shiki/langs/sql.mjs";
import ts from "shiki/langs/typescript.mjs";

// Theme
import vesper from "shiki/themes/vesper.mjs";

let highlighterPromise: Promise<HighlighterCore> | null = null;

async function getHighlighter() {
  if (highlighterPromise) return highlighterPromise;

  highlighterPromise = createHighlighterCore({
    themes: [vesper],
    langs: [
      js,
      ts,
      py,
      go,
      rust,
      ruby,
      javaLang,
      c,
      cpp,
      php,
      sql,
      html,
      css,
      json,
      bash,
    ],
    engine: createOnigurumaEngine(() => import("shiki/wasm")),
  });

  return highlighterPromise;
}

export function useShikiHighlight(code: string, lang: string) {
  const [html, setHtml] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function highlight() {
      const highlighter = await getHighlighter();
      if (!isMounted) return;

      try {
        const highlighted = highlighter.codeToHtml(code, {
          lang,
          theme: "vesper",
        });
        if (isMounted) {
          setHtml(highlighted);
          setIsReady(true);
        }
      } catch (err) {
        console.error("Shiki highlight error:", err);
      }
    }

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, lang]);

  return { html, isReady };
}
