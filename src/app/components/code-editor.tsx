"use client";

import { useState } from "react";
import { EditorBody } from "./editor/editor-body";
import { EditorFooter } from "./editor/editor-footer";
import { EditorHeader } from "./editor/editor-header";
import { useLanguageDetection } from "./editor/use-language-detection";
import { useShikiHighlight } from "./editor/use-shiki-highlight";

import { submitRoastAction } from "@/app/actions/roast";
import { useRouter } from "next/navigation";

const BAD_CODE_PLACEHOLDER = `// calculating the total price
var total = 0;
for (var i = 0; i < items.length; i++) {
  var item = items[i];
  total = total + item.price * 1;
}
console.log("total is: " + total);`;

interface CodeEditorProps {
  onSubmit?: (code: string, lang: string, roastMode: boolean) => void;
}

export function CodeEditor({ onSubmit }: CodeEditorProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [manualLang, setManualLang] = useState("auto");
  const [roastMode, setRoastMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const detectedLang = useLanguageDetection(code, manualLang);

  // Use placeholder code for highlighting if editor is empty
  const codeToHighlight = code || BAD_CODE_PLACEHOLDER;
  const activeLang = manualLang === "auto" ? detectedLang : manualLang;

  const { html: highlightedHtml } = useShikiHighlight(
    codeToHighlight,
    activeLang,
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const finalCode = code || BAD_CODE_PLACEHOLDER;

    // Call server action
    const result = await submitRoastAction(finalCode, activeLang, roastMode);

    if (result.success && result.id) {
      router.push(`/roasts/${result.id}`);
    } else {
      setIsSubmitting(false);
      alert(result.error || "Something went wrong roasting your code.");
    }

    onSubmit?.(finalCode, activeLang, roastMode);
  };

  return (
    <div className="w-full max-w-[780px] flex flex-col gap-0 border border-border-primary bg-bg-input overflow-hidden shadow-2xl rounded-none">
      <EditorHeader
        detectedLang={detectedLang}
        manualLang={manualLang}
        onManualLangChange={setManualLang}
      />

      <EditorBody
        code={code}
        onChange={setCode}
        highlightedHtml={highlightedHtml}
      />

      <div className="p-4 border-t border-border-primary bg-bg-surface/30">
        <EditorFooter
          roastMode={roastMode}
          onRoastModeChange={setRoastMode}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
