import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table-row";

export function HomeLeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-accent-green font-bold text-sm">//</span>
          <h2 className="text-sm font-bold text-text-primary">
            shame_leaderboard
          </h2>
        </div>
        <Button variant="link" size="xs" disabled>
          $ view_all &gt;&gt;
        </Button>
      </div>

      <p className="text-text-tertiary text-[13px] font-mono -mt-2">
        // the worst code on the internet, ranked by shame
      </p>

      {/* Table */}
      <div className="border border-border-primary w-full">
        {/* Table Header */}
        <div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border-primary">
          <span className="w-[50px] text-text-tertiary text-xs font-mono">
            rank
          </span>
          <span className="w-[70px] text-text-tertiary text-xs font-mono">
            score
          </span>
          <span className="flex-1 text-text-tertiary text-xs font-mono">
            code
          </span>
          <span className="w-[100px] text-text-tertiary text-xs font-mono text-right">
            lang
          </span>
        </div>

        {/* Rows */}
        {[1, 2, 3].map((index) => (
          <TableRow key={index} className="animate-pulse">
            <div className="flex w-full items-center h-[52px]">
              <div className="w-[30px] h-4 bg-bg-page border border-border-primary rounded-sm" />
              <div className="w-[40px] h-4 bg-bg-page border border-border-primary rounded-sm ml-5" />
              <div className="flex-1 h-4 bg-bg-page border border-border-primary rounded-sm ml-[30px]" />
              <div className="w-[60px] h-4 bg-bg-page border border-border-primary rounded-sm ml-auto" />
            </div>
          </TableRow>
        ))}
      </div>

      <div className="flex justify-center">
        <p className="text-text-tertiary text-[12px] font-mono">
          <span className="w-64 h-3 bg-bg-surface border border-border-primary inline-block rounded-sm animate-pulse" />
        </p>
      </div>
    </div>
  );
}
