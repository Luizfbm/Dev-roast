"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface EditorFooterProps {
  roastMode: boolean;
  onRoastModeChange: (checked: boolean) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function EditorFooter({
  roastMode,
  onRoastModeChange,
  onSubmit,
  isSubmitting = false,
}: EditorFooterProps) {
  return (
    <div className="flex items-center justify-between w-full mt-4">
      <div className="flex items-center gap-4">
        <Toggle
          label="roast mode"
          checked={roastMode}
          onCheckedChange={onRoastModeChange}
          disabled={isSubmitting}
        />
        <span className="text-text-tertiary text-[11px] font-mono italic">
          {isSubmitting ? "// deploying salt..." : "// maximum sarcasm enabled"}
        </span>
      </div>

      <Button
        variant="primary"
        onClick={onSubmit}
        size="default"
        disabled={isSubmitting}
      >
        {isSubmitting ? "roasting..." : "$ roast_my_code"}
      </Button>
    </div>
  );
}
