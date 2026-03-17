import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const tableRow = tv({
  base: "flex items-center gap-6 px-5 py-4 border-b border-border-primary hover:bg-secondary/20 transition-colors",
});

const cell = tv({
  base: "flex items-center font-mono text-[12px]",
  variants: {
    type: {
      rank: "w-10 text-text-tertiary",
      score: "w-[60px] text-accent-red font-bold text-[13px]",
      code: "flex-1 text-text-secondary truncate",
      lang: "w-[100px] text-text-tertiary justify-end",
    },
  },
});

export interface TableRowProps extends ComponentProps<"div"> {
  rank?: string;
  score?: string;
  code?: string;
  lang?: string;
}

export const TableRow = ({
  className,
  rank,
  score,
  code,
  lang,
  ...props
}: TableRowProps) => {
  return (
    <div className={tableRow({ className })} {...props}>
      {rank && <div className={cell({ type: "rank" })}>{rank}</div>}
      {score && <div className={cell({ type: "score" })}>{score}</div>}
      {code && (
        <div className={cell({ type: "code" })}>
          <span className="truncate">{code}</span>
        </div>
      )}
      {lang && <div className={cell({ type: "lang" })}>{lang}</div>}
    </div>
  );
};
