"use client";

import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

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

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 relative group">
          {manualLang === "auto" && (
            <span className="text-text-tertiary text-[10px] font-mono italic">
              detected:
            </span>
          )}
          <div className="relative flex items-center">
            <select
              value={manualLang}
              onChange={(e) => onManualLangChange(e.target.value)}
              className="bg-transparent text-text-secondary text-[11px] font-mono outline-none cursor-pointer hover:text-text-primary transition-colors appearance-none pr-4 py-1 z-10"
            >
              {LANGUAGES.map((l) => (
                <option
                  key={l}
                  value={l}
                  className="bg-bg-page text-text-primary py-2"
                >
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-text-tertiary absolute right-0 pointer-events-none group-hover:text-text-secondary transition-colors" />
          </div>
        </div>

        <Badge
          variant={manualLang === "auto" ? "success" : "warning"}
          className="h-5 py-0 px-2 text-[10px] min-w-[60px] justify-center"
        >
          {manualLang === "auto" ? detectedLang : manualLang}
        </Badge>
      </div>
    </div>
  );
}
