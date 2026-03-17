import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const navbar = tv({
  base: "flex h-14 w-full items-center justify-between border-b border-border-primary bg-bg-page px-6",
});

export interface NavbarProps
  extends ComponentProps<"nav">,
    VariantProps<typeof navbar> {}

const Navbar = ({ className, ...props }: NavbarProps) => {
  return <nav className={navbar({ className })} {...props} />;
};

const NavLogo = ({ children, className, ...props }: ComponentProps<"div">) => (
  <div className={`flex items-center gap-2 ${className ?? ""}`} {...props}>
    {children}
  </div>
);

const NavLink = ({ children, className, ...props }: ComponentProps<"span">) => (
  <span
    className={`font-mono text-[13px] text-text-secondary transition-colors hover:text-text-primary cursor-pointer ${
      className ?? ""
    }`}
    {...props}
  >
    {children}
  </span>
);

export { Navbar, NavLink, NavLogo, navbar };
