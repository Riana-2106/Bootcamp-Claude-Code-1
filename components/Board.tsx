"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Member, Status } from "@/lib/types";
import NamePicker from "@/components/NamePicker";
import MemberCard from "@/components/MemberCard";

const NAME_KEY = "papan-status-tim:nama";
const POLL_MS = 5000;

export default function Board() {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [myName, setMyName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMyName(window.localStorage.getItem(NAME_KEY));
    setReady(true);
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error("gagal memuat data");
      const data = await res.json();
      setMembers(data.members);
      setError(null);
    } catch {
      setError("Gagal memuat data. Cek koneksi internet kamu.");
    }
  }, []);

  useEffect(() => {
    load();
    pollRef.current = setInterval(load, POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [load]);

  function pickName(name: string) {
    window.localStorage.setItem(NAME_KEY, name);
    setMyName(name);
  }

  function changeName() {
    window.localStorage.removeItem(NAME_KEY);
    setMyName(null);
  }

  async function saveStatus(status: Status, task: string) {
    if (!myName) return;
    const res = await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: myName, status, task }),
    });
    if (res.ok) {
      const data = await res.json();
      setMembers(data.members);
    }
  }

  if (!ready || !members) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-gray-500">
        Memuat...
      </div>
    );
  }

  if (!myName) {
    return <NamePicker names={members.map((m) => m.name)} onPick={pickName} />;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <header className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Papan Status Tim</h1>
        <button
          onClick={changeName}
          className="whitespace-nowrap text-sm font-medium text-gray-500 underline"
        >
          Bukan {myName}?
        </button>
      </header>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <button
        onClick={load}
        className="mb-4 w-full rounded-xl border-2 border-gray-200 bg-white py-3 text-base font-semibold text-gray-700 active:bg-gray-100"
      >
        Perbarui Sekarang
      </button>

      <div className="flex flex-col gap-3">
        {members.map((member) => (
          <MemberCard
            key={member.name}
            member={member}
            isMine={member.name === myName}
            onSave={saveStatus}
          />
        ))}
      </div>
    </div>
  );
}
