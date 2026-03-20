import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const tableRowStyles = tv({
  base: "flex items-center gap-6 px-5 py-4 border-b border-border-primary enabled:hover:bg-secondary/20 transition-colors",
});

const rankStyles = tv({
  base: "w-10 font-mono text-[12px] text-text-tertiary shrink-0",
});

const scoreStyles = tv({
  base: "w-[60px] font-mono text-accent-red font-bold text-[13px] shrink-0",
});

const codeStyles = tv({
  base: "flex-1 font-mono text-[12px] text-text-secondary truncate min-w-0",
});

const langStyles = tv({
  base: "w-[100px] font-mono text-[12px] text-text-tertiary text-right shrink-0",
});

export const TableRow = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={tableRowStyles({ className })} {...props} />
);

export const TableRowRank = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span className={rankStyles({ className })} {...props} />
);

export const TableRowScore = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span className={scoreStyles({ className })} {...props} />
);

export const TableRowCode = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span className={codeStyles({ className })} {...props} />
);

export const TableRowLang = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span className={langStyles({ className })} {...props} />
);
