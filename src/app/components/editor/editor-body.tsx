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
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll
  const handleScroll = () => {
    if (textareaRef.current && preRef.current && lineNumbersRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      const newValue = code.substring(0, start) + "  " + code.substring(end);
      onChange(newValue);

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
    <div className="flex flex-1 max-h-[512px] min-h-[320px] overflow-hidden relative">
      {/* Line numbers (Scrollable but hidden scrollbar) */}
      <div
        ref={lineNumbersRef}
        className="flex flex-col items-end gap-0 px-3 py-4 border-r border-border-primary bg-secondary/10 select-none min-w-[48px] z-10 overflow-hidden"
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <span
            key={i}
            className="text-text-tertiary text-[12px] leading-5 font-mono h-5 shrink-0"
          >
            {i + 1}
          </span>
        ))}
      </div>

      {/* Editor Layers */}
      <div className="flex-1 relative overflow-hidden bg-bg-input">
        {/* Layer 1: Highlighted Code */}
        <div
          ref={preRef}
          className="absolute inset-0 p-4 font-mono text-[12px] leading-5 pointer-events-none overflow-hidden whitespace-pre text-text-primary scroll-smooth"
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
          className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-[12px] leading-5 resize-none outline-none z-20 overflow-auto whitespace-pre custom-scrollbar"
          placeholder="// paste your code here..."
        />
      </div>
    </div>
  );
}
