import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const card = tv({
  base: "flex flex-col gap-4 border border-border-primary bg-bg-page/50 p-5 transition-shadow hover:shadow-sm",
});

export interface CardProps
  extends ComponentProps<"div">,
    VariantProps<typeof card> {}

const Card = ({ className, ...props }: CardProps) => {
  return <div className={card({ className })} {...props} />;
};

export { Card, card };
