import Link from "next/link";

import AIchatPageView from "./AIchat";

export default function AIChatPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#2f4ee0] bg-[#3659f8] p-3">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="block rounded-[var(--radius-md)] px-3 py-2 text-[18px] font-bold text-white hover:bg-[#2f4ee0]"
            >
              ← Back
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-[var(--radius-md)] px-3 py-2 text-[16px] font-semibold text-white hover:bg-[#2f4ee0]"
            >
              Dashboard
            </Link>
          </div>

          <div className="mt-5">
            <p className="px-3 pb-2 text-[13px] font-bold uppercase tracking-wide text-white/90">
              History
            </p>
            <div className="space-y-1">
              {[
                "Patient triage summary",
                "Access permissions query",
                "Medication follow-up",
                "Lab report explanation",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="w-full truncate rounded-[var(--radius-sm)] px-3 py-2 text-left text-[15px] font-semibold text-white hover:bg-[#2f4ee0]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button
              type="button"
              className="w-full rounded-[var(--radius-md)] border border-white/50 bg-[#2f4ee0] px-3 py-2 text-left text-[15px] font-bold text-white hover:bg-[#2944c5]"
            >
              ⚙ Settings
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="pb-3">
            <h1 className="text-[var(--text-2xl)] font-semibold text-foreground">AI Chat</h1>
          </div>
          <div className="min-h-0 flex-1">
            <AIchatPageView />
          </div>
        </div>
      </div>
    </main>
  );
}
