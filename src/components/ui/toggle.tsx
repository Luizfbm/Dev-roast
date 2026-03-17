"use client";

import { Switch } from "@base-ui/react/switch";
import * as React from "react";
import { type VariantProps, tv } from "tailwind-variants";

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
  extends React.ComponentPropsWithoutRef<typeof Switch.Root>,
    VariantProps<typeof toggle> {
  label?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, label, ...props }, ref) => {
    const { root, track, thumb, label: labelStyle } = toggle();

    return (
      <div className={root({ className })}>
        <Switch.Root ref={ref} className={track()} {...props}>
          <Switch.Thumb className={thumb()} />
        </Switch.Root>
        {label && <span className={labelStyle()}>{label}</span>}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle };
