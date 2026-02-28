"use client";

import { useMemo, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MedicalFile = {
  id: string;
  name: string;
  accessList: string[];
  status: "Verified" | "Review Required";
  hash: string;
  anchoredAt: string;
};

const files: MedicalFile[] = [
  {
    id: "record-1",
    name: "Blood Test Results.pdf",
    accessList: ["Dr. Sarah Lee", "City Hospital Lab", "You"],
    status: "Verified",
    hash: "0xf31b...9a02",
    anchoredAt: "2026-02-28 10:13 UTC",
  },
  {
    id: "record-2",
    name: "MRI Scan Report.pdf",
    accessList: ["Dr. Ahmed Khan", "Radiology Center", "You"],
    status: "Verified",
    hash: "0x4cd1...a773",
    anchoredAt: "2026-02-28 09:42 UTC",
  },
  {
    id: "record-3",
    name: "Prescription History.pdf",
    accessList: ["Dr. Sarah Lee", "MedChain Pharmacy", "You"],
    status: "Review Required",
    hash: "0x7af8...0c9f",
    anchoredAt: "2026-02-27 19:21 UTC",
  },
];

export default function DashboardPage() {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isGuest = sessionStorage.getItem('isGuest');
      const guest = sessionStorage.getItem('guestId');
      if (isGuest === 'true' && guest) {
        setGuestId(guest);
      }
    }
  }, []);

  const selectedFile = useMemo(
    () => files.find((file) => file.id === selectedFileId) ?? null,
    [selectedFileId],
  );

  const verifiedCount = files.filter((file) => file.status === "Verified").length;

  const runIntegrityCheck = async () => {
    if (!selectedFile || isChecking) return;
    setIsChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLastCheckedAt(new Date().toLocaleTimeString());
    setIsChecking(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      {guestId && (
        <div className="mb-4 rounded-lg bg-blue-100 text-blue-900 px-4 py-3 text-center text-base font-semibold">
          Guest Mode: Your Guest ID is <span className="font-mono">{guestId}</span>
        </div>
      )}
      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription className="text-[12px] font-medium">Total Files</CardDescription>
            <CardTitle className="text-[28px] font-bold">{files.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="snow-badge snow-badge-success inline-flex items-center gap-1">
              ↑ 12%
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-[12px] font-medium">Shared Access</CardDescription>
            <CardTitle className="text-[28px] font-bold">8</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="snow-badge snow-badge-success inline-flex items-center gap-1">
              ↑ 4%
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-[12px] font-medium">Chain Verified</CardDescription>
            <CardTitle className="text-[28px] font-bold">{verifiedCount}/{files.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="snow-badge snow-badge-success inline-flex items-center gap-1">
              Audit trail active
            </span>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Click a file to view access control entries.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="snow-table w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Access Count</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id} className="border-b border-border">
                      <td className="text-[var(--text-base)] text-foreground">{file.name}</td>
                      <td className="text-muted-foreground">{file.accessList.length}</td>
                      <td>
                        <span className="snow-badge snow-badge-success">Active</span>
                      </td>
                      <td className="text-right">
                        <Button
                          variant={selectedFileId === file.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFileId(file.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Access List</CardTitle>
              <CardDescription>
                {selectedFile ? selectedFile.name : "Select a record to view access list"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {selectedFile ? (
                selectedFile.accessList.map((person: string) => (
                  <div
                    key={person}
                    className="rounded-[var(--radius-md)] border border-border bg-[var(--color-surface-2)] px-3 py-2 text-[var(--text-sm)]"
                  >
                    {person}
                  </div>
                ))
              ) : (
                <p className="text-[var(--text-sm)] text-muted-foreground">No record selected.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trust & Verification</CardTitle>
              <CardDescription>
                {selectedFile ? "Validate file integrity and on-chain anchoring." : "Select a record to view trust data."}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-[var(--text-sm)]">
              {selectedFile ? (
                <>
                  <div className="rounded-[var(--radius-md)] border border-border bg-[var(--color-surface-2)] px-3 py-2">
                    <p className="text-muted-foreground">Record Hash</p>
                    <p className="font-mono text-foreground">{selectedFile.hash}</p>
                  </div>
                  <div className="rounded-[var(--radius-md)] border border-border bg-[var(--color-surface-2)] px-3 py-2">
                    <p className="text-muted-foreground">Anchored At</p>
                    <p className="text-foreground">{selectedFile.anchoredAt}</p>
                  </div>
                  <div>
                    <span className={selectedFile.status === "Verified" ? "snow-badge snow-badge-success" : "snow-badge snow-badge-danger"}>
                      {selectedFile.status}
                    </span>
                  </div>
                  <Button onClick={runIntegrityCheck} disabled={isChecking}>
                    {isChecking ? "Running check..." : "Run integrity check"}
                  </Button>
                  {lastCheckedAt && (
                    <p className="text-muted-foreground">Last checked at {lastCheckedAt}</p>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">No verification data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
