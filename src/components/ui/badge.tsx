import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center gap-2 font-mono font-normal transition-colors",
  variants: {
    variant: {
      default: "text-text-primary",
      destructive: "text-accent-red",
      warning: "text-accent-amber",
      success: "text-accent-green",
    },
    size: {
      default: "text-xs",
      lg: "text-[13px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const badgeDot = tv({
  base: "h-2 w-2 rounded-full shrink-0",
  variants: {
    variant: {
      default: "bg-text-tertiary",
      destructive: "bg-accent-red",
      warning: "bg-accent-amber",
      success: "bg-accent-green",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badge> {
  hideDot?: boolean;
}

const Badge = ({
  className,
  variant,
  hideDot = false,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span className={badge({ variant, className })} {...props}>
      {!hideDot && (
        <span className={badgeDot({ variant })} aria-hidden="true" />
      )}
      {children}
    </span>
  );
};

export { Badge, badge };
