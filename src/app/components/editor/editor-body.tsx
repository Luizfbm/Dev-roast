"use client";

import { useEffect, useRef } from "react";

interface EditorBodyProps {
  code: string;
  onChange: (code: string) => void;
  highlightedHtml: string;
}

export function EditorBody({
  code,
  onChange,
  highlightedHtml,
}: EditorBodyProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLDivElement>(null);

  // Sync scroll
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Handle Tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // Insert 2 spaces
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      onChange(newValue);

      // Set cursor position after update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const lineCount = Math.max(code.split("\n").length, 16);

  return (
    <div className="flex flex-1 overflow-hidden relative min-h-[320px]">
      {/* Line numbers */}
      <div className="flex flex-col items-end gap-0 px-3 py-4 border-r border-border-primary bg-secondary/10 select-none min-w-[48px] z-10">
        {Array.from({ length: lineCount }).map((_, i) => (
          <span
            key={i}
            className="text-text-tertiary text-[12px] leading-5 font-mono h-5"
          >
            {i + 1}
          </span>
        ))}
      </div>

      {/* Editor Layers */}
      <div className="flex-1 relative overflow-hidden bg-bg-input">
        {/* Layer 1: Highlighted Code (via Shiki) */}
        <div
          ref={preRef}
          className="absolute inset-0 p-4 font-mono text-[12px] leading-5 pointer-events-none overflow-hidden whitespace-pre text-text-primary"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          aria-hidden="true"
        />

        {/* Layer 2: Transparent Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-[12px] leading-5 resize-none outline-none z-20 overflow-auto whitespace-pre"
          placeholder="// paste your code here..."
        />
      </div>
    </div>
  );
}
