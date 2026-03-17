import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none",
    "font-mono text-[13px] font-medium transition-colors focus-visible:outline-none",
    "focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary:
        "bg-accent-green text-[#0A0A0A] hover:bg-accent-green/90 shadow-sm",
      secondary: "bg-accent-amber text-[#111111] hover:bg-accent-amber/90",
      destructive: "bg-accent-red text-white hover:bg-accent-red/90",
      outline:
        "border border-border bg-background hover:bg-secondary hover:text-secondary-foreground",
      ghost: "hover:bg-secondary hover:text-secondary-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      roast: "bg-accent-green text-[#0A0A0A] hover:bg-accent-green/90",
    },
    size: {
      default: "h-10 px-6 py-2.5",
      sm: "h-8 px-4 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "roast",
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
