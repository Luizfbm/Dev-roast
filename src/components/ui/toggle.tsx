"use client";

import { Switch } from "@base-ui/react/switch";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const toggle = tv({
  slots: {
    root: "group inline-flex items-center gap-3 cursor-pointer select-none",
    track: [
      "flex h-[22px] w-10 shrink-0 items-center rounded-full p-[3px] transition-colors",
      "bg-border-primary group-data-[state=checked]:bg-accent-green",
    ],
    thumb: [
      "h-4 w-4 rounded-full bg-muted-foreground transition-transform",
      "group-data-[state=checked]:translate-x-[18px] group-data-[state=checked]:bg-[#0A0A0A]",
    ],
    label: [
      "font-mono text-xs transition-colors",
      "text-text-secondary group-data-[state=checked]:text-accent-green",
    ],
  },
});

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Switch.Root>, "className">,
    VariantProps<typeof toggle> {
  label?: string;
  className?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, label, id, ...props }, ref) => {
    const fallbackId = React.useId();
    const safeId = id ?? fallbackId;
    const { root, track, thumb, label: labelStyle } = toggle();

    return (
      <Switch.Root
        id={safeId}
        ref={ref}
        className={root({ className })}
        {...props}
      >
        <div className={track()}>
          <Switch.Thumb className={thumb()} />
        </div>
        {label && <span className={labelStyle()}>{label}</span>}
      </Switch.Root>
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle };
