import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar, NavLink, NavLogo } from "@/components/ui/navbar";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "devroast — paste your code. get roasted.",
  description:
    "Drop your code and get a brutally honest review, powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-bg-page text-text-primary`}
      >
        <Navbar>
          <NavLogo>
            <span className="text-accent-green font-bold text-xl">&gt;</span>
            <span className="font-medium text-[18px] text-text-primary">
              devroast
            </span>
          </NavLogo>
          <div className="flex items-center gap-8">
            <Link href="/leaderboard">
              <NavLink>leaderboard</NavLink>
            </Link>
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </div>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
