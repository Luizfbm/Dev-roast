"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface EditorFooterProps {
  roastMode: boolean;
  onRoastModeChange: (checked: boolean) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  charCount: number;
  maxChars: number;
  isDisabled?: boolean;
}

export function EditorFooter({
  roastMode,
  onRoastModeChange,
  onSubmit,
  isSubmitting = false,
  charCount,
  maxChars,
  isDisabled = false,
}: EditorFooterProps) {
  const isOverLimit = charCount > maxChars;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Toggle
            label="roast mode"
            checked={roastMode}
            onCheckedChange={onRoastModeChange}
            disabled={isSubmitting}
          />
          <span className="text-text-tertiary text-[11px] font-mono italic">
            {isSubmitting
              ? "// deploying salt..."
              : isOverLimit
                ? "// excessive toxicity detected"
                : "// maximum sarcasm enabled"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span
              className={`text-[10px] font-mono leading-none ${isOverLimit ? "text-accent-red" : "text-text-tertiary"}`}
            >
              {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
            <span className="text-[9px] text-text-muted font-mono uppercase tracking-widest mt-1">
              characters
            </span>
          </div>

          <Button
            variant="primary"
            onClick={onSubmit}
            size="default"
            disabled={isDisabled}
          >
            {isSubmitting ? "roasting..." : "$ roast_my_code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
