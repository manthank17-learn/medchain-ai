"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type ActionState = "idle" | "login" | "signup" | "guest";

export default function LoginPage() {
  const router = useRouter();
  const [actionState, setActionState] = useState<ActionState>("idle");

  const handleLogin = () => {
    setActionState("login");
    router.push("/dashboard");
  };

  const handleSignup = () => {
    setActionState("signup");
    router.push("/signup");
  };

  const handleGuestMode = () => {
    setActionState("guest");
    const guestId = `guest-${Math.random().toString(36).substring(2, 10)}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("guestId", guestId);
      sessionStorage.setItem("isGuest", "true");
    }
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface-2)]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_480px]">
        <section className="hidden min-h-screen bg-[var(--color-surface-2)] p-6 lg:block">
          <div className="group relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-[var(--color-surface)] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(15,23,42,0.08)]">
            <Image
              src="/loginImage2.png"
              alt="Login visual"
              fill
              priority
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
            />
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-6">
          <div className="w-full max-w-sm text-center">
            <div className="mb-4 flex flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-[1.01]">
              <Image
                src="/logo.png"
                alt="Logo"
                width={160}
                height={48}
                className="h-16 w-auto object-contain transition-transform duration-200 ease-in-out hover:scale-110"
              />
              <span className="mt-2 text-[1.5rem] sm:text-[2rem] font-bold text-foreground">Medichain AI</span>
            </div>

            <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold text-foreground transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-[1.01]">Get started</h1>
            <p className="mt-3 text-[var(--text-sm)] text-muted-foreground">
              Securely manage medical records with AI insights and verifiable audit trails.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button
                onClick={handleLogin}
                disabled={actionState !== "idle"}
                className="w-full transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01]">
                {actionState === "login" ? "Opening..." : "Log in"}
              </Button>
              <Button
                variant="outline"
                className="w-full transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01]"
                onClick={handleSignup}
                disabled={actionState !== "idle"}
              >
                {actionState === "signup" ? "Opening..." : "Sign up for free"}
              </Button>
            </div>
            <button
              className="mt-8 w-full rounded-md bg-[#3659f8] text-white font-semibold py-2 text-lg hover:bg-blue-700 transition-all duration-200 ease-in-out"
              onClick={handleGuestMode}
              disabled={actionState !== "idle"}
            >
              {actionState === "guest" ? "Opening guest mode..." : "Try it first as Guest"}
            </button>

            <div className="mt-5 grid gap-2 text-left">
              <div className="snow-badge snow-badge-success inline-flex w-fit items-center gap-1">Encrypted in transit</div>
              <div className="snow-badge snow-badge-success inline-flex w-fit items-center gap-1">Role-based access controls</div>
              <div className="snow-badge snow-badge-success inline-flex w-fit items-center gap-1">Tamper-evident record history</div>
            </div>

            <div className="login-footer mt-12 sm:mt-40 text-[var(--text-sm)] text-muted-foreground">
              <div className="mb-3 flex justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={36}
                  className="h-6 w-auto object-contain transition-transform duration-200 ease-in-out hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <a className="underline" href="#">Terms of use</a>
                <span>|</span>
                <a className="underline" href="#">Privacy policy</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
