import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none",
    "font-mono transition-colors focus-visible:outline-none",
    "focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary:
        "bg-accent-green text-[#0A0A0A] font-medium enabled:hover:bg-accent-green/90",
      secondary:
        "border border-border-primary bg-transparent text-text-primary enabled:hover:bg-secondary",
      destructive: "bg-accent-red text-white enabled:hover:bg-accent-red/90",
      outline: "border border-border bg-transparent enabled:hover:bg-secondary",
      ghost:
        "enabled:hover:bg-secondary enabled:hover:text-secondary-foreground",
      link: "border border-border-primary bg-transparent text-text-secondary enabled:hover:text-text-primary",
    },
    size: {
      default: "py-[10px] px-[24px] text-[13px]",
      sm: "py-[8px] px-[16px] text-[12px]",
      xs: "py-[6px] px-[12px] text-[12px]",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof button> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={button({ variant, size, className })} {...props} />;
};

export { Button, button };
