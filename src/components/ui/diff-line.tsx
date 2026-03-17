import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const diffLine = tv({
  base: "flex gap-4 font-mono text-[13px] py-2 px-4 whitespace-pre",
  variants: {
    variant: {
      added: "bg-[#0A1A0F]",
      removed: "bg-[#1A0A0A]",
      context: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

const diffPrefix = tv({
  base: "w-4 shrink-0 select-none",
  variants: {
    variant: {
      added: "text-accent-green",
      removed: "text-accent-red",
      context: "text-text-tertiary",
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

const diffCode = tv({
  variants: {
    variant: {
      added: "text-text-primary",
      removed: "text-text-secondary line-through opacity-50",
      context: "text-text-secondary",
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

export interface DiffLineProps
  extends ComponentProps<"div">,
    VariantProps<typeof diffLine> {
  code: string;
}

export const DiffLine = ({
  className,
  variant,
  code,
  ...props
}: DiffLineProps) => {
  const prefix = variant === "added" ? "+" : variant === "removed" ? "-" : " ";

  return (
    <div className={diffLine({ variant, className })} {...props}>
      <span className={diffPrefix({ variant })}>{prefix}</span>
      <span className={diffCode({ variant })}>{code}</span>
    </div>
  );
};
