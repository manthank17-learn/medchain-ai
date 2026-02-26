"use client";

import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://medchain-backend-v5rx.onrender.com/triage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: symptoms,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">MedChain AI</h1>

      <textarea
        className="border p-3 w-full max-w-md rounded"
        placeholder="Describe your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Check Symptoms"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded w-full max-w-md">
          <p><strong>Urgency:</strong> {result.urgency}</p>
          <p><strong>Advice:</strong> {result.advice}</p>
          <p><strong>Recommended Action:</strong> {result.recommended_action}</p>
          {result.emergency && (
            <p className="text-red-500 font-bold mt-2">
              ⚠ Emergency Situation
            </p>
          )}
        </div>
      )}
    </div>
  );
}