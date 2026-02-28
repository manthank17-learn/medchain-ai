import Link from "next/link";
import Image from "next/image";
import AIchat from "@/components/AIchat";

const navItems = [
  { label: "Overview", href: "/dashboard", active: true },
  { label: "Records", href: "#", active: false },
  { label: "Access", href: "#", active: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="flex w-[240px] shrink-0 flex-col border-r border-[#2f4ee0] bg-[#3659f8] px-3 py-4">
          <Link
            href="/dashboard"
            className="mb-4 flex items-center gap-2 rounded-[var(--radius-md)] border border-white/40 bg-white px-3 py-3 transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#eff6ff]"
          >
            <Image src="/logo.png" alt="Logo" width={140} height={42} className="h-7 w-auto object-contain" />
            <span className="text-[var(--text-lg)] font-semibold text-[#0f172a]">Medichain AI</span>
          </Link>
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center rounded-[8px] px-3 py-2 text-[var(--text-sm)]",
                  item.active
                    ? "bg-[#eff6ff] font-semibold text-[#1e3a8a]"
                    : "text-white/90 hover:bg-[#2f4ee0]",
                ].join(" ")}
              >
                <span className="mr-[10px] inline-block h-[18px] w-[18px] rounded-full border border-white/70" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-3">
            <button
              type="button"
              className="w-full rounded-[var(--radius-md)] border border-white/50 bg-[#2f4ee0] px-3 py-2 text-left text-[15px] font-bold text-white hover:bg-[#2944c5]"
            >
              ⚙ Settings
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[60px] items-center justify-between border-b border-border bg-[var(--color-surface)] px-6">
            <p className="text-[var(--text-base)] font-semibold">Dashboard</p>
            <div className="flex items-center gap-3 text-[var(--text-sm)] text-muted-foreground">
              <span>rayuser@medchain.ai</span>
            </div>
          </header>
          <main className="flex-1 bg-background px-6 py-6">{children}</main>
        </div>
      </div>
      <AIchat userName="Rayuser" />
    </div>
  );
}
