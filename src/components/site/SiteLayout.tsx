import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({
  children,
  solidNav = false,
}: {
  children: ReactNode;
  solidNav?: boolean;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-primary px-3 py-2 rounded z-[100]"
      >
        Skip to content
      </a>
      <Navbar forceSolid={solidNav} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
