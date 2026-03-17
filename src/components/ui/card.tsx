import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const card = tv({
  base: "flex flex-col gap-3 border border-border-primary bg-bg-page p-5",
});

export interface CardProps
  extends ComponentProps<"div">,
    VariantProps<typeof card> {}

const Card = ({ className, ...props }: CardProps) => {
  return <div className={card({ className })} {...props} />;
};

export { Card, card };
