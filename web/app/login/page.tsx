"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const progressItems = [
    "Review patient intake summary",
    "Check symptoms timeline",
    "Prepare triage recommendation",
    "Share care handoff notes",
  ];

  const contextItems = [
    "Admission record",
    "Lab results",
    "Imaging notes",
    "Follow-up plan",
  ];

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section className="flex flex-col justify-center gap-6 lg:pr-6">
          <p className="text-lg font-semibold">MedChain AI</p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Think faster, care better
            </h1>
            <p className="max-w-md text-muted-foreground">
              Sign in to continue your care journey, review health context, and manage patient records securely.
            </p>
          </div>

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Access your MedChain medical records dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleLogin}>
                <Button type="button" variant="outline" className="w-full">
                  Continue with Google
                </Button>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  or
                  <div className="h-px flex-1 bg-border" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                  required
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                  required
                />
                <Button className="w-full" type="submit">
                  Continue with email
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Secure sign-in for your health records.
            </CardFooter>
          </Card>
        </section>

        <section className="hidden lg:block">
          <Card className="relative min-h-[560px] overflow-hidden bg-muted/30">
            <CardHeader>
              <div className="mx-auto flex w-full max-w-xs items-center rounded-md border border-border bg-background p-1">
                <Button className="flex-1" size="sm" variant="default" type="button">
                  Chat
                </Button>
                <Button className="flex-1" size="sm" variant="outline" type="button">
                  Journey
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative flex h-full items-start justify-center px-6 pb-6 pt-4">
              <Card className="absolute left-8 top-20 w-56">
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">Files</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm text-muted-foreground">
                  <div className="rounded-md border border-border px-3 py-2">Analysis</div>
                  <div className="rounded-md border border-border px-3 py-2">Meeting Transcripts</div>
                  <div className="rounded-md border border-border px-3 py-2">Reports</div>
                </CardContent>
              </Card>

              <Card className="absolute bottom-10 left-1/2 w-72 -translate-x-1/2">
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">Progress</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  {progressItems.map((item: string, index: number) => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-xs">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="absolute right-8 top-28 w-56">
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">Context</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm text-muted-foreground">
                  {contextItems.map((item: string) => (
                    <div key={item} className="rounded-md border border-border px-3 py-2">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
