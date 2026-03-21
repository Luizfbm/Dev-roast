"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import NumberFlow from "@number-flow/react";

export function HomeStats() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.roast.getStats.queryOptions());

  const totalRoasts = data?.totalRoasts ?? 0;
  const avgScore = data?.avgScore ?? 0;

  return (
    <div className="flex items-center gap-6 text-text-tertiary text-[12px] font-mono">
      <span className="flex items-center gap-1">
        <NumberFlow value={totalRoasts} /> codes roasted
      </span>
      <span>·</span>
      <span className="flex items-center gap-1">
        avg score:{" "}
        <NumberFlow
          value={avgScore}
          format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
        />
        /10
      </span>
    </div>
  );
}
