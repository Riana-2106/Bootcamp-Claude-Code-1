"use client";

import { useState } from "react";

const NAME_KEY = "office-task-board-name";

export function getSavedName(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(NAME_KEY);
}

export default function NameGate({ onDone }: { onDone: (name: string) => void }) {
  const [name, setName] = useState("");

  function submit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    window.localStorage.setItem(NAME_KEY, trimmed);
    onDone(trimmed);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800">Siapa namamu?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Dipakai supaya rekan kerja tahu siapa yang buat / kerjakan tugas. Tidak perlu password.
        </p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Nama kamu"
          className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wa-green focus:outline-none"
        />
        <button
          onClick={submit}
          className="mt-4 w-full rounded-lg bg-wa-green py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Masuk ke Papan Tugas
        </button>
      </div>
    </div>
  );
}
