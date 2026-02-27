"use client";

import { useMemo, useState } from "react";

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

  const selectedFile = useMemo(
    () => files.find((file) => file.id === selectedFileId) ?? null,
    [selectedFileId],
  );

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Medical Records Dashboard</CardTitle>
            <CardDescription>
              You have {files.length} medical files stored in MedChain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{files.length}</p>
            <p className="text-sm text-muted-foreground">Total files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Files</CardTitle>
            <CardDescription>
              Click a file to see who has access to your medical record.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {files.map((file) => (
              <Button
                key={file.id}
                variant={selectedFileId === file.id ? "default" : "outline"}
                className="justify-start"
                onClick={() => setSelectedFileId(file.id)}
              >
                {file.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        {selectedFile && (
          <Card>
            <CardHeader>
              <CardTitle>Access List</CardTitle>
              <CardDescription>{selectedFile.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {selectedFile.accessList.map((person) => (
                <div key={person} className="rounded-md border border-border px-3 py-2 text-sm">
                  {person}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
