"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  onSubmit?: (code: string, roastMode: boolean) => void;
}

export function CodeEditor({ onSubmit }: CodeEditorProps) {
  const [code, setCode] = React.useState("");
  const [roastMode, setRoastMode] = React.useState(true);
  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 16);

  const handleSubmit = () => {
    if (code.trim()) {
      onSubmit?.(code, roastMode);
    }
  };

  return (
    <div className="w-[780px] flex flex-col gap-4">
      {/* Code Editor Box */}
      <div
        className="border border-border-primary bg-bg-input overflow-hidden"
        style={{ height: 360 }}
      >
        {/* Window dots header */}
        <div className="flex items-center h-10 px-4 border-b border-border-primary">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-red" />
            <div className="w-3 h-3 rounded-full bg-accent-amber" />
            <div className="w-3 h-3 rounded-full bg-accent-green" />
          </div>
        </div>

        {/* Editor body */}
        <div className="flex h-[320px]">
          {/* Line numbers */}
          <div className="flex flex-col items-end gap-2 px-3 py-4 border-r border-border-primary bg-secondary/30 select-none min-w-[48px]">
            {Array.from({ length: lineCount }).map((_, i) => (
              <span key={i} className="text-text-tertiary text-[12px] leading-5">
                {i + 1}
              </span>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            className="flex-1 bg-transparent text-text-primary text-[12px] leading-5 p-4 resize-none outline-none font-mono placeholder:text-text-tertiary/60"
            placeholder="// paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Toggle
            label="roast mode"
            checked={roastMode}
            onCheckedChange={setRoastMode}
          />
          <span className="text-text-tertiary text-[12px] font-mono">
            // maximum sarcasm enabled
          </span>
        </div>

        <Button variant="primary" onClick={handleSubmit}>
          $ roast_my_code
        </Button>
      </div>
    </div>
  );
}
