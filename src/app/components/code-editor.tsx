"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { EditorBody } from "./editor/editor-body";
import { EditorFooter } from "./editor/editor-footer";
import { EditorHeader } from "./editor/editor-header";
import { useLanguageDetection } from "./editor/use-language-detection";
import { useShikiHighlight } from "./editor/use-shiki-highlight";

const BAD_CODE_PLACEHOLDER = `// calculating the total price
var total = 0;
for (var i = 0; i < items.length; i++) {
  var item = items[i];
  total = total + item.price * 1;
}
console.log("total is: " + total);`;

const MAX_CHARS = 5000;

interface CodeEditorProps {
  onSubmit?: (code: string, lang: string, roastMode: boolean) => void;
}

export function CodeEditor({ onSubmit }: CodeEditorProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const [code, setCode] = useState("");
  const [manualLang, setManualLang] = useState("auto");
  const [roastMode, setRoastMode] = useState(true);

  const createRoast = useMutation(trpc.roast.create.mutationOptions({
    onSuccess: (data: { id: string }) => {
      router.push(`/roasts/${data.id}`);
      onSubmit?.(code || BAD_CODE_PLACEHOLDER, activeLang, roastMode);
    },
    onError: (error: any) => {
      alert(error.message || "Something went wrong roasting your code.");
    },
  }));

  const detectedLang = useLanguageDetection(code, manualLang);

  // Use placeholder code for highlighting if editor is empty
  const codeToHighlight = code || BAD_CODE_PLACEHOLDER;
  const activeLang = manualLang === "auto" ? detectedLang : manualLang;

  const { html: highlightedHtml } = useShikiHighlight(
    codeToHighlight,
    activeLang,
  );

  const handleSubmit = async () => {
    const finalCode = code || BAD_CODE_PLACEHOLDER;
    createRoast.mutate({
      code: finalCode,
      language: activeLang,
      roastMode,
    });
  };

  const isOverLimit = code.length > MAX_CHARS;

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
          isSubmitting={createRoast.isPending}
          charCount={code.length}
          maxChars={MAX_CHARS}
          isDisabled={isOverLimit || createRoast.isPending}
        />
      </div>
    </div>
  );
}
