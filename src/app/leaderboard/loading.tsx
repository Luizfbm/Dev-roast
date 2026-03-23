import { TableRow } from "@/components/ui/table-row";

export default function LeaderboardLoading() {
  return (
    <main className="min-h-screen bg-bg-page">
      <div className="max-w-[960px] mx-auto px-10 pt-20 pb-16 flex flex-col gap-8 items-center">
        {/* Header */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3">
            <span className="text-accent-green font-bold text-[36px] leading-none">
              $
            </span>
            <h1 className="text-[36px] font-bold leading-none text-text-primary">
              shame_leaderboard
            </h1>
          </div>
          <p className="text-text-secondary text-sm font-mono">
            // the worst code on the internet, ranked by shame
          </p>
        </div>

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
          {[...Array(20)].map((_, index) => (
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
      </div>
    </main>
  );
}
