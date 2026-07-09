"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/", icon: House },
  { label: "Applications", href: "/applications", icon: LayoutGrid },
];

interface DashboardShellProps {
  children?: React.ReactNode;
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 18h8M6 10a6 6 0 1 1 12 0v4l1.5 2H4.5L6 14z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

function Sidebar({ collapsed, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-full border-r border-[#43204a] bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-[84px]" : "w-72",
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-[#43204a] px-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 font-mono text-xs">SD</div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold tracking-wide">SAST Dashboard</p>
            <p className="text-xs text-sidebar-muted">DevOps Security Reports</p>
          </div>
        )}
      </div>
      <nav className="space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link key={item.label} href={item.href} onClick={onNavigate} className="block">
              <span
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-sidebar-muted hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="mr-3 h-4 w-4 shrink-0" aria-hidden="true" />
                {!collapsed && item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(84,7,91,0.17),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(84,7,91,0.1),transparent_40%)]" />

      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar collapsed={desktopCollapsed} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/45"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
            <div className="relative h-full w-72">
              <Sidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <MenuIcon />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={() => setDesktopCollapsed((value) => !value)}
                  aria-label="Toggle sidebar"
                >
                  <MenuIcon />
                </Button>
                <h1 className="text-base font-semibold md:text-lg">SAST Dashboard</h1>
              </div>

              {/* <div className="hidden max-w-md flex-1 items-center rounded-lg border border-border bg-card px-3 md:flex">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search application, CVE, owner..."
                  className="h-9 w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div> */}

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" aria-label="Notifications">
                  <BellIcon />
                </Button>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  SA
                </div>
              </div>
            </div>
          </header>

          <section className="flex-1 p-4 md:p-6">
            {children ? (
              children
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Critical CVEs", "03", "+1 since yesterday"],
                  ["High CVEs", "18", "-2 after triage"],
                  ["Applications", "24", "2 onboarded this week"],
                  ["Last Import", "11:30", "GitLab SAST import OK"],
                ].map(([label, value, sub]) => (
                  <Card key={label}>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-semibold tracking-tight">{value}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <footer className="border-t border-border/70 px-4 py-1 text-center text-xs text-muted-foreground md:px-6">
            Dhanlaxmi Bank
          </footer>
        </main>
      </div>
    </div>
  );
}
