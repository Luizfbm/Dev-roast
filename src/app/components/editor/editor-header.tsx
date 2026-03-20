"use client";

import { Badge } from "@/components/ui/badge";

const LANGUAGES = [
  "auto",
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

interface EditorHeaderProps {
  detectedLang: string;
  manualLang: string;
  onManualLangChange: (lang: string) => void;
}

export function EditorHeader({
  detectedLang,
  manualLang,
  onManualLangChange,
}: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between h-10 px-4 border-b border-border-primary bg-bg-surface/50">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-accent-red" />
        <div className="w-3 h-3 rounded-full bg-accent-amber" />
        <div className="w-3 h-3 rounded-full bg-accent-green" />
      </div>

      <div className="flex items-center gap-3">
        {manualLang === "auto" && (
          <span className="text-text-tertiary text-[10px] font-mono italic">
            detected:
          </span>
        )}
        <select
          value={manualLang}
          onChange={(e) => onManualLangChange(e.target.value)}
          className="bg-transparent text-text-secondary text-[11px] font-mono outline-none cursor-pointer hover:text-accent-green transition-colors appearance-none"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l} className="bg-bg-page text-text-primary">
              {l.toUpperCase()}
            </option>
          ))}
        </select>
        <Badge
          variant={manualLang === "auto" ? "success" : "warning"}
          className="h-5 py-0 px-2 text-[10px]"
        >
          {manualLang === "auto" ? detectedLang : manualLang}
        </Badge>
      </div>
    </div>
  );
}
