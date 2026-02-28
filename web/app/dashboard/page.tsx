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
};

const files: MedicalFile[] = [
  {
    id: "record-1",
    name: "Blood Test Results.pdf",
    accessList: ["Dr. Sarah Lee", "City Hospital Lab", "You"],
  },
  {
    id: "record-2",
    name: "MRI Scan Report.pdf",
    accessList: ["Dr. Ahmed Khan", "Radiology Center", "You"],
  },
  {
    id: "record-3",
    name: "Prescription History.pdf",
    accessList: ["Dr. Sarah Lee", "MedChain Pharmacy", "You"],
  },
];

export default function DashboardPage() {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
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
            <CardDescription className="text-[12px] font-medium">Pending Reviews</CardDescription>
            <CardTitle className="text-[28px] font-bold">2</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="snow-badge snow-badge-danger inline-flex items-center gap-1">
              ↓ 1%
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
      </section>
    </div>
  );
}
