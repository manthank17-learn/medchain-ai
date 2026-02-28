"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type AIchatProps = {
  userName?: string;
  fullPage?: boolean;
};

function getGreetingByHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function AIchat({ userName = "Rayuser", fullPage = false }: AIchatProps) {
  const [isOpen, setIsOpen] = useState(fullPage);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Hello! I am your Medichain AI assistant. Ask me about records, access, or reminders.",
    },
  ]);

  const timedGreeting = useMemo(() => {
    const now = new Date();
    return `${getGreetingByHour(now.getHours())}, ${userName}`;
  }, [userName]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    const assistantMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      text: "I received that. This chat UI is ready; next step is wiring it to your backend AI service.",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  const panel = (
    <div className="snow-surface flex h-full min-h-[380px] w-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/chatBotAI.png" alt="AI Chat" width={96} height={96} className="h-8 w-8 rounded-full object-cover" />
          <div>
            <p className="text-[var(--text-sm)] font-semibold text-foreground">Medichain AI Chat</p>
            <p className="text-[11px] text-muted-foreground">Online now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!fullPage && (
            <Link
              href="/aichat"
              className="rounded-[var(--radius-sm)] border border-border px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-[var(--color-surface-2)]"
            >
              Maximize
            </Link>
          )}
          {!fullPage && (
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="rounded-[var(--radius-sm)] border border-border px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-[var(--color-surface-2)]"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-background p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={[
              "max-w-[85%] rounded-[var(--radius-md)] px-3 py-2 text-[var(--text-sm)]",
              message.role === "assistant"
                ? "bg-[var(--color-surface)] border border-border text-foreground"
                : "ml-auto bg-[var(--color-primary)] text-white",
            ].join(" ")}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="border-t border-border bg-[var(--color-surface)] p-3">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            className="h-[38px]"
          />
          <Button type="submit" size="sm">Send</Button>
        </div>
      </form>
    </div>
  );

  if (fullPage) {
    return <div className="h-full w-full">{panel}</div>;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
      <div className="hidden rounded-[var(--radius-md)] border border-border bg-[var(--color-surface)] px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] lg:block">
        <p className="text-[var(--text-sm)] font-semibold text-foreground">{timedGreeting}</p>
        <p className="text-[11px] text-muted-foreground">How can Medichain AI help you today?</p>
      </div>

      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 right-0 h-[460px] w-[90vw] max-w-[360px] sm:w-[360px]">
            {panel}
          </div>
        )}

        <button
          type="button"
          aria-label="Open AI chat"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-[var(--color-surface)] p-0 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-150 hover:scale-105"
        >
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            <Image
              src="/chatBotAI.png"
              alt="AI Chat"
              width={30}
              height={30}
              className="h-[30px] w-[30px] object-contain"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
