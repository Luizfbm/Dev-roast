"use client";

import * as React from "react";
import { Collapsible } from "@base-ui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";

interface LeaderboardRowProps {
  rank: number;
  row: { id: string; score: number; language: string; lineCount: number };
  children: React.ReactNode;
}

export function LeaderboardRow({ rank, row, children }: LeaderboardRowProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="group flex flex-col border border-border-primary bg-bg-surface hover:border-accent-green/30 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-accent-green/5"
    >
      <Collapsible.Trigger className="flex items-center justify-between h-12 px-5 border-b border-border-primary bg-bg-surface/50 hover:bg-bg-elevated transition-colors cursor-pointer focus:outline-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 min-w-[40px]">
            <span className="text-text-tertiary font-mono text-xs opacity-50">
              #
            </span>
            <span
              className={cn(
                "font-mono text-sm font-bold",
                rank === 1 ? "text-accent-amber" : "text-text-primary"
              )}
            >
              {rank}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-tertiary font-mono text-[10px] uppercase tracking-wider">
              score:
            </span>
            <span
              className={cn(
                "font-mono text-sm font-bold",
                row.score <= 3 ? "text-accent-red" : "text-accent-amber"
              )}
            >
              {row.score.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-text-secondary font-mono text-[11px] lowercase">
              {row.language}
            </span>
            <span className="text-text-tertiary font-mono text-[11px] opacity-60">
              {row.lineCount} lines
            </span>
          </div>
          {open ? (
            <ChevronUp className="w-4 h-4 text-text-tertiary group-hover:text-accent-green transition-all" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-tertiary group-hover:text-accent-green transition-all" />
          )}
        </div>
      </Collapsible.Trigger>

      <div className={cn(
        "relative transition-all duration-300 w-full overflow-hidden min-h-0",
        open ? "max-h-[800px]" : "max-h-[140px]"
      )}>
        {children}
        {!open && (
           <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-bg-surface to-transparent pointer-events-none group-hover:from-bg-surface/80 transition-colors" />
        )}
      </div>
    </Collapsible.Root>
  );
}
