import { useEffect, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { useAdminData } from "@/lib/admin-store";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useAdminData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pt-[116px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
