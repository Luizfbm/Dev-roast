"use client";

import * as React from "react";
import { Collapsible } from "@base-ui/react";
import {
  TableRowRank,
  TableRowScore,
  TableRowLang,
} from "@/components/ui/table-row";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";

interface HomeLeaderboardRowProps {
  rank: number;
  row: { score: number; language: string };
  children: React.ReactNode; 
}

export function HomeLeaderboardRow({ rank, row, children }: HomeLeaderboardRowProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root 
      open={open} 
      onOpenChange={setOpen} 
      className="flex flex-col border-b border-border-primary last:border-b-0 group w-full"
    >
      <Collapsible.Trigger className="flex items-start w-full px-5 hover:bg-bg-elevated transition-colors bg-bg-surface focus:outline-none cursor-pointer">
        
        {/* Meta da Esquerda */}
        <div className="w-[50px] text-left pt-4">
          <TableRowRank>#{rank}</TableRowRank>
        </div>
        <div className="w-[70px] text-left pt-4">
          <TableRowScore>{row.score.toFixed(1)}</TableRowScore>
        </div>
        
        {/* Código formatado vindo do Servidor */}
        <div className="flex-1 flex flex-col text-left relative py-3 min-w-0">
            <div className={cn(
              "overflow-hidden transition-all duration-300 w-full", 
              open ? "max-h-[500px]" : "max-h-[54px]"
            )}>
              {children}
            </div>
            
            {/* Fade de escuridão quando contraido para indicar que tem mais código */}
            {!open && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-bg-surface to-transparent pointer-events-none group-hover:from-bg-elevated transition-colors" />
            )}
        </div>

        {/* Linguagem e Ícone expansor */}
        <div className="w-[100px] flex items-center justify-end gap-3 text-right pt-4">
          <TableRowLang>{row.language}</TableRowLang>
          {open ? (
            <ChevronUp className="w-4 h-4 text-text-tertiary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-tertiary" />
          )}
        </div>

      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}
