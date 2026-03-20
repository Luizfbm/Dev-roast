import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const cardRootStyles = tv({
  base: "flex flex-col gap-3 border border-border-primary bg-bg-page p-5",
});

const cardHeaderStyles = tv({
  base: "flex items-center gap-2",
});

const cardTitleStyles = tv({
  base: "text-[13px] font-normal font-mono text-text-primary",
});

const cardDescriptionStyles = tv({
  base: "text-[12px] text-text-secondary leading-[1.5] font-mono",
});

export const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cardRootStyles({ className })} {...props} />
);

export const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cardHeaderStyles({ className })} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"p">) => (
  <p className={cardTitleStyles({ className })} {...props} />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cardDescriptionStyles({ className })} {...props} />
);
